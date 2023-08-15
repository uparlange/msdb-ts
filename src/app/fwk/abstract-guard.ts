import { TranslateManager } from './managers/translate-manager';
import { WindowRef } from './providers/window-ref';
import { AbstractHelper } from './abstract-helper';
import { AbstractHelperObject } from './abstract-helper-object';
import { FwkHelperObject } from './providers/fwk-helper-object';

export class AbstractGuard extends AbstractHelper {

    constructor(
        protected override _helper: AbstractHelperObject) {
        super(_helper);
    }

    getLabels(): TranslateManager {
        return this._getHelper().getLabels();
    }

    getWindowRef(): WindowRef {
        return this._getHelper().getWindowRef();
    }

    protected _getHelper(): FwkHelperObject {
        return <FwkHelperObject>this._helper;
    }
}