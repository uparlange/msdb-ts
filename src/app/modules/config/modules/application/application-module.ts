import { AbstractModule } from 'src/app/fwk/abstract-module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/common/modules/shared-module';
import { ApplicationView } from './application-view';
import { ApplicationModel } from './application-model';
import { NwjsCanActivate } from 'src/app/common/guards/nwjs-can-activate';

const routes: Routes = [
    { path: "", component: ApplicationView, canActivate: [NwjsCanActivate] }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        ApplicationModel,
        NwjsCanActivate
    ],
    declarations: [
        ApplicationView
    ]
})
export class ApplicationModule extends AbstractModule {

    constructor() {
        super();
    }
}
