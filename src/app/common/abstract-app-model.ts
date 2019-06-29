import { AbstractModel } from '../fwk/abstract-model';
import { MsdbProvider } from './msdb-provider';
import { HistoryManager } from './managers/history-manager';
import { AppHelperObject } from './app-helper-object';
import { FavoritesManager } from './managers/favorites-manager';
import { SocketManager } from './managers/socket-manager';

export class AbstractAppModel extends AbstractModel {

  _provider: MsdbProvider = null;

  constructor(appHelperObject: AppHelperObject, provider: MsdbProvider) {
    super(appHelperObject);
    this._provider = provider;
  }

  getProvider(): MsdbProvider {
    return this._provider;
  }

  getHistory(): HistoryManager {
    return this._getHelper().getHistoryManager();
  }

  getFavorites(): FavoritesManager {
    return this._getHelper().getFavoritesManager();
  }

  getSocket(): SocketManager {
    return this._getHelper().getSocketManager();
  }

  getGameFolder(game: any): string {
    return this._getHelper().getConfigProvider().getGameFolder(game);
  }

  getGameSizeLabel(): string {
    let size = 0;
    if (this.data.game.roms !== undefined) {
      this.data.game.roms.forEach((element: any) => {
        size += parseInt(element.size);
      });
    }
    return this.getSizeLabel(size);
  }

  _getHelper(): AppHelperObject {
    return <AppHelperObject>this._helper;
  }
}
