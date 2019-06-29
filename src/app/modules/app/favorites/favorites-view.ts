import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { FavoritesModel } from './favorites-model';
import { ViewChild, Component } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Component({
    selector: 'favorites-view',
    templateUrl: './favorites-view.html',
    styleUrls: ['./favorites-view.css']
})
export class FavoritesView extends AbstractAppView {

    @ViewChild(MatPaginator, { static: false }) matPaginator !: MatPaginator;

    constructor(appHelperObject: AppHelperObject, favoritesModel: FavoritesModel) {
        super(appHelperObject, favoritesModel);
    }

    afterViewInit(): void {
        super.afterViewInit();
        this._getModel().setPaginator(this.matPaginator);
    }

    applyFilter(value: string): void {
        this._getModel().applyFilter(value);
    }

    clearFilter(): void {
        this._getModel().clearFilter();
    }

    pageChanged(event: any): void {
        this._getModel().pageChanged(event);
    }

    _getModel(): FavoritesModel {
        return <FavoritesModel>this.model;
    }
}