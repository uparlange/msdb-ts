import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from './config-provider';
import { AnalyticsManager } from '../managers/analytics-manager';
import { HistoryManager } from '../managers/history-manager';
import { FavoritesManager } from '../managers/favorites-manager';
import { AppShell } from './app-shell';
import { MsdbProvider } from './msdb-provider';
import { BlazyManager } from '../managers/blazy-Manager';
import { NotificationManager } from '../managers/notification-manager';
import { IconProvider } from './icon-provider';
import { FwkHelperObject } from '../../fwk/providers/fwk-helper-object';
import { WindowRef } from '../../fwk/providers/window-ref';

@Injectable({ providedIn: "root" })
export class AppHelperObject extends FwkHelperObject {

  constructor(
    protected override _shell: AppShell,
    protected override _windowRef: WindowRef,
    protected override _title: Title,
    protected override _httpClient: HttpClient,
    protected override _activatedRoute: ActivatedRoute,
    protected override _meta: Meta,
    private _configProvider: ConfigProvider,
    private _msdbProvider: MsdbProvider,
    private _iconProvider: IconProvider) {
    super(_shell, _windowRef, _title, _httpClient, _activatedRoute, _meta);
  }

  getAnalyticsManager(): AnalyticsManager {
    return this._getShell().getAnalyticsManager();
  }

  getLazyManager(): BlazyManager {
    return this._getShell().getLazyManager();
  }

  getHistoryManager(): HistoryManager {
    return this._getShell().getHistoryManager();
  }

  getFavoritesManager(): FavoritesManager {
    return this._getShell().getFavoritesManager();
  }

  getNotificationManager(): NotificationManager {
    return this._getShell().getNotificationManager();
  }

  getConfigProvider(): ConfigProvider {
    return this._configProvider;
  }

  getMsdbProvider(): MsdbProvider {
    return this._msdbProvider;
  }

  getIconProvider(): IconProvider {
    return this._iconProvider;
  }

  private _getShell(): AppShell {
    return <AppShell>this._shell;
  }
}
