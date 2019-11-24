import { AbstractManager } from '../abstract-manager';
import { Router, NavigationStart, NavigationEnd, Params, NavigationExtras } from '@angular/router';
import { CacheManager } from './cache-manager';
import { NgZone, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { WindowRef } from '../providers/window-ref';
import { Location } from '@angular/common';

@Injectable({ providedIn: "root" })
export class RouterManager extends AbstractManager {

    _router: Router = null;
    _cacheManager: CacheManager = null;
    _ngZone: NgZone = null;
    _windowRef: WindowRef = null;
    _mutationObserver: MutationObserver = null;
    _eventsSubscription: Subscription = null;
    _creationCompleteTimeout: any = null;
    _location: Location = null;

    constructor(router: Router, cacheManager: CacheManager, ngZone: NgZone, windowRef: WindowRef, location: Location) {
        super();
        this._router = router;
        this._cacheManager = cacheManager;
        this._ngZone = ngZone;
        this._windowRef = windowRef;
        this._location = location;
    }

    init(): void {
        super.init();
        this._eventsSubscription = this._router.events.subscribe((e) => {
            if (e instanceof NavigationStart) {
                if (e.id === 1) {
                    if (this._windowRef.isInWebApp()) {
                        this._restoreLastView();
                    }
                }
                else {
                    this.saveCurrentViewScrollPosition();
                }
            } else if (e instanceof NavigationEnd) {
                this.emit("navigationEnd", e);
                this._saveLastView(e.urlAfterRedirects);
            }
        });
    }

    saveCurrentViewScrollPosition(): void {
        const scrollPosition = this._windowRef.getScrollPosition();
        this._cacheManager.setItem(`scrollTop_${this._getCurrentPath()}`, scrollPosition.y, "version");
    }

    navigate(commands: any[], extras?: NavigationExtras): void {
        this._ngZone.run(() => {
            this._router.navigate(commands, extras);
        });
    }

    back(): void {
        this._location.back();
    }

    getUrl(): string {
        return this._router.url;
    }

    getUrlWithoutQueryParams(): string {
        let url = this.getUrl();
        if (url.indexOf("?") !== -1) {
            url = url.substring(0, url.indexOf("?"));
        }
        return url;
    }

    getUrlQueryParams(): Params {
        return this._router.parseUrl(this._router.url).queryParams;
    }

    restoreScrollPosition(): void {
        if (this._mutationObserver === null) {
            this._mutationObserver = new MutationObserver(() => {
                if (this._creationCompleteTimeout !== null) {
                    clearTimeout(this._creationCompleteTimeout);
                }
                this._creationCompleteTimeout = setTimeout(() => {
                    this._creationCompleteTimeout = null;
                    if (this._mutationObserver !== null) {
                        this._mutationObserver.disconnect();
                        this._mutationObserver = null;
                    }
                    this._cacheManager.getItem(`scrollTop_${this._getCurrentPath()}`, 0).subscribe((value: number) => {
                        this._windowRef.scrollTo(0, value);
                    });
                }, 50);
            });
            const config = {
                childList: true,
                attributes: false,
                characterData: false,
                subtree: true
            };
            this._mutationObserver.observe(document.querySelector("body"), config);
        }
    }

    _saveLastView(url: string): void {
        this._cacheManager.setItem("lastView", url, "version");
    }

    _restoreLastView(): void {
        this._cacheManager.getItem("lastView", "/home").subscribe((value: string) => {
            this._router.navigateByUrl(value);
        });
    }

    _getCurrentPath(): string {
        return this._router["location"].path(true);
    }
}
