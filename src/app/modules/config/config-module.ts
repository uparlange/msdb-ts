import { AbstractModule } from 'src/app/fwk/abstract-module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigView } from './config-view';
import { ConfigModel } from './config-model';
import { SharedModule } from 'src/app/common/modules/shared-module';
import { NwjsCanActivate } from 'src/app/common/guards/nwjs-can-activate';

const routes: Routes = [
    {
        path: "",
        component: ConfigView,
        canActivate: [NwjsCanActivate],
        children: [
            { path: "application", loadChildren: () => import("./modules/application/application-module").then(mod => mod.ApplicationModule) },
            { path: "mame", loadChildren: () => import("./modules/mame/mame-module").then(mod => mod.MameModule) },
            { path: "nwjs", loadChildren: () => import("./modules/nwjs/nwjs-module").then(mod => mod.NwjsModule) }
        ]
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        ConfigModel,
        NwjsCanActivate
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
