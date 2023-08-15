import { AbstractDirective } from '../abstract-directive';
import { Directive, HostBinding, Input, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FwkHelperObject } from '../providers/fwk-helper-object';

@Directive({ selector: 'a[href]' })
export class LinkDirective extends AbstractDirective {

    @HostBinding("attr.rel") relAttr = '';
    @HostBinding("attr.target") targetAttr = '';
    @HostBinding("attr.href") hrefAttr = '';

    @Input() href: string = "";

    constructor(
        protected override _helper: FwkHelperObject, 
        @Inject(PLATFORM_ID) private _platformId: Object) {
        super(_helper);
    }

    override onChanges(event: any): void {
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