import { AbstractComponent } from '../fwk/abstract-component';
import { AbstractHelperObject } from '../fwk/abstract-helper-object';
import { AppHelperObject } from './providers/app-helper-object';

export class AbstractAppComponent extends AbstractComponent {

    constructor(
        protected override _helper: AbstractHelperObject) {
        super(_helper);
    }

    getMdiIconByType(type: string): string {
        return this._getHelper().getIconProvider().getMdiIconByType(type);
    }

    protected override _getHelper(): AppHelperObject {
        return <AppHelperObject>this._helper;
    }
}