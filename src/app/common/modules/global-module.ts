import { NgModule } from '@angular/core';
import { AbstractModule } from 'src/app/fwk/abstract-module';
import { MsdbProvider } from '../msdb-provider';
import { ConfigProvider } from '../config-provider';
import { AppShell } from '../app-shell';
import { AppHelperObject } from '../app-helper-object';
import { AnalyticsManager } from '../managers/analytics-manager';
import { BlazyManager } from '../managers/blazy-Manager';
import { HistoryManager } from '../managers/history-manager';
import { FavoritesManager } from '../managers/favorites-manager';
import { SocketManager } from '../managers/socket-manager';

@NgModule({
    providers: [
        MsdbProvider,
        ConfigProvider,
        AppShell,
        AppHelperObject,
        AnalyticsManager,
        BlazyManager,
        HistoryManager,
        FavoritesManager,
        SocketManager
    ]
})
export class GlobalModule extends AbstractModule {

    constructor() {
        super();
    }
}
