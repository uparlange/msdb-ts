import { AbstractModule } from 'src/app/fwk/abstract-module';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/common/modules/shared-module';
import { NgModule } from '@angular/core';
import { LanguagesView } from './languages-view';
import { LanguagesModel } from './languages-model';

const routes: Routes = [
    { path: "", component: LanguagesView }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        LanguagesModel
    ],
    declarations: [
        LanguagesView
    ]
})
export class LanguagesModule extends AbstractModule {

    constructor() {
        super();
    }
}
