import { AbstractModule } from 'src/app/fwk/abstract-module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/common/modules/shared-module';
import { MameView } from './mame-view';
import { MameModel } from './mame-model';
import { MameCanDeactivate } from './guards/mame-can-deactivate';
import { NwjsCanActivate } from 'src/app/common/guards/nwjs-can-activate';

const routes: Routes = [
    { path: "", component: MameView, canActivate: [NwjsCanActivate], canDeactivate: [MameCanDeactivate] }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        MameModel,
        NwjsCanActivate,
        MameCanDeactivate
    ],
    declarations: [
        MameView
    ]
})
export class MameModule extends AbstractModule {

    constructor() {
        super();
    }
}
