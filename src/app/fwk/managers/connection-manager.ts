import { AbstractManager } from '../abstract-manager';
import { Injectable } from '@angular/core';
import { WindowRef } from '../providers/window-ref';

@Injectable({ providedIn: "root" })
export class ConnectionManager extends AbstractManager {

    _windowRef: WindowRef = null;

    online: boolean = false;

    constructor(windowRef: WindowRef) {
        super();
        this._windowRef = windowRef;
        this.online = this._windowRef.nativeWindow.navigator.onLine;
    }

    init(): void {
        super.init();
        this._windowRef.nativeWindow.addEventListener("offline", () => {
            this._changeHandler();
        });
        this._windowRef.nativeWindow.addEventListener("online", () => {
            this._changeHandler();
        });
    }
    _changeHandler(): void {
        this.online = this._windowRef.nativeWindow.navigator.onLine;
        this.emit("change", this.online);
    }
}
