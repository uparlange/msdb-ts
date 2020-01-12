import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { ConfigModel } from './config-model';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Component({
    templateUrl: './config-view.html',
    styleUrls: ['./config-view.css']
})
export class ConfigView extends AbstractAppView {

    constructor(
        protected _helper: AppHelperObject,
        public model: ConfigModel) {
        super(_helper, model);
    }

    onLanguageChanged(event: any) {
        this.getLabels().setLanguage(event.value);
    }

    checkConfigFormChanges(): void {
        this._getModel().checkConfigFormChanges();
    }

    saveConfig(): void {
        this._getModel().saveConfig();
    }

    cancelConfig(): void {
        this._getModel().cancelConfig();
    }

    checkMameIniFormChanges(): void {
        this._getModel().checkMameIniFormChanges();
    }

    saveMameIni(): void {
        this._getModel().saveMameIni();
    }

    cancelMameIni(): void {
        this._getModel().cancelMameIni();
    }

    private _getModel(): ConfigModel {
        return <ConfigModel>this.model;
    }
}