import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { UpdateModel } from './update-model';

@Component({
    templateUrl: './update-view.html',
    styleUrls: ['./update-view.css']
})
export class UpdateView extends AbstractAppView {

    constructor(
        protected _helper: AppHelperObject, 
        public model: UpdateModel) {
        super(_helper, model);
    }

    update(): void {
        this._getModel().update();
    }

    private _getModel(): UpdateModel {
        return <UpdateModel>this.model;
    }

}