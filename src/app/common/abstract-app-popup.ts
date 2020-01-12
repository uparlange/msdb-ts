import { AbstractPopup } from '../fwk/abstract-popup';
import { ConfigProvider } from './providers/config-provider';
import { AppHelperObject } from './providers/app-helper-object';
import { AbstractHelperObject } from '../fwk/abstract-helper-object';
import { AbstractModel } from '../fwk/abstract-model';

export class AbstractAppPopup extends AbstractPopup {

    constructor(
        protected _helper: AbstractHelperObject,
        public model: AbstractModel) {
        super(_helper, model);
    }

    trackByName(index: number, item: any): string {
        return item ? item.name : undefined;
    }

    trackByTag(index: number, item: any): string {
        return item ? item.tag : undefined;
    }

    getStatusClass(status: string): string {
        return `label-${status}`;
    }

    getStatusLabel(status: string): string {
        return (status != null) ? `L10N_${status.toUpperCase()}` : null;
    }

    getConfigProvider(): ConfigProvider {
        return this._getHelper().getConfigProvider();
    }

    protected _getHelper(): AppHelperObject {
        return <AppHelperObject>this._helper;
    }
}