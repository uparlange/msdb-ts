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
import { CacheManager } from 'src/app/fwk/managers/cache-manager';
import { AppLabels } from 'src/app/app-labels';
import { AppSocketEvents } from 'src/app/app-socket-events';

// Angular 2 integration : https://github.com/nwutils/nw-angular-cli-example
@Injectable({ providedIn: "root" })
export class NwManager extends AbstractManager {

    private _watcher: any = null;
    private _socket: any = null;
    private _httpServer: any = null;
    private _updater: any = null;
    private _updatedVersion: any = null;

    constructor(
        private _translateManager: TranslateManager,
        private _routerManager: RouterManager,
        private _configProvider: ConfigProvider,
        private _eventManager: EventManager,
        private _cacheManager: CacheManager) {
        super();
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

    private _setUpdatedVersion(version: any): void {
        this._updatedVersion = version;
        this.emit("updatedVersionChanged");
    }

    private _init(): void {
        window.onbeforeunload = () => {
            this._httpServer.close();
        }
        this._checkForUpdates();
        this._initMenuBar();
        this._initServer();
        this._initUpdateWatcher();
    }

    private _showView(view: string, extras?: NavigationExtras): void {
        this._routerManager.navigate([view], extras);
    }

    private _initMenuBar(): void {
        this._refreshMenuBar();
        this._translateManager.on("languageChange").subscribe(() => {
            this._refreshMenuBar();
        });
    }

    private _refreshMenuBar(): void {
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
                label: AppLabels.CONFIGURATION,
                click: () => {
                    this._cacheManager.getItem("configLastView", "application").subscribe((value: string) => {
                        this._showView("/config/" + value);
                    });
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

    private _checkForUpdates(): void {
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

    private _initServer(): void {
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
            this._getLogger().info(`(EXPRESS) Listening on port ${serverPort}`);
        }).on("error", (err: any) => {
            this._getLogger().error(`(EXPRESS) ${err}`);
        });
        ioInstance.on("connection", (socket: any) => {
            this._getLogger().info(`(SOCKET.IO) User (${socket.id}) connected`);
            this._socket = socket;
            socket.on(AppSocketEvents.GET_MY_GAMES, (params: any, callback: Function) => {
                this._getMyGames(params, callback);
            });
            socket.on(AppSocketEvents.IS_ROM_AVAILABLE, (params: any, callback: Function) => {
                this._isRomAvailable(params, callback);
            });
            socket.on(AppSocketEvents.PLAY_GAME, (params: any, callback: Function) => {
                this._playGame(params, callback);
            });
            socket.on(AppSocketEvents.GET_CONFIGURATION, (params: any, callback: Function) => {
                this._getConfiguration(callback);
            });
            socket.on(AppSocketEvents.SAVE_CONFIGURATION, (params: any, callback: Function) => {
                this._saveConfiguration(params, callback);
            });
            socket.on(AppSocketEvents.GET_MAME_INI, (params: any, callback: Function) => {
                this._getMameIni(callback);
            });
            socket.on(AppSocketEvents.SAVE_MAME_INI, (params: any, callback: Function) => {
                this._saveMameIni(params, callback);
            });
        });
    }

    private _initUpdateWatcher(): void {
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
                    this._socket.emit(AppSocketEvents.CHANGE_IN_ROMS_DIRECTORY);
                });
            }
        });
    }

    private _getConfigFile(): string {
        const os = window.nw.require("os");
        return `${os.homedir()}\\${pkg.name}.json`;
    }

    private _saveConfiguration(config: any, callback: Function): void {
        const fs = window.nw.require("fs");
        fs.writeFileSync(this._getConfigFile(), JSON.stringify(config));
        this._initUpdateWatcher();
        callback();
    }

    private _getConfiguration(callback: Function): void {
        const fs = window.nw.require("fs");
        let config = null;
        try {
            config = JSON.parse(fs.readFileSync(this._getConfigFile()));
        } catch (e) {
            this._getLogger().info("(CONFIG) No configuration file found !");
        }
        if (config === null) {
            config = {
                "mameDirectory": null,
                "romsDirectory": null
            };
        }
        callback(config);
    }

    /* http://www.gamoover.net/tuto/am%C3%A9liorer-le-rendu-de-mame-sur-un-lcd 
    params.multithreading = "1";
    params.video = "d3d";
    params.keepaspect = "1";
    params.prescale = "2";
    params.hwstretch = "1";
    params.effect = "scanlines";
    params.waitvsync = "1"
    params.syncrefresh = "1"
    */
    private _getMameIniParameterList(mameIni: string): Array<string> {
        const fs = window.nw.require("fs");
        const list = [];
        const source = fs.readFileSync(mameIni, "utf8");
        const params: any = {};
        const all_lines_array = source.split("\r\n");
        all_lines_array.forEach((line: string) => {
            if (line.length > 0 && line.indexOf("#") === -1) {
                const key = line.substring(0, line.indexOf(" "));
                const value = line.substring(line.lastIndexOf(" ") + 1);
                list.push({ key: key, value: value });
            }
        });
        return list;
    }

    private _saveMameIni(parameters: Array<string>, callback: Function): void {
        const fs = window.nw.require("fs");
        let dest = "";
        parameters.forEach((element: any) => {
            dest += `${element.key} ${element.value}\r\n`;
        });
        this._getConfiguration((configuration: any) => {
            const mameDirectory = configuration.mameDirectory;
            const mameFileName = this._getMameFilename(mameDirectory);
            const mameIni = `${mameDirectory}\\mame.ini`;
            fs.writeFileSync(mameIni, dest);
        });
        callback();
    }

    private _getMameIni(callback: Function): void {
        const fs = window.nw.require("fs");
        this._getConfiguration((configuration: any) => {
            const mameDirectory = configuration.mameDirectory;
            const mameFileName = this._getMameFilename(mameDirectory);
            const mameIni = `${mameDirectory}\\mame.ini`;
            if (!fs.existsSync(mameIni)) {
                const cmd = `cd ${mameDirectory} & ${mameFileName} -cc`;
                this._execCmd(cmd).subscribe(() => {
                    callback(this._getMameIniParameterList(mameIni));
                });
            } else {
                callback(this._getMameIniParameterList(mameIni));
            }
        });
    }

    private _initMame(mameDirectory: string, mameFileName: string): void {
        /*
        for (let attr in params) {
                    dest += `${attr} ${params[attr]}\r\n`;
                }
                fs.writeFileSync(mameIni, dest);
        */
    }

    private _execCmd(cmd: string): EventEmitter<any> {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        this._getLogger().info(`(CMD) Execute '${cmd}'`);
        const child_process = window.nw.require("child_process");
        child_process.exec(cmd, (error: string, stdout: string, stderr: string) => {
            if (error != null && error.length > 0) {
                this._getLogger().error(`(CMD:error) ${error.toString()}`);
                eventEmitter.emit(error);
            }
            if (stdout != null && stdout.length > 0) {
                this._getLogger().info(`(CMD:stdout) ${stdout}`);
                eventEmitter.emit(stdout);
            }
            if (stderr != null && stderr.length > 0) {
                this._getLogger().error(`(CMD:stderr) ${stderr}`);
                eventEmitter.emit(stderr);
            }
        });
        return eventEmitter;
    }

    private _getMameFilename(mameDirectory: string): string {
        const fs = window.nw.require("fs");
        let mameFileName = "mame64.exe";
        if (!fs.existsSync(`${mameDirectory}\\${mameFileName}`)) {
            mameFileName = "mame.exe";
        }
        return mameFileName;
    }

    private _playGame(name: string, callback: Function): void {
        this._getLogger().info(`() Launch game ${name}`);
        this._getConfiguration((configuration: any) => {
            const mameDirectory = configuration.mameDirectory;
            const mameFileName = this._getMameFilename(mameDirectory);
            const cmd = `cd ${mameDirectory} & ${mameFileName} ${name}`;
            this._execCmd(cmd).subscribe((event: string) => {
                callback(event);
            });
        });
    }

    private _getMyGames(name: string, callback: Function): void {
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

    private _isRomAvailable(name: string, callback: Function): void {
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
