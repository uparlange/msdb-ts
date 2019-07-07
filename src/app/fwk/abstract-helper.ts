import { AbstractHelperObject } from './abstract-helper-object';
import { AbstractObject } from './abstract-object';

export class AbstractHelper extends AbstractObject {

    _helper: AbstractHelperObject = null;

    constructor(AbstractHelperObject: AbstractHelperObject) {
        super();
        this._helper = AbstractHelperObject;
    }
}