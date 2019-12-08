import { TranslateManager } from 'src/app/fwk/managers/translate-manager';
import { ConnectionManager } from 'src/app/fwk/managers/connection-manager';
import { CacheManager } from 'src/app/fwk/managers/cache-manager';
import { RouterManager } from 'src/app/fwk/managers/router-manager';
import { EventManager } from 'src/app/fwk/managers/event-manager';
import { Injectable } from '@angular/core';
import { FwkShell } from 'src/app/fwk/providers/fwk-shell';
import { AnalyticsManager } from '../managers/analytics-manager';
import { BlazyManager } from '../managers/blazy-Manager';
import { HistoryManager } from '../managers/history-manager';
import { FavoritesManager } from '../managers/favorites-manager';
import { SocketManager } from '../managers/socket-manager';
import { PopupManager } from 'src/app/fwk/managers/popup-manager';
import { NotificationManager } from '../managers/notification-manager';
import { NwManager } from '../managers/nw-manager';

@Injectable({ providedIn: "root" })
export class AppShell extends FwkShell {

  private _analyticsManager: AnalyticsManager = null;
  private _blazyManager: BlazyManager = null;
  private _historyManager: HistoryManager = null;
  private _favoritesManager: FavoritesManager = null;
  private _socketManager: SocketManager = null;
  private _notificationManager: NotificationManager = null;
  private _nwManager: NwManager = null;

  constructor(translateManager: TranslateManager, connectionManager: ConnectionManager, cacheManager: CacheManager,
    routerManager: RouterManager, eventManager: EventManager, analyticsManager: AnalyticsManager,
    blazyManager: BlazyManager, historyManager: HistoryManager, favoritesManager: FavoritesManager,
    socketManager: SocketManager, popupManager: PopupManager, notificationManager: NotificationManager,
    nwManager: NwManager) {
    super(translateManager, connectionManager, cacheManager, routerManager, eventManager,
      popupManager);
    this._analyticsManager = analyticsManager;
    this._blazyManager = blazyManager;
    this._historyManager = historyManager;
    this._favoritesManager = favoritesManager;
    this._socketManager = socketManager;
    this._notificationManager = notificationManager;
    this._nwManager = nwManager;
  }

  init(): void {
    super.init();
    this._analyticsManager.init();
    this._blazyManager.init();
    this._historyManager.init();
    this._favoritesManager.init();
    this._socketManager.init();
    this._notificationManager.init();
    this._nwManager.init();
  }

  getAnalyticsManager(): AnalyticsManager {
    return this._analyticsManager;
  }

  getLazyManager(): BlazyManager {
    return this._blazyManager;
  }

  getHistoryManager(): HistoryManager {
    return this._historyManager;
  }

  getFavoritesManager(): FavoritesManager {
    return this._favoritesManager;
  }

  getSocketManager(): SocketManager {
    return this._socketManager;
  }

  getNotificationManager(): NotificationManager {
    return this._notificationManager;
  }

  getNwManager(): NwManager {
    return this._nwManager;
  }
}
