import { AbstractPopup } from '../fwk/abstract-popup';
import { AbstractModel } from '../fwk/abstract-model';
import { ConfigProvider } from './providers/config-provider';
import { AppHelperObject } from './providers/app-helper-object';

export class AbstractAppPopup extends AbstractPopup {

    constructor(appHelperObject: AppHelperObject, model: AbstractModel) {
        super(appHelperObject, model);
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

    _getHelper(): AppHelperObject {
        return <AppHelperObject>this._helper;
    }
}