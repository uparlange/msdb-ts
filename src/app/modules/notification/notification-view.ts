import { AbstractAppView } from '../../common/abstract-app-view';
import { Component } from '@angular/core';
import { AppHelperObject } from '../../common/providers/app-helper-object';
import { NotificationModel } from './notification-model';

@Component({
    templateUrl: './notification-view.html',
    styleUrls: ['./notification-view.css']
})
export class NotificationView extends AbstractAppView {

    constructor(
        protected override _helper: AppHelperObject, 
        public override model: NotificationModel) {
        super(_helper, model);
    }

    subscribe(): void {
        this._getModel().subscribe();
    }

    unsubscribe(): void {
        this._getModel().unsubscribe();
    }

    private _getModel(): NotificationModel {
        return <NotificationModel>this.model;
    }
}