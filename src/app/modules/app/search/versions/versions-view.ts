import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { VersionsModel } from './versions-model';
import { ViewChild, Component } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Component({
    selector: 'versions-view',
    templateUrl: './versions-view.html',
    styleUrls: ['./versions-view.css']
})
export class VersionsView extends AbstractAppView {

    @ViewChild(MatPaginator, { static: false }) matPaginator !: MatPaginator;

    constructor(appHelperObject: AppHelperObject, versionsModel: VersionsModel) {
        super(appHelperObject, versionsModel);
    }

    getVersion(value: string): string {
        let version = value;
        version = version.replace("0.00", "0");
        version = version.replace("0.0", "0");
        version = version.replace("0.", "0");
        return version.toLowerCase();
    }

    changeLogAvailable(value: string): boolean {
        return (value.indexOf("u") === -1);
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

    _getModel(): VersionsModel {
        return <VersionsModel>this.model;
    }
}