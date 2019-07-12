import { AbstractModule } from 'src/app/fwk/abstract-module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigView } from './config-view';
import { ConfigModel } from './config-model';
import { SharedModule } from 'src/app/common/modules/shared-module';
import { ConfigCanActivate } from './guards/config-can-activate';
import { ConfigCanDeactivate } from './guards/config-can-deactivate';

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
