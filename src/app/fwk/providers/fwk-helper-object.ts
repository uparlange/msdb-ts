import { Title, Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { FwkShell } from './fwk-shell';
import { WindowRef } from './window-ref';
import { TranslateManager } from '../managers/translate-manager';
import { ConnectionManager } from '../managers/connection-manager';
import { RouterManager } from '../managers/router-manager';
import { EventManager } from '../managers/event-manager';
import { CacheManager } from '../managers/cache-manager';
import { PopupManager } from '../managers/popup-manager';
import { AbstractHelperObject } from '../abstract-helper-object';

@Injectable({ providedIn: "root" })
export class FwkHelperObject extends AbstractHelperObject {

  constructor(
    protected _shell: FwkShell,
    protected _windowRef: WindowRef,
    protected _title: Title,
    protected _httpClient: HttpClient,
    protected _activatedRoute: ActivatedRoute,
    protected _meta: Meta) {
    super();
  }

  getHttpClient(): HttpClient {
    return this._httpClient;
  }

  getWindowRef(): WindowRef {
    return this._windowRef;
  }

  getActivatedRoute(): ActivatedRoute {
    return this._activatedRoute;
  }

  getMeta(): Meta {
    return this._meta;
  }

  getTitle(): Title {
    return this._title;
  }

  getLabels(): TranslateManager {
    return this._shell.getTranslateManager();
  }

  getConnection(): ConnectionManager {
    return this._shell.getConnectionManager();
  }

  getEventBus(): EventManager {
    return this._shell.getEventManager();
  }

  getRouter(): RouterManager {
    return this._shell.getRouterManager();
  }

  getCache(): CacheManager {
    return this._shell.getCacheManager();
  }

  getPopups(): PopupManager {
    return this._shell.getPopupManager();
  }
}
