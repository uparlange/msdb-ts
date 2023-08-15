import { AbstractModule } from '../../../../fwk/abstract-module';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../common/modules/shared-module';
import { NgModule } from '@angular/core';
import { SeriesView } from './series-view';
import { SeriesModel } from './series-model';

const routes: Routes = [
    { path: "", component: SeriesView }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        SeriesModel
    ],
    declarations: [
        SeriesView
    ]
})
export class SeriesModule extends AbstractModule {

    constructor() {
        super();
    }
}
