import { AbstractModule } from 'src/app/fwk/abstract-module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../common/modules/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { ConfigView } from './config-view';
import { ConfigModel } from './config-model';
import { ConfigCanActivate } from './config-can-activate';
import { ConfigCanDeactivate } from './config-can-deactivate';

const routes: Routes = [
    { path: "", component: ConfigView, canActivate: [ConfigCanActivate], canDeactivate: [ConfigCanDeactivate] }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        ConfigModel,
        ConfigCanActivate,
        ConfigCanDeactivate
    ],
    declarations: [
        ConfigView
    ]
})
export class ConfigModule extends AbstractModule {

    constructor() {
        super();
    }
}
