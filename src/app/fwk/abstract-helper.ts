import { AbstractObject } from './abstract-object';
import { AbstractHelperObject } from './abstract-helper-object';

export class AbstractHelper extends AbstractObject {

    constructor(
        protected _helper: AbstractHelperObject) {
        super();
    }
}