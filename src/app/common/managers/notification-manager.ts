import { Injectable } from '@angular/core';
import { AbstractManager } from 'src/app/fwk/abstract-manager';
import { SwPush } from '@angular/service-worker';
import { MsdbProvider } from '../providers/msdb-provider';

// https://blog.angular-university.io/angular-push-notifications/
@Injectable({ providedIn: "root" })
export class NotificationManager extends AbstractManager {

    _vapidPublicKey: string = "BA9MoYd5le8mdTd7xm8fbIIPycrwkQ0ynBk9Z3hmlZrWHsf_3A-e62_dXrspX_Biz1FYIVO60pWHZ3oWw-QVuk4";

    _swPush: SwPush = null;
    _msdbProvider: MsdbProvider = null;

    constructor(swPush: SwPush, msdbProvider: MsdbProvider) {
        super();
        this._swPush = swPush;
        this._msdbProvider = msdbProvider;
    }

    init(): void {
        this.getLogger().info("Push Notifications enabled : " + this._swPush.isEnabled);
        if (this._swPush.isEnabled) {
            this._swPush.subscription.subscribe((sub) => {
                if (sub == null) {
                    this._swPush.requestSubscription({
                        serverPublicKey: this._vapidPublicKey
                    }).then((sub) => {
                        this._msdbProvider.addPushSubscription(sub).subscribe((data: any) => {
                            this.getLogger().info("Subscription saved successfully");
                        });
                    }).catch((err) => {
                        this.getLogger().error(err);
                    });
                } else {
                    this._logSubscriptionUsed(sub);
                }
            });
        }
    }

    _logSubscriptionUsed(sub: any) {
        this.getLogger().info("Subscription used : " + JSON.stringify(sub));
    }
}