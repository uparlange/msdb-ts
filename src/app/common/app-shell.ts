import { TranslateManager } from 'src/app/fwk/managers/translate-manager';
import { ConnectionManager } from 'src/app/fwk/managers/connection-manager';
import { CacheManager } from 'src/app/fwk/managers/cache-manager';
import { RouterManager } from 'src/app/fwk/managers/router-manager';
import { EventManager } from 'src/app/fwk/managers/event-manager';
import { AnalyticsManager } from './managers/analytics-manager';
import { AbstractShell } from 'src/app/fwk/abstract-shell';
import { Injectable } from '@angular/core';
import { BlazyManager } from './managers/blazy-Manager';
import { HistoryManager } from './managers/history-manager';
import { FavoritesManager } from './managers/favorites-manager';

@Injectable()
export class AppShell extends AbstractShell {

  _analyticsManager: AnalyticsManager = null;
  _blazyManager: BlazyManager = null;
  _historyManager: HistoryManager = null;
  _favoritesManager: FavoritesManager = null;

  constructor(translateManager: TranslateManager, connectionManager: ConnectionManager, cacheManager: CacheManager, routerManager: RouterManager, eventManager: EventManager,
    analyticsManager: AnalyticsManager, blazyManager: BlazyManager, historyManager: HistoryManager, favoritesManager: FavoritesManager) {
    super(translateManager, connectionManager, cacheManager, routerManager, eventManager);
    this._analyticsManager = analyticsManager;
    this._blazyManager = blazyManager;
    this._historyManager = historyManager;
    this._favoritesManager = favoritesManager;
  }

  init(): void {
    super.init();
    this._analyticsManager.init();
    this._blazyManager.init();
    this._historyManager.init();
    this._favoritesManager.init();
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
}
