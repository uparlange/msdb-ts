import { AbstractDirective } from 'src/app/fwk/abstract-directive';
import { AppHelperObject } from '../app-helper-object';
import { Directive, ContentChild, HostBinding } from '@angular/core';
import { MatIcon } from '@angular/material';

@Directive({ selector: "[mat-icon-button]" })
export class MatIconButtonDirective extends AbstractDirective {

    @ContentChild(MatIcon, { static: false }) matIcon !: MatIcon;

    @HostBinding("attr.aria-label") ariaLabel: string = "";

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    afterContentInit(): void {
        super.afterContentInit();
        if (this.matIcon) {
            this.ariaLabel = this.matIcon.svgIcon;
        }
    }
}
