import { AbstractDirective } from './abstract-directive';
import { AbstractHelperObject } from './abstract-helper-object';

export class AbstractComponent extends AbstractDirective {

    constructor(AbstractHelperObject: AbstractHelperObject) {
        super(AbstractHelperObject);
    }
}
