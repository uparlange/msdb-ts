import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { StatisticModel } from './statistic-model';

@Component({
    templateUrl: './statistic-view.html',
    styleUrls: ['./statistic-view.css']
})
export class StatisticView extends AbstractAppView {

    constructor(
        protected _helper: AppHelperObject, 
        public model: StatisticModel) {
        super(_helper, model);
    }
    
}