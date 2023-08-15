import { AbstractModule } from '../../../../fwk/abstract-module';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../common/modules/shared-module';
import { NgModule } from '@angular/core';
import { CategoriesView } from './categories-view';
import { CategoriesModel } from './categories-model';

const routes: Routes = [
    { path: "", component: CategoriesView }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        CategoriesModel
    ],
    declarations: [
        CategoriesView
    ]
})
export class CategoriesModule extends AbstractModule {

    constructor() {
        super();
    }
}
