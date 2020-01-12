import { AbstractModel } from '../fwk/abstract-model';
import { HistoryManager } from './managers/history-manager';
import { SocketManager } from './managers/socket-manager';
import { FavoritesManager } from './managers/favorites-manager';
import { MsdbProvider } from './providers/msdb-provider';
import { AppHelperObject } from './providers/app-helper-object';
import { NotificationManager } from './managers/notification-manager';
import { ConfigProvider } from './providers/config-provider';
import { NwManager } from './managers/nw-manager';
import { AbstractHelperObject } from '../fwk/abstract-helper-object';

export class AbstractAppModel extends AbstractModel {

  constructor(
    protected _helper: AbstractHelperObject) {
    super(_helper);
  }

  getSocket(): SocketManager {
    return this._getHelper().getSocketManager();
  }

  getNotification(): NotificationManager {
    return this._getHelper().getNotificationManager();
  }

  getMsdbProvider(): MsdbProvider {
    return this._getHelper().getMsdbProvider();
  }

  getConfigProvider(): ConfigProvider {
    return this._getHelper().getConfigProvider();
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

  getNw(): NwManager {
    return this._getHelper().getNwManager();
  }

  protected _getHelper(): AppHelperObject {
    return <AppHelperObject>this._helper;
  }
}
