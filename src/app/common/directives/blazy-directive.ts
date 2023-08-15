import { Directive, SimpleChanges, Input, HostBinding, ElementRef } from '@angular/core';
import { AbstractDirective } from '../../fwk/abstract-directive';
import { BlazyManager } from '../managers/blazy-Manager';
import { AppHelperObject } from '../providers/app-helper-object';

@Directive({ selector: "[blazySrc]" })
export class BlazyDirective extends AbstractDirective {

    @HostBinding("class.b-lazy") bLazy: boolean = true;
    @HostBinding("attr.src") src: string = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    @HostBinding("attr.data-src") dataSrc: string = "";

    @Input() blazySrc: String = "";

    constructor(
        protected override _helper: AppHelperObject,
        private _lazyManager: BlazyManager,
        private _elementRef: ElementRef) {
        super(_helper);
    }

    override onChanges(changes: SimpleChanges): void {
        super.onChanges(changes);
        if (changes['blazySrc']) {
            this._elementRef.nativeElement.classList.remove("b-loaded");
            this.dataSrc = changes['blazySrc'].currentValue;
            this._lazyManager.refresh();
        }
    }
}