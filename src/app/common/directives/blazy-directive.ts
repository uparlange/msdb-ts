import { Directive, SimpleChanges, Input, HostBinding } from '@angular/core';
import { AbstractDirective } from 'src/app/fwk/abstract-directive';
import { AppHelperObject } from '../app-helper-object';
import { BlazyManager } from '../managers/blazy-Manager';

@Directive({ selector: "[blazySrc]" })
export class BlazyDirective extends AbstractDirective {

    @HostBinding("class.b-lazy") bLazy: boolean = true;
    @HostBinding("attr.src") src: string = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    @HostBinding("attr.data-src") dataSrc: string = null;

    @Input() blazySrc: String = null;

    _lazyManager: BlazyManager = null;

    constructor(appHelperObject: AppHelperObject, lazyManager: BlazyManager) {
        super(appHelperObject);
        this._lazyManager = lazyManager;
    }

    onChanges(changes: SimpleChanges): void {
        super.onChanges(changes);
        if (changes.hasOwnProperty("blazySrc")) {
            if (typeof changes.blazySrc.currentValue === "string") {
                this.dataSrc = changes.blazySrc.currentValue;
                this._lazyManager.refresh();
            }
        }
    }
}