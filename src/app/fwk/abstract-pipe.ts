
import { OnDestroy } from '@angular/core';
import { TranslateManager } from './managers/translate-manager';
import { AbstractHelperObject } from './abstract-helper-object';
import { AbstractHelper } from './abstract-helper';

export class AbstractPipe extends AbstractHelper implements OnDestroy {

    constructor(AbstractHelperObject: AbstractHelperObject) {
        super(AbstractHelperObject);
    }

    ngOnDestroy(): void {
        this.onDestroy();
        this._helper = null;
    }

    onDestroy(): void {
        // need override
    }

    getLabels(): TranslateManager {
        return this._helper.getLabels();
    }
}
