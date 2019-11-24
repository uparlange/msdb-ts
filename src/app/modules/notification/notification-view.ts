import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { NotificationModel } from './notification-model';

@Component({
    templateUrl: './notification-view.html',
    styleUrls: ['./notification-view.css']
})
export class NotificationView extends AbstractAppView {

    constructor(appHelperObject: AppHelperObject, notificationModel: NotificationModel) {
        super(appHelperObject, notificationModel);
    }

    subscribe(): void {
        this._getModel().subscribe();
    }

    unsubscribe(): void {
        this._getModel().unsubscribe();
    }

    _getModel(): NotificationModel {
        return <NotificationModel>this.model;
    }
}