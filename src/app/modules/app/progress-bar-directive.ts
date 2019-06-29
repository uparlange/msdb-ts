import { AbstractDirective } from 'src/app/fwk/abstract-directive';
import { Directive } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppHelperObject } from 'src/app/common/app-helper-object';

@Directive({
    selector: "mat-progress-bar",
    host: {
        "[style.display]": "display"
    }
})
export class ProgressBarDirective extends AbstractDirective {

    display = "none";

    _httpBeginSubscription: Subscription = null;
    _httpEndSubscription: Subscription = null;
    _counter: number = 0;

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    onInit(): void {
        super.onInit();
        this._hide();
        this._httpBeginSubscription = this.getEventBus().on("HTTP_BEGIN").subscribe(() => {
            this._counter++;
            this._show();
        });
        this._httpEndSubscription = this.getEventBus().on("HTTP_END").subscribe(() => {
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

    _hide(): void {
        this.display = "none";
    }

    _show(): void {
        this.display = "block";
    }
}
