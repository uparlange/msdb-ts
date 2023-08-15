import { Component } from '@angular/core';
import { AbstractDirective } from './abstract-directive';
import { AbstractHelperObject } from './abstract-helper-object';

@Component({ template: "" })
export class AbstractComponent extends AbstractDirective {

    constructor(
        protected override _helper: AbstractHelperObject) {
        super(_helper);
    }
}
