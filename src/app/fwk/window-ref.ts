import { AbstractClass } from './abstract-class';
import { Injectable } from '@angular/core';

@Injectable()
export class WindowRef extends AbstractClass {

    nativeWindow: Window = window;

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
            x: this.nativeWindow.pageXOffset,
            y: this.nativeWindow.pageYOffset
        }
    }

    _isInWebAppiOS(): boolean {
        return (this.nativeWindow.navigator["standalone"] == true);
    }

    _isInWebAppChrome(): boolean {
        return (this.nativeWindow.matchMedia('(display-mode: standalone)').matches);
    }
}
