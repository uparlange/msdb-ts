import { ResultModel } from './result-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { AbstractAppView } from 'src/app/common/abstract-app-view';

@Component({
    selector: 'result-view',
    templateUrl: './result-view.html',
    styleUrls: ['./result-view.css']
})
export class ResultView extends AbstractAppView {

    @ViewChild(MatPaginator, { static: false }) matPaginator !: MatPaginator;

    constructor(appHelperObject: AppHelperObject, resultModel: ResultModel) {
        super(appHelperObject, resultModel);
    }

    afterViewInit(): void {
        super.afterViewInit();
        this._getModel().setPaginator(this.matPaginator);
    }

    filterChange(event: any): void {
        this._getModel().filterChange(event);
    }

    applyFilter(value: string): void {
        this._getModel().applyFilter(value);
    }

    pageChanged(event: any): void {
        this._getModel().pageChanged(event);
    }

    clearFilter(): void {
        this._getModel().clearFilter();
    }

    _getModel(): ResultModel {
        return <ResultModel>this.model;
    }
}
