import { AbstractModule } from '../abstract-module';
import { NgModule } from '@angular/core';
import { TranslateManager } from 'src/app/fwk/managers/translate-manager';
import { ConnectionManager } from 'src/app/fwk/managers/connection-manager';
import { CacheManager } from 'src/app/fwk/managers/cache-manager';
import { WindowRef } from '../window-ref';
import { RouterManager } from '../managers/router-manager';
import { EventManager } from '../managers/event-manager';

@NgModule({
    providers: [
        TranslateManager,
        ConnectionManager,
        CacheManager,
        RouterManager,
        EventManager,
        WindowRef
    ]
})
export class FwkModule extends AbstractModule {

    constructor() {
        super();
    }
}
