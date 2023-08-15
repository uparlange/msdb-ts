import { AbstractAppView } from '../../../../common/abstract-app-view';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';
import { RatingsModel } from './ratings-model';
import { Component } from '@angular/core';

@Component({
    templateUrl: './ratings-view.html',
    styleUrls: ['./ratings-view.css']
})
export class RatingsView extends AbstractAppView {

    constructor(
        protected override _helper: AppHelperObject, 
        public override model: RatingsModel) {
        super(_helper, model);
    }
}