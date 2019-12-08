import { AbstractModule } from 'src/app/fwk/abstract-module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/common/modules/shared-module';
import { UpdateView } from './update-view';
import { UpdateModel } from './update-model';
import { UpdateCanActivate } from './guards/update-can-activate';

const routes: Routes = [
    { path: "", component: UpdateView, canActivate: [UpdateCanActivate] }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        UpdateModel,
        UpdateCanActivate
    ],
    declarations: [
        UpdateView
    ]
})
export class UpdateModule extends AbstractModule {

    constructor() {
        super();
    }
}
