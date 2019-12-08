import { AbstractDirective } from 'src/app/fwk/abstract-directive';
import { Directive, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppEvents } from '../app-events';
import { AppHelperObject } from '../common/providers/app-helper-object';

@Directive({ selector: "mat-progress-bar" })
export class ProgressBarDirective extends AbstractDirective {

    @HostBinding("style.display") display = "none";

    private _httpBeginSubscription: Subscription = null;
    private _httpEndSubscription: Subscription = null;
    private _counter: number = 0;

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    onInit(): void {
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

    onDestroy(): void {
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
