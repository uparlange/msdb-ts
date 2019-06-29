import { AbstractModel } from '../fwk/abstract-model';
import { MsdbProvider } from './msdb-provider';
import { HistoryManager } from './managers/history-manager';
import { AppHelperObject } from './app-helper-object';
import { SocketManager } from './managers/socket-manager';
import { FavoritesManager } from './managers/favorites-manager';

export class AbstractAppModel extends AbstractModel {

  _provider: MsdbProvider = null;

  constructor(appHelperObject: AppHelperObject, provider: MsdbProvider) {
    super(appHelperObject);
    this._provider = provider;
  }

  getSocket(): SocketManager {
    return this._getHelper().getSocketManager();
  }

  getProvider(): MsdbProvider {
    return this._provider;
  }

  getHistory(): HistoryManager {
    return this._getHelper().getHistoryManager();
  }

  getGameFolder(game: any): string {
    return this._getHelper().getConfigProvider().getGameFolder(game);
  }

  getSizeLabel(value: number): string {
    return this._getHelper().getConfigProvider().getSizeLabel(value);
  }

  getFavorites(): FavoritesManager {
    return this._getHelper().getFavoritesManager();
  }

  _getHelper(): AppHelperObject {
    return <AppHelperObject>this._helper;
  }
}
