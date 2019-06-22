import { AbstractDirective } from './abstract-directive';
import { AbstractClassHelper } from './abstract-class-helper';

export class AbstractComponent extends AbstractDirective {

    constructor(abstractClassHelper: AbstractClassHelper) {
        super(abstractClassHelper);
    }
}
