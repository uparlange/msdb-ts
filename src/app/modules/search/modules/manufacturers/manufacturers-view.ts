import { AbstractAppView } from '../../../../common/abstract-app-view';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';
import { ManufacturersModel } from './manufacturers-model';
import { Component } from '@angular/core';

@Component({
    templateUrl: './manufacturers-view.html',
    styleUrls: ['./manufacturers-view.css']
})
export class ManufacturersView extends AbstractAppView {

    constructor(
        protected override _helper: AppHelperObject, 
        public override model: ManufacturersModel) {
        super(_helper, model);
    }

}