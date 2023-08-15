import { AbstractModule } from '../../../../fwk/abstract-module';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../common/modules/shared-module';
import { NgModule } from '@angular/core';
import { YearsView } from './years-view';
import { YearsModel } from './years-model';

const routes: Routes = [
    { path: "", component: YearsView }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        YearsModel
    ],
    declarations: [
        YearsView
    ]
})
export class YearsModule extends AbstractModule {

    constructor() {
        super();
    }
}
