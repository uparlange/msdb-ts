import { AbstractDirective } from '../abstract-directive';
import { Directive, HostBinding, PLATFORM_ID, Inject, Input, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FwkHelperObject } from '../providers/fwk-helper-object';

@Directive({ selector: 'a[href]' })
export class LinkDirective extends AbstractDirective {

    @HostBinding("attr.rel") relAttr = '';
    @HostBinding("attr.target") targetAttr = '';
    @HostBinding("attr.href") hrefAttr = '';

    @Input() href: string;

    constructor(
        protected _helper: FwkHelperObject, 
        @Inject(PLATFORM_ID) private _platformId: string) {
        super(_helper);
    }

    onChanges(event: any): void {
        super.onChanges(event);
        this.hrefAttr = this.href;
        if (this._isLinkExternal()) {
            this.relAttr = 'noopener';
            this.targetAttr = '_blank';
        }
    }

    @HostListener("click") onClick(event: any) {
        this.getRouter().saveCurrentViewScrollPosition();
    }

    private _isLinkExternal() {
        return isPlatformBrowser(this._platformId) && !this.href.includes(location.hostname);
    }
}