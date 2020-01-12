import { Injectable } from '@angular/core';
import { AbstractObject } from '../abstract-object';
import { TranslateManager } from '../managers/translate-manager';
import { ConnectionManager } from '../managers/connection-manager';
import { CacheManager } from '../managers/cache-manager';
import { RouterManager } from '../managers/router-manager';
import { EventManager } from '../managers/event-manager';
import { PopupManager } from '../managers/popup-manager';

@Injectable({ providedIn: "root" })
export class FwkShell extends AbstractObject {

  constructor(
    protected _translateManager: TranslateManager,
    protected _connectionManager: ConnectionManager,
    protected _cacheManager: CacheManager,
    protected _routerManager: RouterManager,
    protected _eventManager: EventManager,
    protected _popupManager: PopupManager) {
    super();
  }

  init(): void {
    this._translateManager.init();
    this._connectionManager.init();
    this._cacheManager.init();
    this._routerManager.init();
    this._eventManager.init();
    this._popupManager.init();
  }

  getTranslateManager(): TranslateManager {
    return this._translateManager;
  }

  getConnectionManager(): ConnectionManager {
    return this._connectionManager;
  }

  getCacheManager(): CacheManager {
    return this._cacheManager;
  }

  getRouterManager(): RouterManager {
    return this._routerManager;
  }

  getEventManager(): EventManager {
    return this._eventManager;
  }

  getPopupManager(): PopupManager {
    return this._popupManager;
  }

}
