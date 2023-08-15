import { AbstractAppView } from '../../../../common/abstract-app-view';
import { Component } from '@angular/core';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';
import { YearsModel } from './years-model';

@Component({
    templateUrl: './years-view.html',
    styleUrls: ['./years-view.css']
})
export class YearsView extends AbstractAppView {

    constructor(
        protected override _helper: AppHelperObject, 
        public override model: YearsModel) {
        super(_helper, model);
    }
}