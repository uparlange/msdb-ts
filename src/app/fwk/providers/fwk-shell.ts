import { Injectable } from '@angular/core';
import { AbstractObject } from '../abstract-object';
import { TranslateManager } from '../managers/translate-manager';
import { ConnectionManager } from '../managers/connection-manager';
import { CacheManager } from '../managers/cache-manager';
import { RouterManager } from '../managers/router-manager';
import { EventManager } from '../managers/event-manager';
import { PopupManager } from '../managers/popup-manager';

@Injectable()
export class FwkShell extends AbstractObject {

  _translateManager: TranslateManager = null;
  _connectionManager: ConnectionManager = null;
  _cacheManager: CacheManager = null;
  _routerManager: RouterManager = null;
  _eventManager: EventManager = null;
  _popupManager: PopupManager = null;

  constructor(translateManager: TranslateManager, connectionManager: ConnectionManager, cacheManager: CacheManager, routerManager: RouterManager,
    eventManager: EventManager, popupManager: PopupManager) {
    super();
    this._translateManager = translateManager;
    this._connectionManager = connectionManager;
    this._cacheManager = cacheManager;
    this._routerManager = routerManager;
    this._eventManager = eventManager;
    this._popupManager = popupManager;
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
