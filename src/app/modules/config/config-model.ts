import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { Injectable } from '@angular/core';
import { AppEvents } from 'src/app/app-events';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Injectable()
export class ConfigModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
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
                this.getEventBus().emit(AppEvents.CONFIG_CHANGED);
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

    private _getConfiguration(callback?: Function): void {
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

    protected _getInitData(): any {
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