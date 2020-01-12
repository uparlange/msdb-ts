import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { ManufacturersModel } from './manufacturers-model';
import { Component } from '@angular/core';

@Component({
    templateUrl: './manufacturers-view.html',
    styleUrls: ['./manufacturers-view.css']
})
export class ManufacturersView extends AbstractAppView {

    constructor(
        protected _helper: AppHelperObject, 
        public model: ManufacturersModel) {
        super(_helper, model);
    }

}