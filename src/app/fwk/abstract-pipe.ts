
import { OnDestroy } from '@angular/core';
import { TranslateManager } from './managers/translate-manager';
import { AbstractClassHelper } from './abstract-class-helper';
import { AbstractClass } from './abstract-class';

export class AbstractPipe extends AbstractClass implements OnDestroy {

    _helper: AbstractClassHelper = null;

    constructor(abstractClassHelper: AbstractClassHelper) {
        super();
        this._helper = abstractClassHelper;
    }

    ngOnDestroy(): void {
        //this.getLogger().debug("onDestroy");
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
