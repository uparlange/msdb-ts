import { AbstractModule } from 'src/app/fwk/abstract-module';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/common/modules/shared-module';
import { NgModule } from '@angular/core';
import { VersionsView } from './versions-view';
import { VersionsModel } from './versions-model';

const routes: Routes = [
    { path: "", component: VersionsView }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        VersionsModel
    ],
    declarations: [
        VersionsView
    ]
})
export class VersionsModule extends AbstractModule {

    constructor() {
        super();
    }
}
