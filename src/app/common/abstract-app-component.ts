import { AbstractComponent } from '../fwk/abstract-component';
import { AbstractHelperObject } from '../fwk/abstract-helper-object';
import { AppHelperObject } from './providers/app-helper-object';

export class AbstractAppComponent extends AbstractComponent {

    constructor(
        protected _helper: AbstractHelperObject) {
        super(_helper);
    }

    getMdiIconByType(type: string): string {
        return this._getHelper().getIconProvider().getMdiIconByType(type);
    }

    protected _getHelper(): AppHelperObject {
        return <AppHelperObject>this._helper;
    }
}