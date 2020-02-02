import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { Injectable } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { AppEvents } from 'src/app/app-events';
import { AppSocketEvents } from 'src/app/app-socket-events';

@Injectable()
export class MameModel extends AbstractAppModel {

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    onRefresh(callback: Function): void {
        this._getConfiguration(() => {
            this._getMameIni(() => {
                callback();
            });
        });
    }

    saveConfig(): void {
        this.getSocket().emit(AppSocketEvents.SAVE_CONFIGURATION, this.data.configuration.newValue).subscribe(() => {
            this.data.configuration.oldValue = JSON.stringify(this.data.configuration.newValue);
            this.checkConfigFormChanges();
            this.getEventBus().emit(AppEvents.CONFIG_CHANGED);
        });
    }

    cancelConfig(): void {
        this.data.configuration.newValue = JSON.parse(this.data.configuration.oldValue);
        this.checkConfigFormChanges();
    }

    checkConfigFormChanges(): void {
        this.data.configuration.newValue.romsDirectory = (typeof this.data.configuration.newValue.mameDirectory === "string" && this.data.configuration.newValue.mameDirectory.length > 0) ? `${this.data.configuration.newValue.mameDirectory}\\roms` : null;
        this.data.configuration.enabled = this.hasConfigChanges();
    }

    hasConfigChanges(): boolean {
        const newValue = JSON.stringify(this.data.configuration.newValue);
        return (this.data.configuration.oldValue !== newValue);
    }

    saveMameIni(): void {
        this.getSocket().emit(AppSocketEvents.SAVE_MAME_INI, this.data.mameIni.newValue).subscribe(() => {
            this.data.mameIni.oldValue = JSON.stringify(this.data.mameIni.newValue);
            this.checkMameIniFormChanges();
        });
    }

    cancelMameIni(): void {
        this.data.mameIni.newValue = JSON.parse(this.data.mameIni.oldValue);
        this.checkMameIniFormChanges();
    }

    checkMameIniFormChanges(): void {
        this.data.mameIni.enabled = this.hasMameIniChanges();
    }

    hasMameIniChanges(): boolean {
        const newValue = JSON.stringify(this.data.mameIni.newValue);
        return (this.data.mameIni.oldValue !== newValue);
    }

    private _getMameIni(callback?: Function): void {
        this.getSocket().emit(AppSocketEvents.GET_MAME_INI).subscribe((result: any) => {
            if (result !== null) {
                this.data.mameIni = {
                    oldValue: JSON.stringify(result),
                    newValue: result,
                    enabled: false
                }
            }
            if (callback) {
                callback();
            }
        });
    }

    private _getConfiguration(callback?: Function): void {
        this.getSocket().emit(AppSocketEvents.GET_CONFIGURATION).subscribe((result: any) => {
            if (result !== null) {
                this.data.configuration = {
                    oldValue: JSON.stringify(result),
                    newValue: result,
                    enabled: false
                }
            }
            if (callback) {
                callback();
            }
        });
    }

    protected _getInitData(): any {
        return {
            configuration: {
                oldValue: "",
                newValue: {},
                enabled: false
            },
            mameIni: {
                oldValue: "",
                newValue: [],
                filterValue: "",
                enabled: false
            }
        };
    }
}