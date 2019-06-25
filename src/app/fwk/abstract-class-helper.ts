import { WindowRef } from './window-ref';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AbstractClass } from './abstract-class';
import { ConnectionManager } from './managers/connection-manager';
import { CacheManager } from './managers/cache-manager';
import { TranslateManager } from './managers/translate-manager';
import { RouterManager } from './managers/router-manager';
import { EventManager } from './managers/event-manager';
import { AbstractShell } from './abstract-shell';
import { SocketManager } from '../common/managers/socket-manager';

export class AbstractClassHelper extends AbstractClass {

  _title: Title = null;
  _shell: AbstractShell = null;
  _httpClient: HttpClient = null;
  _activatedRoute: ActivatedRoute = null;
  _windowRef: WindowRef = null;
  _meta: Meta = null;

  constructor(shell: AbstractShell, windowRef: WindowRef, title: Title, httpClient: HttpClient, activatedRoute: ActivatedRoute,
    meta: Meta) {
    super();
    this._title = title;
    this._shell = shell;
    this._httpClient = httpClient;
    this._activatedRoute = activatedRoute;
    this._windowRef = windowRef;
    this._meta = meta;
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

  getPopups() {
    return this._shell.getPopupManager();
  }
}
