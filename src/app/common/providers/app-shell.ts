import { Injectable } from '@angular/core';
import { AnalyticsManager } from '../managers/analytics-manager';
import { BlazyManager } from '../managers/blazy-Manager';
import { HistoryManager } from '../managers/history-manager';
import { FavoritesManager } from '../managers/favorites-manager';
import { NotificationManager } from '../managers/notification-manager';
import { FwkShell } from '../../fwk/providers/fwk-shell';
import { TranslateManager } from '../../fwk/managers/translate-manager';
import { ConnectionManager } from '../../fwk/managers/connection-manager';
import { CacheManager } from '../../fwk/managers/cache-manager';
import { RouterManager } from '../../fwk/managers/router-manager';
import { EventManager } from '../../fwk/managers/event-manager';
import { PopupManager } from '../../fwk/managers/popup-manager';

@Injectable({ providedIn: "root" })
export class AppShell extends FwkShell {

  constructor(
    protected override _translateManager: TranslateManager,
    protected override _connectionManager: ConnectionManager,
    protected override _cacheManager: CacheManager,
    protected override _routerManager: RouterManager,
    protected override _eventManager: EventManager,
    protected override _popupManager: PopupManager,
    private _analyticsManager: AnalyticsManager,
    private _blazyManager: BlazyManager,
    private _historyManager: HistoryManager,
    private _favoritesManager: FavoritesManager,
    private _notificationManager: NotificationManager) {
    super(_translateManager, _connectionManager, _cacheManager, _routerManager, _eventManager, _popupManager);
  }

  override init(): void {
    super.init();
    this._analyticsManager.init();
    this._blazyManager.init();
    this._historyManager.init();
    this._favoritesManager.init();
    this._notificationManager.init();
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

  getNotificationManager(): NotificationManager {
    return this._notificationManager;
  }

}
