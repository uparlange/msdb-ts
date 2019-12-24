import { Injectable } from '@angular/core';
import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Injectable()
export class NotificationModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    onInit(): void {
        super.onInit();
        this.data.enabled = this.getNotification().isEnabled();
        this.getNotification().getSubscription().subscribe((sub: any) => {
            this._updateSub(sub);
        });
    }

    subscribe(): void {
        this.getNotification().subscribe().subscribe((sub: any) => {
            this._updateSub(sub);
        });
    }

    unsubscribe(): void {
        this.getNotification().unsubscribe().subscribe((sub: any) => {
            this._updateSub(sub);
        });
    }

    private _updateSub(sub: any): void {
        this.data.sub = sub;
        this.getMsdbProvider().getSubscriptionsCount().subscribe((data: any) => {
            this.data.followersCount = data || 0;
        });
    }

    protected _getInitData(): any {
        return {
            enabled: false,
            sub: null,
            followersCount: 0
        };
    }
}