import { AbstractClassHelper } from '../fwk/abstract-class-helper';
import { Injectable } from '@angular/core';
import { AppShell } from './app-shell';
import { WindowRef } from '../fwk/window-ref';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AnalyticsManager } from './managers/analytics-manager';
import { Config } from 'protractor';
import { ConfigProvider } from './config-provider';

@Injectable()
export class AppClassHelper extends AbstractClassHelper {

    _configProvider: ConfigProvider = null;

    constructor(shell: AppShell, windowRef: WindowRef, title: Title, httpClient: HttpClient, activatedRoute: ActivatedRoute,
        meta: Meta, configProvider: ConfigProvider) {
        super(shell, windowRef, title, httpClient, activatedRoute, meta);
        this._configProvider = configProvider;
    }

    getAnalytics(): AnalyticsManager {
        return this._getShell().getAnalyticsManager();
    }

    getConfigProvider(): ConfigProvider {
        return this._configProvider;
    }

    _getShell(): AppShell {
        return <AppShell>this._shell;
    }
}