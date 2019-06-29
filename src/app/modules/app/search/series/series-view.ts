import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { SeriesModel } from './series-model';
import { ViewChild, Component } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Component({
    selector: 'series-view',
    templateUrl: './series-view.html',
    styleUrls: ['./series-view.css']
})
export class SeriesView extends AbstractAppView {

    @ViewChild(MatPaginator, { static: false }) matPaginator !: MatPaginator;

    constructor(appHelperObject: AppHelperObject, seriesModel: SeriesModel) {
        super(appHelperObject, seriesModel);
    }

    afterViewInit(): void {
        super.afterViewInit();
        this._getModel().setPaginator(this.matPaginator);
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

    _getModel(): SeriesModel {
        return <SeriesModel>this.model;
    }
}