import { AbstractClass } from './abstract-class';
import { AbstractClassHelper } from './abstract-class-helper';
import { EventEmitter } from '@angular/core';
import { CacheManager } from './managers/cache-manager';
import { EventManager } from './managers/event-manager';
import { Observable } from 'rxjs';

export class AbstractProvider extends AbstractClass {

    _helper: AbstractClassHelper = null;

    constructor(abstractClassHelper: AbstractClassHelper) {
        super();
        this._helper = abstractClassHelper;
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
        this.getEventBus().emit("HTTP_BEGIN", undefined);
        // source.timeout(AppUtils.getHttpRequestTimeOut())
        source.subscribe((result: any) => {
            this.getEventBus().emit("HTTP_END", undefined);
            eventEmitter.emit(result);
        }, () => {
            this.getEventBus().emit("HTTP_END", undefined);
            eventEmitter.emit(defaultValue);
        });
        return eventEmitter;
    }
}
