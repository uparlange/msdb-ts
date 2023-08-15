import { AbstractDirective } from '../fwk/abstract-directive';
import { Directive, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppEvents } from '../app-events';
import { AppHelperObject } from '../common/providers/app-helper-object';

@Directive({ selector: "mat-progress-bar" })
export class ProgressBarDirective extends AbstractDirective {

    @HostBinding("style.display") display = "none";

    private _httpBeginSubscription: Subscription = new Subscription();
    private _httpEndSubscription: Subscription = new Subscription();
    private _counter: number = 0;

    constructor(
        protected override _helper: AppHelperObject) {
        super(_helper);
    }

    override onInit(): void {
        super.onInit();
        this._hide();
        this._httpBeginSubscription = this.getEventBus().on(AppEvents.HTTP_BEGIN).subscribe(() => {
            this._counter++;
            this._show();
        });
        this._httpEndSubscription = this.getEventBus().on(AppEvents.HTTP_END).subscribe(() => {
            this._counter--;
            if (this._counter === 0) {
                this._hide();
            }
        });
    }

    override onDestroy(): void {
        super.onDestroy();
        this._httpBeginSubscription.unsubscribe();
        this._httpEndSubscription.unsubscribe();
    }

    private _hide(): void {
        this.display = "none";
    }

    private _show(): void {
        this.display = "block";
    }
}
