import { AbstractManager } from '../../fwk/abstract-manager';
import { RouterManager } from 'src/app/fwk/managers/router-manager';
import { Injectable } from '@angular/core';

@Injectable()
export class AnalyticsManager extends AbstractManager {

    _gaMeasurementId: string = "UA-141763528-1";
    _routerManager: RouterManager = null;

    constructor(routerManager: RouterManager) {
        super();
        this._routerManager = routerManager;
    }

    init(): void {
        super.init();
        window.gtag('js', new Date());
        window.gtag('config', this._gaMeasurementId);
        this._routerManager.on("navigationEnd").subscribe((event: any) => {
            window.gtag("config", this._gaMeasurementId, { "page_path": event.urlAfterRedirects });
        });
    }
}
