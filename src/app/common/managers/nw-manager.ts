import { AbstractManager } from '../../fwk/abstract-manager';
import { Injectable, EventEmitter } from '@angular/core';
import { TranslateManager } from 'src/app/fwk/managers/translate-manager';
import { RouterManager } from 'src/app/fwk/managers/router-manager';
import { NavigationExtras } from '@angular/router';
import pkg from './../../../../package.json';
import { environment } from './../../../environments/environment';
import { ConfigProvider } from '../providers/config-provider';
import { AppEvents } from 'src/app/app-events';
import { EventManager } from 'src/app/fwk/managers/event-manager';

// https://github.com/nwutils/nw-angular-cli-example
@Injectable({ providedIn: "root" })
export class NwManager extends AbstractManager {

    _watcher: any = null;
    _socket: any = null;
    _httpServer: any = null;
    _translateManager: TranslateManager = null;
    _routerManager: RouterManager = null;
    _eventManager: EventManager = null;
    _configProvider: ConfigProvider = null;
    _updater: any = null;
    _updatedVersion: any = null;

    constructor(translateManager: TranslateManager, routerManager: RouterManager, configProvider: ConfigProvider,
        eventManager: EventManager) {
        super();
        this._translateManager = translateManager;
        this._routerManager = routerManager;
        this._configProvider = configProvider;
        this._eventManager = eventManager;
    }

    init(): void {
        super.init();
        if (this._configProvider.runInNw()) {
            this._init();
        }
    }

    getCurrentVersion(): String {
        return pkg.version;
    }

    getUpdatedVersion(): any {
        return this._updatedVersion;
    }

    update(): void {
        this._eventManager.emit(AppEvents.HTTP_BEGIN);
        this._updater.downloadUpdate(this._updatedVersion.version).then((path: string) => {
            this._eventManager.emit(AppEvents.HTTP_END);
            this._translateManager.getValues(["L10N_QUIT_AND_INSTALL"]).subscribe((translations: any) => {
                if (confirm(translations.L10N_QUIT_AND_INSTALL)) {
                    this._updater.quitAndInstall(path);
                }
            });
        });
    }

    _setUpdatedVersion(version: any): void {
        this._updatedVersion = version;
        this.emit("updatedVersionChanged");
    }

    _init(): void {
        window.onbeforeunload = () => {
            this._httpServer.close();
        }
        this._checkForUpdates();
        this._initMenuBar();
        this._initServer();
        this._initUpdateWatcher();
    }

    _showView(view: string, extras?: NavigationExtras): void {
        this._routerManager.navigate([view], extras);
    }

    _initMenuBar(): void {
        this._refreshMenuBar();
        this._translateManager.on("languageChange").subscribe(() => {
            this._refreshMenuBar();
        });
    }

    _refreshMenuBar(): void {
        this._translateManager.getValues(["L10N_QUIT", "L10N_FILE", "L10N_MY_GAMES", "L10N_CONFIGURATION", "L10N_DISPLAY"]).subscribe((translations: any) => {
            const menu = new window.nw.Menu({ type: "menubar" });
            const fileSubMenu = new window.nw.Menu();
            fileSubMenu.append(new window.nw.MenuItem({
                label: translations.L10N_QUIT,
                click: () => {
                    window.nw.App.quit();
                }
            }));
            menu.append(new window.nw.MenuItem({
                label: translations.L10N_FILE,
                submenu: fileSubMenu
            }));
            const displaySubMenu = new window.nw.Menu();
            displaySubMenu.append(new window.nw.MenuItem({
                label: translations.L10N_MY_GAMES,
                click: () => {
                    this._showView("/mygames");
                }
            }));
            displaySubMenu.append(new window.nw.MenuItem({
                label: translations.L10N_CONFIGURATION,
                click: () => {
                    this._showView("/config");
                }
            }));
            menu.append(new window.nw.MenuItem({
                label: translations.L10N_DISPLAY,
                submenu: displaySubMenu
            }));
            const infoSubMenu = new window.nw.Menu();
            infoSubMenu.append(new window.nw.MenuItem({
                label: `v${this.getCurrentVersion()}`
            }));
            menu.append(new window.nw.MenuItem({
                label: "?",
                submenu: infoSubMenu
            }));
            window.nw.Window.get().menu = menu;
        });
    }

    _checkForUpdates(): void {
        const os = window.nw.require("os");
        const { NsisCompatUpdater } = window.nw.require("nsis-compat-updater");
        this._updater = new NsisCompatUpdater(this._configProvider.getUpdateUrl(), this.getCurrentVersion(), os.arch());
        this._updater.onDownloadProgress.subscribe((event: any) => {
            this.emit("downloadProgress", event);
        });
        this._updater.checkForUpdates().then((version: any) => {
            this._setUpdatedVersion(version);
            if (this.getUpdatedVersion() != null) {
                // new version available
                this._translateManager.getValues(["L10N_NEW_VERSION"]).subscribe((translations: any) => {
                    if (confirm(translations.L10N_NEW_VERSION)) {
                        this._showView("/update");
                    }
                });
            }
        });
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
        const serverPort = environment.wsPort;
        this._httpServer = httpInstance.listen(serverPort, () => {
            this.getLogger().info(`(EXPRESS) Listening on port ${serverPort}`);
        }).on("error", (err: any) => {
            this.getLogger().error(`(EXPRESS) ${err}`);
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
        this._getConfiguration((configuration: any) => {
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
}
