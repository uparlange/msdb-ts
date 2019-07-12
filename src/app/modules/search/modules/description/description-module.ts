import { AbstractModule } from 'src/app/fwk/abstract-module';
import { Routes, RouterModule } from '@angular/router';
import { DescriptionView } from './description-view';
import { SharedModule } from 'src/app/common/modules/shared-module';
import { NgModule } from '@angular/core';
import { DescriptionModel } from './description-model';

const routes: Routes = [
    { path: "", component: DescriptionView }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        DescriptionModel
    ],
    declarations: [
        DescriptionView
    ]
})
export class DescriptionModule extends AbstractModule {

    constructor() {
        super();
    }
}
