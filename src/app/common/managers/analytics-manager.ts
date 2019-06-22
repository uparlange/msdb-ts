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
        this._gtag("js", new Date());
        this._gtag("config", this._gaMeasurementId);
        this._routerManager.on("navigationEnd").subscribe((event) => {
            this._gtag("config", this._gaMeasurementId, { "page_path": event.urlAfterRedirects });
        });
        this._loadScript();
    }

    _loadScript(): void {
        const head = document.getElementsByTagName("head")[0];
        const script = document.createElement("script");
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + this._gaMeasurementId;
        script.async = true;
        head.appendChild(script);
    }

    _gtag(...args: any[]) {
        this._getDataLayer().push(args);
    }

    _getDataLayer(): Array<any> {
        if (!window["dataLayer"]) {
            window["dataLayer"] = new Array();
        }
        return window["dataLayer"];
    }
}
