import { Directive, Input, TemplateRef } from '@angular/core';
import { AbstractDirective } from '../../../fwk/abstract-directive';
import { AppHelperObject } from '../../providers/app-helper-object';

@Directive({ selector: "ng-template[columnName]" })
export class AdvTableColumnDirective extends AbstractDirective {

    @Input() columnName: string = "";
    @Input() columnWidth: string = "";

    constructor(
        protected override _helper: AppHelperObject,
        public templateRef: TemplateRef<any>) {
        super(_helper);
    }
}