import { AbstractDirective } from 'src/app/fwk/abstract-directive';
import { Directive, ContentChild, HostBinding } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AppHelperObject } from '../providers/app-helper-object';

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
