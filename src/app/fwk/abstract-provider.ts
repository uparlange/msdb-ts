import { AbstractHelperObject } from './abstract-helper-object';
import { EventEmitter } from '@angular/core';
import { CacheManager } from './managers/cache-manager';
import { EventManager } from './managers/event-manager';
import { Observable } from 'rxjs';
import { AbstractHelper } from './abstract-helper';
import { AppEvents } from '../app-events';

export class AbstractProvider extends AbstractHelper {

    constructor(AbstractHelperObject: AbstractHelperObject) {
        super(AbstractHelperObject);
    }

    httpGet(config: any): EventEmitter<any> {
        const httpConfig: any = {};
        if (config.params) {
            httpConfig.params = config.params;
        }
        if (config.responseType) {
            httpConfig.responseType = config.responseType;
        }
        const source = this._helper.getHttpClient().get(config.url, httpConfig);
        return this._httpCall(source, config.defaultValue);
    }

    getCache(): CacheManager {
        return this._helper.getCache();
    }

    getEventBus(): EventManager {
        return this._helper.getEventBus();
    }

    _httpCall(source: Observable<any>, defaultValue: any) {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        if (defaultValue === undefined) {
            defaultValue = null;
        }
        this.getEventBus().emit(AppEvents.HTTP_BEGIN);
        // source.timeout(AppUtils.getHttpRequestTimeOut())
        source.subscribe((result: any) => {
            this.getEventBus().emit(AppEvents.HTTP_END);
            eventEmitter.emit(result);
        }, () => {
            this.getEventBus().emit(AppEvents.HTTP_END);
            eventEmitter.emit(defaultValue);
        });
        return eventEmitter;
    }
}
