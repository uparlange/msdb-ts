import { NgModule } from '@angular/core';
import { AbstractModule } from 'src/app/fwk/abstract-module';
import { AnalyticsManager } from '../managers/analytics-manager';
import { BlazyManager } from '../managers/blazy-Manager';
import { HistoryManager } from '../managers/history-manager';
import { FavoritesManager } from '../managers/favorites-manager';
import { SocketManager } from '../managers/socket-manager';
import { ConfigProvider } from '../providers/config-provider';
import { MsdbProvider } from '../providers/msdb-provider';
import { AppHelperObject } from '../providers/app-helper-object';
import { AppShell } from '../providers/app-shell';

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
