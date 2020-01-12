import { AbstractDirective } from './abstract-directive';
import { AbstractHelperObject } from './abstract-helper-object';

export class AbstractComponent extends AbstractDirective {

    constructor(
        protected _helper: AbstractHelperObject) {
        super(_helper);
    }
}
