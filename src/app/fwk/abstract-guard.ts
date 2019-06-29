import { AbstractHelperObject } from './abstract-helper-object';
import { TranslateManager } from './managers/translate-manager';
import { WindowRef } from './window-ref';
import { AbstractHelper } from './abstract-helper';

export class AbstractGuard extends AbstractHelper {

    constructor(AbstractHelperObject: AbstractHelperObject) {
        super(AbstractHelperObject);
    }

    getLabels(): TranslateManager {
        return this._helper.getLabels();
    }

    getWindowRef(): WindowRef {
        return this._helper.getWindowRef();
    }
}