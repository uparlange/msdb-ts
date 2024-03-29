import { AbstractManager } from '../abstract-manager';
import { Injectable } from '@angular/core';
import { WindowRef } from '../providers/window-ref';

@Injectable({ providedIn: "root" })
export class ConnectionManager extends AbstractManager {

    online: boolean = false;

    constructor(
        private _windowRef: WindowRef) {
        super();
        this.online = this._windowRef.nativeWindow.navigator.onLine;
    }

    override init(): void {
        super.init();
        this._windowRef.nativeWindow.addEventListener("offline", () => {
            this._changeHandler();
        });
        this._windowRef.nativeWindow.addEventListener("online", () => {
            this._changeHandler();
        });
    }

    private _changeHandler(): void {
        this.online = this._windowRef.nativeWindow.navigator.onLine;
        this.emit("change", this.online);
    }
}
