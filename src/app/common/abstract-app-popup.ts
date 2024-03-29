import { AbstractPopup } from '../fwk/abstract-popup';
import { ConfigProvider } from './providers/config-provider';
import { AppHelperObject } from './providers/app-helper-object';
import { AbstractHelperObject } from '../fwk/abstract-helper-object';
import { AbstractModel } from '../fwk/abstract-model';
import { IconProvider } from './providers/icon-provider';

export class AbstractAppPopup extends AbstractPopup {

    constructor(
        protected override _helper: AbstractHelperObject,
        public override model: AbstractModel) {
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
        return (status != null) ? `L10N_${status.toUpperCase()}` : "";
    }

    getMdiIconByType(type: string): string {
        return this.getIconProvider().getMdiIconByType(type);
    }

    getIconProvider(): IconProvider {
        return this._getHelper().getIconProvider();
    }

    getConfigProvider(): ConfigProvider {
        return this._getHelper().getConfigProvider();
    }

    protected override _getHelper(): AppHelperObject {
        return <AppHelperObject>this._helper;
    }
}