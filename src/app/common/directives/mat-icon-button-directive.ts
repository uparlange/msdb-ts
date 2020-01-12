import { AbstractDirective } from 'src/app/fwk/abstract-directive';
import { Directive, ContentChild, HostBinding } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AppHelperObject } from '../providers/app-helper-object';

@Directive({ selector: "[mat-icon-button]" })
export class MatIconButtonDirective extends AbstractDirective {

    @HostBinding("attr.aria-label") ariaLabel: string = "";

    @ContentChild(MatIcon, { static: false })
    private _matIcon !: MatIcon;

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    afterContentInit(): void {
        super.afterContentInit();
        if (this._matIcon) {
            this.ariaLabel = this._matIcon.svgIcon;
        }
    }
}
