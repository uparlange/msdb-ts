import { AbstractModule } from 'src/app/fwk/abstract-module';
import { HomeModel } from './home-model';
import { NgModule } from '@angular/core';
import { HomeView } from './home-view';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/common/modules/shared-module';

const routes: Routes = [
    { path: "", component: HomeView }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        HomeModel
    ],
    declarations: [
        HomeView
    ]
})
export class HomeModule extends AbstractModule {

    constructor() {
        super();
    }
}
