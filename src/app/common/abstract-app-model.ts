import { AbstractModel } from '../fwk/abstract-model';
import { HistoryManager } from './managers/history-manager';
import { FavoritesManager } from './managers/favorites-manager';
import { MsdbProvider } from './providers/msdb-provider';
import { AppHelperObject } from './providers/app-helper-object';
import { NotificationManager } from './managers/notification-manager';
import { ConfigProvider } from './providers/config-provider';
import { AbstractHelperObject } from '../fwk/abstract-helper-object';
import { IconProvider } from './providers/icon-provider';

export class AbstractAppModel extends AbstractModel {

  constructor(
    protected override _helper: AbstractHelperObject) {
    super(_helper);
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

  getIconProvider(): IconProvider {
    return this._getHelper().getIconProvider();
  }

  getGameFolder(game: any): string {
    return this._getHelper().getConfigProvider().getGameFolder(game);
  }

  getGameIconUrl(game: any): string {
    return this._getHelper().getConfigProvider().getGameIconUrl(game);
  }

  getMdiIconByType(type: string): string {
    return this.getIconProvider().getMdiIconByType(type);
  }

  getSizeLabel(value: number): string {
    return this._getHelper().getConfigProvider().getSizeLabel(value);
  }

  getFavorites(): FavoritesManager {
    return this._getHelper().getFavoritesManager();
  }

  protected override _getHelper(): AppHelperObject {
    return <AppHelperObject>this._helper;
  }
}
