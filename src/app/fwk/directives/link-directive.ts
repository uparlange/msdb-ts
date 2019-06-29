import { AbstractDirective } from '../abstract-directive';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { Directive } from '@angular/core';

@Directive({
    selector: "a",
    inputs: ["target"],
    host: {
        "[attr.rel]": "rel",
        "(click)": "onClick($event)"
    }
})
export class LinkDirective extends AbstractDirective {

    rel: string = null;

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    onChanges(event: any): void {
        super.onChanges(event);
        if (event.hasOwnProperty("target")) {
            if (event.target.currentValue === "_blank") {
                this.rel = "noopener";
            }
        }
    }

    onClick() {
        this.getRouter().saveCurrentViewScrollPosition();
    }
}