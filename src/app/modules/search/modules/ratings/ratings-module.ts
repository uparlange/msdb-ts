import { AbstractModule } from 'src/app/fwk/abstract-module';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/common/modules/shared-module';
import { NgModule } from '@angular/core';
import { RatingsView } from './ratings-view';
import { RatingsModel } from './ratings-model';

const routes: Routes = [
    { path: "", component: RatingsView }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        RatingsModel
    ],
    declarations: [
        RatingsView
    ]
})
export class RatingsModule extends AbstractModule {

    constructor() {
        super();
    }
}
