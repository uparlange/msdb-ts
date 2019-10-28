import { AbstractDirective } from '../abstract-directive';
import { Directive, HostBinding, PLATFORM_ID, Inject, Input, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Directive({ selector: 'a[href]' })
export class LinkDirective extends AbstractDirective {

    @HostBinding("attr.rel") relAttr = '';
    @HostBinding("attr.target") targetAttr = '';
    @HostBinding("attr.href") hrefAttr = '';

    @Input() href: string;

    constructor(appHelperObject: AppHelperObject, @Inject(PLATFORM_ID) private platformId: string) {
        super(appHelperObject);
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
        return isPlatformBrowser(this.platformId) && !this.href.includes(location.hostname);
    }
}