import { AbstractView } from '../fwk/abstract-view';
import { AppClassHelper } from './app-class-helper';
import { AbstractAppModel } from './abstract-app-model';

export class AbstractAppView extends AbstractView {

    constructor(appClassHelper: AppClassHelper, abstractAppModel: AbstractAppModel) {
        super(appClassHelper, abstractAppModel);
    }

    getGameIconUrl(game: any): string {
        return this._getHelper().getConfigProvider().getGameIconUrl(game);
    }

    trackByName(index: number, item: any): string {
        return item ? item.name : undefined;
    }

    _getHelper(): AppClassHelper {
        return <AppClassHelper>this._helper;
    }
}