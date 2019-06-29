import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultView } from './result-view';
import { SharedModule } from 'src/app/common/modules/shared.module';
import { ResultModel } from './result-model';
import { AbstractModule } from 'src/app/fwk/abstract-module';

const routes: Routes = [
    { path: "", component: ResultView }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        ResultModel
    ],
    declarations: [
        ResultView
    ]
})
export class ResultModule extends AbstractModule {

    constructor() {
        super();
    }
}
