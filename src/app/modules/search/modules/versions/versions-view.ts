import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { VersionsModel } from './versions-model';
import { Component } from '@angular/core';

@Component({
    templateUrl: './versions-view.html',
    styleUrls: ['./versions-view.css']
})
export class VersionsView extends AbstractAppView {

    constructor(
        protected _helper: AppHelperObject, 
        public model: VersionsModel) {
        super(_helper, model);
    }
}