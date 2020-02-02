import { AbstractModule } from 'src/app/fwk/abstract-module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/common/modules/shared-module';
import { NwjsModel } from './nwjs-model';
import { NwjsView } from './nwjs-view';
import { NwjsCanActivate } from 'src/app/common/guards/nwjs-can-activate';

const routes: Routes = [
    { path: "", component: NwjsView, canActivate: [NwjsCanActivate] }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        NwjsModel,
        NwjsCanActivate
    ],
    declarations: [
        NwjsView
    ]
})
export class NwjsModule extends AbstractModule {

    constructor() {
        super();
    }
}
