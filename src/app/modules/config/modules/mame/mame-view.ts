import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { MameModel } from './mame-model';

@Component({
    templateUrl: './mame-view.html',
    styleUrls: ['./mame-view.css']
})
export class MameView extends AbstractAppView {

    constructor(
        protected _helper: AppHelperObject,
        public model: MameModel) {
        super(_helper, model);
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

    private _getModel(): MameModel {
        return <MameModel>this.model;
    }

}