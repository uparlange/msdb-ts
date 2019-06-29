import { AbstractModule } from 'src/app/fwk/abstract-module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../common/modules/shared-module';
import { Routes, RouterModule } from '@angular/router';
import { HistoryView } from './history-view';
import { HistoryModel } from './history-model';

const routes: Routes = [
    { path: "", component: HistoryView }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        HistoryModel
    ],
    declarations: [
        HistoryView
    ]
})
export class HistoryModule extends AbstractModule {

    constructor() {
        super();
    }
}
