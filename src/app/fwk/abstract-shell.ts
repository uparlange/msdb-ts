import { AbstractClass } from './abstract-class';
import { TranslateManager } from './managers/translate-manager';
import { ConnectionManager } from './managers/connection-manager';
import { CacheManager } from './managers/cache-manager';
import { RouterManager } from './managers/router-manager';
import { EventManager } from './managers/event-manager';

export class AbstractShell extends AbstractClass {

    _translateManager: TranslateManager = null;
    _connectionManager: ConnectionManager = null;
    _cacheManager: CacheManager = null;
    _routerManager: RouterManager = null;
    _eventManager: EventManager = null;

    constructor(translateManager: TranslateManager, connectionManager: ConnectionManager, cacheManager: CacheManager, routerManager: RouterManager,
        eventManager: EventManager) {
        super();
        this._translateManager = translateManager;
        this._connectionManager = connectionManager;
        this._cacheManager = cacheManager;
        this._routerManager = routerManager;
        this._eventManager = eventManager;
    }

    init(): void {
        this._translateManager.init();
        this._connectionManager.init();
        this._cacheManager.init();
        this._routerManager.init();
        this._eventManager.init();
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

}
