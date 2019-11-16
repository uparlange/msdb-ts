import { Injectable } from '@angular/core';
import { AbstractManager } from 'src/app/fwk/abstract-manager';
import { SwPush } from '@angular/service-worker';
import { MsdbProvider } from '../providers/msdb-provider';
import { ConfigProvider } from '../providers/config-provider';

// https://blog.angular-university.io/angular-push-notifications/
@Injectable({ providedIn: "root" })
export class NotificationManager extends AbstractManager {

    _vapidPublicKey: string = "BA9MoYd5le8mdTd7xm8fbIIPycrwkQ0ynBk9Z3hmlZrWHsf_3A-e62_dXrspX_Biz1FYIVO60pWHZ3oWw-QVuk4";

    _swPush: SwPush = null;
    _msdbProvider: MsdbProvider = null;
    _configProvider: ConfigProvider = null;

    constructor(swPush: SwPush, msdbProvider: MsdbProvider, configProvider: ConfigProvider) {
        super();
        this._swPush = swPush;
        this._msdbProvider = msdbProvider;
        this._configProvider = configProvider;
    }

    init(): void {
        this.getLogger().info("Push Notifications enabled : " + this._swPush.isEnabled);
        if (this._swPush.isEnabled) {
            // Beta feature until generalisation
            if (this._configProvider.inBetaMode()) {
                this._swPush.messages.subscribe((payload: any) => {
                    // received message ack
                    this._msdbProvider.setMessageReceived(payload.notification.data).subscribe(() => {
                        // Don't act !
                    });
                });
                this._swPush.notificationClicks.subscribe((payload: any) => {
                    // clicked message ack
                    this._msdbProvider.setMessageClicked(payload.notification.data).subscribe(() => {
                        // Don't act !
                    });
                });
                this._swPush.requestSubscription({
                    serverPublicKey: this._vapidPublicKey
                }).then((sub: any) => {
                    this.getLogger().info("Subscription used : " + JSON.stringify(sub));
                    // Try to save subscription to backend on each launch
                    // Duplicates are managed (by hash)
                    this._msdbProvider.addPushSubscription(sub).subscribe((data: string) => {
                        this.getLogger().info("Subscription id : " + data);
                    });
                }).catch((err: any) => {
                    this.getLogger().error(err);
                });
            }
        }
    }

}