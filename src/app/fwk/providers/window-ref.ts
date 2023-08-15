import { Injectable } from '@angular/core';
import { AbstractObject } from '../abstract-object';

@Injectable({ providedIn: "root" })
export class WindowRef extends AbstractObject {

    public nativeWindow: any = window;

    constructor() {
        super();
    }

    isInWebApp() {
        return (this._isInWebAppiOS() || this._isInWebAppChrome());
    }

    scrollTo(x: number, y: number): void {
        this.nativeWindow.scrollTo(x, y);
    }

    getScrollPosition(): any {
        return {
            x: this.nativeWindow.scrollX,
            y: this.nativeWindow.scrollY
        }
    }

    private _isInWebAppiOS(): boolean {
        return (this.nativeWindow.navigator.standalone == true);
    }

    private _isInWebAppChrome(): boolean {
        return (this.nativeWindow.matchMedia('(display-mode: standalone)').matches);
    }
}
