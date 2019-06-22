import { Directive, SimpleChanges } from '@angular/core';
import { AbstractDirective } from 'src/app/fwk/abstract-directive';
import { AppClassHelper } from '../app-class-helper';
import { BlazyManager } from '../managers/blazy-Manager';

@Directive({
    selector: "[blazySrc]",
    inputs: ["blazySrc"],
    host: {
        "[class.b-lazy]": "true",
        "[attr.src]": "src",
        "[attr.data-src]": "dataSrc"
    }
})
export class BlazyDirective extends AbstractDirective {

    dataSrc: string = null;
    src: string = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

    _lazyManager: BlazyManager = null;

    constructor(appClassHelper: AppClassHelper, lazyManager: BlazyManager) {
        super(appClassHelper);
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