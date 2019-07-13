import { ResultModel } from './result-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { Component, ViewChild } from '@angular/core';
import { AbstractAppView } from 'src/app/common/abstract-app-view';

@Component({
    templateUrl: './result-view.html',
    styleUrls: ['./result-view.css']
})
export class ResultView extends AbstractAppView {

    constructor(appHelperObject: AppHelperObject, resultModel: ResultModel) {
        super(appHelperObject, resultModel);
    }

    filterChange(event: any): void {
        this._getModel().filterChange(event);
    }

    _getModel(): ResultModel {
        return <ResultModel>this.model;
    }
}
