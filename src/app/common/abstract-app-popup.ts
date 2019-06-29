import { AbstractPopup } from '../fwk/abstract-popup';
import { AppHelperObject } from './app-helper-object';
import { AbstractModel } from '../fwk/abstract-model';

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
}