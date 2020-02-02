import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { ConfigModel } from './config-model';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { AppLabels } from 'src/app/app-labels';

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

    tabChanged(event: any): void {
        this._getModel().tabChanged(event);
        const url = `/config/${this.getTabsInfo().byIndex(event.index).type}`;
        this.getRouter().navigate([url]);
    }

    getTitle(): any {
        return AppLabels.CONFIGURATION;
    }

    getTabsInfo(): any {
        return this._getModel().getTabsInfo();
    }

    private _getModel(): ConfigModel {
        return <ConfigModel>this.model;
    }

}