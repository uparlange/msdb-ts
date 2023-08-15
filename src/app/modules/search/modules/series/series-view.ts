import { AbstractAppView } from '../../../../common/abstract-app-view';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';
import { SeriesModel } from './series-model';
import { Component } from '@angular/core';

@Component({
    templateUrl: './series-view.html',
    styleUrls: ['./series-view.css']
})
export class SeriesView extends AbstractAppView {

    constructor(
        protected override _helper: AppHelperObject, 
        public override model: SeriesModel) {
        super(_helper, model);
    }
}