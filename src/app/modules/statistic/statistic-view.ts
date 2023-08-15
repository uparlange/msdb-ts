import { AbstractAppView } from '../../common/abstract-app-view';
import { Component } from '@angular/core';
import { AppHelperObject } from '../../common/providers/app-helper-object';
import { StatisticModel } from './statistic-model';

@Component({
    templateUrl: './statistic-view.html',
    styleUrls: ['./statistic-view.css']
})
export class StatisticView extends AbstractAppView {

    constructor(
        protected override _helper: AppHelperObject, 
        public override model: StatisticModel) {
        super(_helper, model);
    }
    
}