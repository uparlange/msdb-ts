import { AbstractModule } from '../../fwk/abstract-module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../common/modules/shared-module';
import { StatisticModel } from './statistic-model';
import { StatisticView } from './statistic-view';

const routes: Routes = [
    { path: "", component: StatisticView }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        StatisticModel
    ],
    declarations: [
        StatisticView
    ]
})
export class StatisticModule extends AbstractModule {

    constructor() {
        super();
    }
}
