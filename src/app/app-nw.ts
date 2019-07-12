import { EventEmitter } from '@angular/core';
import { AbstractObject } from 'src/app/fwk/abstract-object';

// https://github.com/nwutils/nw-angular-cli-example
export class AppNw extends AbstractObject {

    _watcher: any = null;
    _socket: any = null;

    constructor() {
        super();
    }

    init(): void {
        this._initServer();
        this._initUpdateWatcher();
    }

    _initServer(): void {
        const express = window.nw.require("express");
        const expressInstance = express();
        const http = window.nw.require("http");
        const httpInstance = http.Server(expressInstance);
        const io = window.nw.require("socket.io");
        const ioInstance = io(httpInstance);
        const bodyParser = window.nw.require("body-parser");
        expressInstance.use(bodyParser.json());
        //const serverPort = AppUtils.getSocketPort();
        const serverPort = 3000;
        httpInstance.listen(serverPort, () => {
            this.getLogger().info(`(EXPRESS) Listening on port ${serverPort}`);
        });
        ioInstance.on("connection", (socket: any) => {
            this.getLogger().info(`(SOCKET.IO) User (${socket.id}) connected`);
            this._socket = socket;
            socket.on("GET_MY_GAMES", (params: any, callback: Function) => {
                this._getMyGames(params, callback);
            });
            socket.on("IS_ROM_AVAILABLE", (params: any, callback: Function) => {
                this._isRomAvailable(params, callback);
            });
            socket.on("PLAY_GAME", (params: any, callback: Function) => {
                this._playGame(params, callback);
            });
            socket.on("GET_CONFIGURATION", (params: any, callback: Function) => {
                this._getConfiguration(callback);
            });
            socket.on("SAVE_CONFIGURATION", (params: any, callback: Function) => {
                this._saveConfiguration(params, callback);
            });
        });
    }

    _initUpdateWatcher(): void {
        const chokidar = window.nw.require("chokidar");
        const fs = window.nw.require("fs");
        this._getConfiguration((configuration: any) => {
            if (fs.existsSync(configuration.romsDirectory) && fs.statSync(configuration.romsDirectory).isDirectory()) {
                if (this._watcher) {
                    this._watcher.close();
                }
                this._watcher = chokidar.watch(configuration.romsDirectory, {
                    ignoreInitial: true
                });
                this._watcher.on("all", () => {
                    this._socket.emit("CHANGE_IN_ROMS_DIRECTORY");
                });
            }
        });
    }

    _getConfigFile(): string {
        const os = window.nw.require("os");
        const pkg = window.nw.require("./package.json");
        return `${os.homedir()}\\${pkg.name}.json`;
    }

    _saveConfiguration(config: string, callback: Function): void {
        const fs = window.nw.require("fs");
        fs.writeFileSync(this._getConfigFile(), JSON.stringify(config));
        this._initUpdateWatcher();
        callback();
    }

    _getConfiguration(callback: Function): void {
        const fs = window.nw.require("fs");
        let config = null;
        try {
            config = JSON.parse(fs.readFileSync(this._getConfigFile()));
        } catch (e) {
            this.getLogger().info("(CONFIG) No configuration file found !");
        }
        if (config === null) {
            config = {
                "mameDirectory": null,
                "romsDirectory": null,
                "autosave": false,
                "joystick": false
            };
        }
        callback(config);
    }

    _initMame(mameDirectory: string, mameFileName: string): EventEmitter<any> {
        const fs = window.nw.require("fs");
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        const mameIni = `${mameDirectory}\\mame.ini`;
        if (fs.existsSync(mameIni)) {
            let cmd = `cd ${mameDirectory} & ${mameFileName} -cc`;
            this._execCmd(cmd).subscribe(() => {
                let source = fs.readFileSync(mameIni, "utf8");
                const params: any = {};
                const all_lines_array = source.split("\r\n");
                all_lines_array.forEach((line: string) => {
                    if (line.length > 0 && line.indexOf("#") === -1) {
                        const key = line.substring(0, line.indexOf(" "));
                        const value = line.substring(line.lastIndexOf(" ") + 1);
                        params[key] = value;
                    }
                });
                /* http://www.gamoover.net/tuto/am%C3%A9liorer-le-rendu-de-mame-sur-un-lcd */
                params.multithreading = "1";
                params.video = "d3d";
                params.keepaspect = "1";
                params.prescale = "2";
                params.hwstretch = "1";
                params.effect = "scanlines";
                params.waitvsync = "1"
                params.syncrefresh = "1"
                let dest = "";
                for (let attr in params) {
                    dest += `${attr} ${params[attr]}\r\n`;
                }
                fs.writeFileSync(mameIni, dest);
                eventEmitter.emit();
            });
        }
        else {
            setTimeout(() => {
                eventEmitter.emit();
            }, 0);
        }
        return eventEmitter;
    }

    _execCmd(cmd: string): EventEmitter<any> {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        this.getLogger().info(`(CMD) Execute '${cmd}'`);
        const child_process = window.nw.require("child_process");
        child_process.exec(cmd, (error: string, stdout: string, stderr: string) => {
            if (error != null && error.length > 0) {
                this.getLogger().error(`(CMD) ${error.toString()}`);
            }
            if (stdout != null && stdout.length > 0) {
                this.getLogger().info(`(CMD) ${stdout}`);
            }
            if (stderr != null && stderr.length > 0) {
                this.getLogger().error(`(CMD) ${stderr}`);
            }
            eventEmitter.emit();
        });
        return eventEmitter;
    }

    _playGame(name: string, callback: Function): void {
        const fs = window.nw.require("fs");
        this.getLogger().info(`(MAME) Launch game ${name}`);
        this._getConfiguration((configuration) => {
            const mameDirectory = configuration.mameDirectory;
            let mameFileName = "mame64.exe";
            if (!fs.existsSync(`${mameDirectory}\\${mameFileName}`)) {
                mameFileName = "mame.exe";
            }
            this._initMame(mameDirectory, mameFileName).subscribe(() => {
                let cmd = `cd ${mameDirectory} & ${mameFileName} ${name}`;
                if (configuration.autosave) {
                    cmd += " -autosave";
                }
                if (configuration.joystick) {
                    cmd += " -joystick";
                }
                this._execCmd(cmd);
            });
            callback();
        });
    }

    _getMyGames(name: string, callback: Function): void {
        const fs = window.nw.require("fs");
        this._getConfiguration((configuration: any) => {
            const path = window.nw.require("path");
            const games = [];
            try {
                const files = fs.readdirSync(configuration.romsDirectory);
                files.forEach((file: string) => {
                    const fileInfos = path.parse(file);
                    if (fileInfos.ext === ".zip") {
                        games.push(fileInfos.name);
                    }
                });
            } catch (e) {
                /* dont't act */
            }
            callback(games);
        });
    }

    _isRomAvailable(name: string, callback: Function): void {
        const fs = window.nw.require("fs");
        this._getConfiguration((configuration: any) => {
            const result = {
                name: name,
                available: false
            };
            const gameFilename = `${configuration.romsDirectory}\\${name}.zip`;
            if (fs.existsSync(gameFilename)) {
                result.available = true;
            }
            callback(result);
        });
    }
};