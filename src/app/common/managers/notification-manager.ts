import { Injectable, EventEmitter } from '@angular/core';
import { AbstractManager } from 'src/app/fwk/abstract-manager';
import { SwPush } from '@angular/service-worker';
import { MsdbProvider } from '../providers/msdb-provider';
import { ConfigProvider } from '../providers/config-provider';

// https://blog.angular-university.io/angular-push-notifications/
@Injectable({ providedIn: "root" })
export class NotificationManager extends AbstractManager {

    private _vapidPublicKey: string = "BA9MoYd5le8mdTd7xm8fbIIPycrwkQ0ynBk9Z3hmlZrWHsf_3A-e62_dXrspX_Biz1FYIVO60pWHZ3oWw-QVuk4";

    private _swPush: SwPush = null;
    private _msdbProvider: MsdbProvider = null;
    private _configProvider: ConfigProvider = null;
    private _sub: any = null;

    constructor(swPush: SwPush, msdbProvider: MsdbProvider, configProvider: ConfigProvider) {
        super();
        this._swPush = swPush;
        this._msdbProvider = msdbProvider;
        this._configProvider = configProvider;
    }

    init(): void {
        this.getLogger().info("Push Notifications enabled : " + this.isEnabled());
        if (this.isEnabled()) {
            this._swPush.subscription.subscribe((sub) => {
                this.getLogger().info("Subscription used : " + JSON.stringify(sub));
                this._sub = sub;
            });
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
        }
    }

    isEnabled(): boolean {
        return this._swPush.isEnabled;
    }

    getSubscription(): any {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        setTimeout(() => {
            eventEmitter.emit(this._sub);
        }, 0);
        return eventEmitter;
    }

    subscribe(): EventEmitter<any> {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        if (this.isEnabled()) {
            this._swPush.requestSubscription({
                serverPublicKey: this._vapidPublicKey
            }).then((sub: any) => {
                this._sub = sub;
                // Try to save subscription to backend on each launch
                // Duplicates are managed (by hash)
                this._msdbProvider.addPushSubscription(this._sub).subscribe((data: string) => {
                    this.getLogger().info("Subscription added : " + data);
                    eventEmitter.emit(this._sub);
                });
            }).catch((err: any) => {
                this.getLogger().error(err);
                eventEmitter.emit(this._sub);
            });
        } else {
            setTimeout(() => {
                eventEmitter.emit(this._sub);
            }, 0);
        }
        return eventEmitter;
    }

    unsubscribe(): EventEmitter<any> {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        if (this.isEnabled() && this._sub != null) {
            const currentSub = this._sub;
            this._swPush.unsubscribe().then(() => {
                this._sub = null;
                this._msdbProvider.removePushSubscription(currentSub).subscribe((data: string) => {
                    this.getLogger().info("Subscription removed : " + data);
                    eventEmitter.emit(this._sub);
                });
            }).catch((err: any) => {
                this.getLogger().error(err);
                eventEmitter.emit(this._sub);
            });
        } else {
            setTimeout(() => {
                eventEmitter.emit(this._sub);
            }, 0);
        }
        return eventEmitter;
    }

}