import { AbstractManager } from '../../fwk/abstract-manager';
import { RouterManager } from 'src/app/fwk/managers/router-manager';
import { Injectable } from '@angular/core';
import { WindowRef } from 'src/app/fwk/providers/window-ref';

@Injectable({ providedIn: "root" })
export class AnalyticsManager extends AbstractManager {

    private _gaMeasurementId: string = "UA-141763528-1";
    private _routerManager: RouterManager = null;
    private _windowRef: WindowRef = null;

    constructor(routerManager: RouterManager, windowRef: WindowRef) {
        super();
        this._routerManager = routerManager;
        this._windowRef = windowRef;
    }

    init(): void {
        super.init();
        this._windowRef.nativeWindow.gtag('js', new Date());
        this._windowRef.nativeWindow.gtag('config', this._gaMeasurementId);
        this._routerManager.on("navigationEnd").subscribe((event: any) => {
            this._windowRef.nativeWindow.gtag("config", this._gaMeasurementId, { "page_path": event.urlAfterRedirects });
        });
    }
}
