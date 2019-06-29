import { AbstractView } from '../fwk/abstract-view';
import { AppHelperObject } from './app-helper-object';
import { AbstractAppModel } from './abstract-app-model';
import { ConfigProvider } from './config-provider';
import { RouterManager } from '../fwk/managers/router-manager';
import { FavoritesManager } from './managers/favorites-manager';
import { SocketManager } from './managers/socket-manager';

export class AbstractAppView extends AbstractView {

    constructor(appHelperObject: AppHelperObject, abstractAppModel: AbstractAppModel) {
        super(appHelperObject, abstractAppModel);
    }

    getGameIconUrl(game: any): string {
        return this._getHelper().getConfigProvider().getGameIconUrl(game);
    }

    trackByName(index: number, item: any): string {
        return item ? item.name : undefined;
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

    getRouter(): RouterManager {
        return this._getHelper().getRouter();
    }

    getFavorites(): FavoritesManager {
        return this._getHelper().getFavoritesManager();
    }

    getSocket(): SocketManager {
        return this._getHelper().getSocketManager();
    }

    _getHelper(): AppHelperObject {
        return <AppHelperObject>this._helper;
    }
}