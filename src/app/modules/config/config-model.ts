import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
    }

    onInit(): void {
        super.onInit();
        this.data.selectedLanguage = this.getLabels().getCurrentLanguage();
    }
    
    onRefresh(callback: Function): void {
        this._getConfiguration(callback);
    }

    save(): void {
        this.getSocket().emit("SAVE_CONFIGURATION", this.data.newValue).subscribe((result: any) => {
            if (result !== null) {
                this.getEventBus().emit("CONFIG_CHANGED");
                this._getConfiguration();
            }
        });
    }

    cancel(): void {
        this._getConfiguration();
    }

    checkFormChanges(): void {
        this.data.newValue.romsDirectory = (typeof this.data.newValue.mameDirectory === "string" && this.data.newValue.mameDirectory.length > 0) ? `${this.data.newValue.mameDirectory}\\roms` : null;
        this.data.enabled = this.hasChanges();
    }

    hasChanges(): boolean {
        const newValue = JSON.stringify(this.data.newValue);
        return (this.data.oldValue !== newValue);
    }

    _getConfiguration(callback?: Function) {
        this.getSocket().emit("GET_CONFIGURATION").subscribe((result: any) => {
            if (result !== null) {
                this.data.oldValue = JSON.stringify(result);
                this.data.newValue = result;
                this.data.enabled = false;
            }
            if (callback) {
                callback();
            }
        });
    }

    _getInitData(): any {
        const availableLanguages = [
            { data: "en", label: "English" },
            { data: "fr", label: "Français" }
        ];
        return {
            oldValue: {},
            newValue: {},
            enabled: false,
            languages: availableLanguages,
            selectedLanguage: null
        };
    }
}