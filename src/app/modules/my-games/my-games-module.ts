import { AbstractModule } from 'src/app/fwk/abstract-module';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/common/modules/shared-module';
import { NgModule } from '@angular/core';
import { MyGamesView } from './my-games-view';
import { MyGamesModel } from './my-games-model';
import { MyGamesCanActivate } from './guards/my-games-can-activate';

const routes: Routes = [
    { path: "", component: MyGamesView, canActivate: [MyGamesCanActivate] }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        MyGamesModel,
        MyGamesCanActivate
    ],
    declarations: [
        MyGamesView
    ]
})
export class MyGamesModule extends AbstractModule {

    constructor() {
        super();
    }
}
