import { AbstractDirective } from 'src/app/fwk/abstract-directive';
import { AppHelperObject } from '../app-helper-object';
import { Directive, ContentChild } from '@angular/core';
import { MatIcon } from '@angular/material';

@Directive({
    selector: "[mat-icon-button]",
    host: {
        "[attr.aria-label]": "ariaLabel"
    }
})
export class MatIconButtonDirective extends AbstractDirective {

    @ContentChild(MatIcon, { static: false }) matIcon !: MatIcon;

    ariaLabel: string = "";

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    afterContentInit(): void {
        super.afterContentInit();
        this.ariaLabel = this.matIcon.svgIcon;
    }
}
