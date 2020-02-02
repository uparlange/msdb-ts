import { AbstractModule } from 'src/app/fwk/abstract-module';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/common/modules/shared-module';
import { NgModule } from '@angular/core';
import { MyGamesView } from './my-games-view';
import { MyGamesModel } from './my-games-model';
import { NwjsCanActivate } from 'src/app/common/guards/nwjs-can-activate';

const routes: Routes = [
    { path: "", component: MyGamesView, canActivate: [NwjsCanActivate] }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        MyGamesModel,
        NwjsCanActivate
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
