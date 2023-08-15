import { AbstractManager } from '../../fwk/abstract-manager';
import { RouterManager } from '../../fwk/managers/router-manager';
import { Injectable } from '@angular/core';
import { WindowRef } from '../../fwk/providers/window-ref';

@Injectable({ providedIn: "root" })
export class AnalyticsManager extends AbstractManager {

    private _gaMeasurementIds: Array<string> = ["UA-141763528-1", "G-SQ454DYNBT"];

    constructor(
        private _routerManager: RouterManager,
        private _windowRef: WindowRef) {
        super();
    }

    override init(): void {
        super.init();
        this._windowRef.nativeWindow.gtag("js", new Date());
        this._gaMeasurementIds.forEach((element) => {
            this._windowRef.nativeWindow.gtag("config", element);
        });
        this._routerManager.on("navigationEnd").subscribe((event: any) => {
            this._gaMeasurementIds.forEach((element) => {
                this._windowRef.nativeWindow.gtag("event", "page_view", {
                    page_path: event.urlAfterRedirects,
                    send_to: element
                });
            });
        });
    }

}
