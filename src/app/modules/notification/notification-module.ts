import { AbstractModule } from '../../fwk/abstract-module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../common/modules/shared-module';
import { NotificationView } from './notification-view';
import { NotificationModel } from './notification-model';

const routes: Routes = [
    { path: "", component: NotificationView }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        NotificationModel
    ],
    declarations: [
        NotificationView
    ]
})
export class NotificationModule extends AbstractModule {

    constructor() {
        super();
    }
}
