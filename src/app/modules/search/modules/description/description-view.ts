import { AppHelperObject } from '../../../../common/providers/app-helper-object';
import { DescriptionModel } from './description-model';
import { Component } from '@angular/core';
import { AbstractAppView } from '../../../../common/abstract-app-view';

@Component({
    templateUrl: './description-view.html',
    styleUrls: ['./description-view.css']
})
export class DescriptionView extends AbstractAppView {

    constructor(
        protected override _helper: AppHelperObject, 
        public override model: DescriptionModel) {
        super(_helper, model);
    }
}