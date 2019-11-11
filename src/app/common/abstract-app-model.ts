import { AbstractModel } from '../fwk/abstract-model';
import { HistoryManager } from './managers/history-manager';
import { SocketManager } from './managers/socket-manager';
import { FavoritesManager } from './managers/favorites-manager';
import { MsdbProvider } from './providers/msdb-provider';
import { AppHelperObject } from './providers/app-helper-object';

export class AbstractAppModel extends AbstractModel {

  constructor(appHelperObject: AppHelperObject) {
    super(appHelperObject);
  }

  getSocket(): SocketManager {
    return this._getHelper().getSocketManager();
  }

  getMsdbProvider(): MsdbProvider {
    return this._getHelper().getMsdbProvider();
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
