import { AbstractModule } from '../../../../fwk/abstract-module';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../common/modules/shared-module';
import { NgModule } from '@angular/core';
import { ManufacturersView } from './manufacturers-view';
import { ManufacturersModel } from './manufacturers-model';

const routes: Routes = [
    { path: "", component: ManufacturersView }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        ManufacturersModel
    ],
    declarations: [
        ManufacturersView
    ]
})
export class ManufacturersModule extends AbstractModule {

    constructor() {
        super();
    }
}
