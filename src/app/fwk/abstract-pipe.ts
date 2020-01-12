
import { OnDestroy } from '@angular/core';
import { TranslateManager } from './managers/translate-manager';
import { AbstractHelper } from './abstract-helper';
import { AbstractHelperObject } from './abstract-helper-object';
import { FwkHelperObject } from './providers/fwk-helper-object';

export class AbstractPipe extends AbstractHelper implements OnDestroy {

    constructor(
        protected _helper: AbstractHelperObject) {
        super(_helper);
    }

    ngOnDestroy(): void {
        this.onDestroy();
    }

    onDestroy(): void {
        // need override
    }

    getLabels(): TranslateManager {
        return this._getHelper().getLabels();
    }

    protected _getHelper(): FwkHelperObject {
        return <FwkHelperObject>this._helper;
    }
}
