import { AbstractDirective } from 'src/app/fwk/abstract-directive';
import { Directive, HostListener } from '@angular/core';
import { AppHelperObject } from '../providers/app-helper-object';

@Directive({ selector: "[scrollToTop]" })
export class ScrollToTopDirective extends AbstractDirective {

    _scrollDuration: number = 250;

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    @HostListener("click") onClick(event: any) {
        const cosParameter = this.getWindowRef().getScrollPosition().y / 2;
        let scrollCount = 0;
        let oldTimestamp = performance.now();
        const step = (newTimestamp: number) => {
            scrollCount += Math.PI / (this._scrollDuration / (newTimestamp - oldTimestamp));
            if (scrollCount >= Math.PI) {
                this.getWindowRef().scrollTo(0, 0);
            }
            if (this.getWindowRef().getScrollPosition().y === 0) {
                return;
            }
            this.getWindowRef().scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
            oldTimestamp = newTimestamp;
            this.getWindowRef().nativeWindow.requestAnimationFrame(step);
        }
        this.getWindowRef().nativeWindow.requestAnimationFrame(step);
    }
}