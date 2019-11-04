import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AbstractHelperObject } from 'src/app/fwk/abstract-helper-object';
import { ConfigProvider } from './config-provider';
import { AnalyticsManager } from '../managers/analytics-manager';
import { HistoryManager } from '../managers/history-manager';
import { FavoritesManager } from '../managers/favorites-manager';
import { SocketManager } from '../managers/socket-manager';
import { WindowRef } from 'src/app/fwk/providers/window-ref';
import { AppShell } from './app-shell';

@Injectable({ providedIn: "root" })
export class AppHelperObject extends AbstractHelperObject {

  _configProvider: ConfigProvider = null;

  constructor(shell: AppShell, windowRef: WindowRef, title: Title, httpClient: HttpClient, activatedRoute: ActivatedRoute,
    meta: Meta, configProvider: ConfigProvider) {
    super(shell, windowRef, title, httpClient, activatedRoute, meta);
    this._configProvider = configProvider;
  }

  getAnalyticsManager(): AnalyticsManager {
    return this._getShell().getAnalyticsManager();
  }

  getHistoryManager(): HistoryManager {
    return this._getShell().getHistoryManager();
  }

  getFavoritesManager(): FavoritesManager {
    return this._getShell().getFavoritesManager();
  }

  getSocketManager(): SocketManager {
    return this._getShell().getSocketManager();
  }

  getConfigProvider(): ConfigProvider {
    return this._configProvider;
  }

  _getShell(): AppShell {
    return <AppShell>this._shell;
  }
}
