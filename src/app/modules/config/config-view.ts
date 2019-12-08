import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { ConfigModel } from './config-model';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Component({
    templateUrl: './config-view.html',
    styleUrls: ['./config-view.css']
})
export class ConfigView extends AbstractAppView {

    constructor(appHelperObject: AppHelperObject, configModel: ConfigModel) {
        super(appHelperObject, configModel);
    }

    onLanguageChanged(event: any) {
        this.getLabels().setLanguage(event.value);
    }

    checkFormChanges(): void {
        this._getModel().checkFormChanges();
    }

    save(): void {
        this._getModel().save();
    }

    cancel(): void {
        this._getModel().cancel();
    }

    private _getModel(): ConfigModel {
        return <ConfigModel>this.model;
    }
}