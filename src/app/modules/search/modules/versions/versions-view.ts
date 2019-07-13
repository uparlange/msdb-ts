import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { VersionsModel } from './versions-model';
import { Component } from '@angular/core';

@Component({
    templateUrl: './versions-view.html',
    styleUrls: ['./versions-view.css']
})
export class VersionsView extends AbstractAppView {

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
}