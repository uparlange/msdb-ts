import { Directive, Input, TemplateRef } from '@angular/core';
import { AbstractDirective } from 'src/app/fwk/abstract-directive';
import { AppHelperObject } from '../../providers/app-helper-object';

@Directive({ selector: "ng-template[columnName]" })
export class AdvTableColumnDirective extends AbstractDirective {

    @Input() columnName: string = "";
    @Input() columnWidth: string = "";

    templateRef: TemplateRef<any> = null;

    constructor(appHelperObject: AppHelperObject, templateRef: TemplateRef<any>) {
        super(appHelperObject);
        this.templateRef = templateRef;
    }
}