import { AbstractView } from '../fwk/abstract-view';
import { AppHelperObject } from './app-helper-object';
import { AbstractAppModel } from './abstract-app-model';
import { ConfigProvider } from './config-provider';
import { FavoritesManager } from './managers/favorites-manager';
import { SocketManager } from './managers/socket-manager';

export class AbstractAppView extends AbstractView {

    constructor(appHelperObject: AppHelperObject, abstractAppModel: AbstractAppModel) {
        super(appHelperObject, abstractAppModel);
    }

    trackByName(index: number, item: any): string {
        return item ? item.name : undefined;
    }

    trackByLabel(index: number, item: any): string {
        return item ? item.label : undefined;
    }

    trackByData(index: number, item: any) {
        return item ? item.data : undefined;
    }

    getGameIconUrl(game: any): string {
        return this._getHelper().getConfigProvider().getGameIconUrl(game);
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

    getSocket(): SocketManager {
        return this._getHelper().getSocketManager();
    }

    getFavorites(): FavoritesManager {
        return this._getHelper().getFavoritesManager();
    }

    _getHelper(): AppHelperObject {
        return <AppHelperObject>this._helper;
    }
}