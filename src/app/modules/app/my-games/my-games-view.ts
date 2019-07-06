import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { MyGamesModel } from './my-games-model';

@Component({
    templateUrl: './my-games-view.html',
    styleUrls: ['./my-games-view.css']
})
export class MyGamesView extends AbstractAppView {

    @ViewChild(MatPaginator, { static: false }) matPaginator !: MatPaginator;

    constructor(appHelperObject: AppHelperObject, myGamesModel: MyGamesModel) {
        super(appHelperObject, myGamesModel);
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

    _getModel(): MyGamesModel {
        return <MyGamesModel>this.model;
    }
}