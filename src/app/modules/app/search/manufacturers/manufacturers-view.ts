import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { ManufacturersModel } from './manufacturers-model';
import { ViewChild, Component } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Component({
    selector: 'manufacturers-view',
    templateUrl: './manufacturers-view.html',
    styleUrls: ['./manufacturers-view.css']
})
export class ManufacturersView extends AbstractAppView {

    @ViewChild(MatPaginator, { static: false }) matPaginator !: MatPaginator;

    constructor(appHelperObject: AppHelperObject, manufacturersModel: ManufacturersModel) {
        super(appHelperObject, manufacturersModel);
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

    _getModel(): ManufacturersModel {
        return <ManufacturersModel>this.model;
    }
}