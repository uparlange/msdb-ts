import { ResultModel } from './result-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { Component, ViewChild } from '@angular/core';
import { AbstractAppView } from 'src/app/common/abstract-app-view';

@Component({
    templateUrl: './result-view.html',
    styleUrls: ['./result-view.css']
})
export class ResultView extends AbstractAppView {

    constructor(
        protected _helper: AppHelperObject, 
        public model: ResultModel) {
        super(_helper, model);
    }

    filterChange(event: any): void {
        this._getModel().filterChange(event);
    }

    private _getModel(): ResultModel {
        return <ResultModel>this.model;
    }
}
