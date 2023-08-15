import { Directive, ElementRef } from '@angular/core';
import { AppHelperObject } from '../providers/app-helper-object';
import { AbstractDirective } from '../../fwk/abstract-directive';

@Directive({ selector: '[autoFocus]' })
export class AutoFocusDirective extends AbstractDirective {

    constructor(
        protected override _helper: AppHelperObject,
        private host: ElementRef) {
        super(_helper);
    }

    override afterViewInit() {
        super.afterViewInit();
        setTimeout(() => {
            this.host.nativeElement.focus();
        }, 0);
    }
}