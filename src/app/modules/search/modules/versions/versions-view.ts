import { AbstractAppView } from '../../../../common/abstract-app-view';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';
import { VersionsModel } from './versions-model';
import { Component } from '@angular/core';

@Component({
    templateUrl: './versions-view.html',
    styleUrls: ['./versions-view.css']
})
export class VersionsView extends AbstractAppView {

    constructor(
        protected override _helper: AppHelperObject, 
        public override model: VersionsModel) {
        super(_helper, model);
    }
}