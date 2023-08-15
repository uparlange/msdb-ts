import { AbstractModule } from '../../fwk/abstract-module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundView } from './page-not-found-view';
import { PageNotFoundModel } from './page-not-found-model';
import { SharedModule } from '../../common/modules/shared-module';

const routes: Routes = [
    { path: "", component: PageNotFoundView }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        PageNotFoundModel
    ],
    declarations: [
        PageNotFoundView
    ]
})
export class PageNotFoundModule extends AbstractModule {

    constructor() {
        super();
    }
}
