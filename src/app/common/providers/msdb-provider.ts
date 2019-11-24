import { EventEmitter, Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigProvider } from './config-provider';
import { AppEvents } from 'src/app/app-events';
import { Observable } from 'rxjs';
import { AbstractObject } from 'src/app/fwk/abstract-object';
import { EventManager } from 'src/app/fwk/managers/event-manager';
import { CacheManager } from 'src/app/fwk/managers/cache-manager';

@Injectable({ providedIn: "root" })
export class MsdbProvider extends AbstractObject {

    _mameInfos: any = null;
    _token: string = null;
    _configProvider: ConfigProvider = null;
    _httpClient: HttpClient = null;
    _eventManager: EventManager = null;
    _cacheManager: CacheManager = null;

    constructor(configProvider: ConfigProvider, httpClient: HttpClient, eventManager: EventManager, cacheManager: CacheManager) {
        super();
        this._configProvider = configProvider;
        this._httpClient = httpClient;
        this._eventManager = eventManager;
        this._cacheManager = cacheManager;
    }

    httpGet(config: any): EventEmitter<any> {
        const httpConfig: any = {};
        if (config.params) {
            httpConfig.params = config.params;
        }
        if (config.responseType) {
            httpConfig.responseType = config.responseType;
        }
        const source = this._httpClient.get(config.url, httpConfig);
        return this._httpCall(source, config.defaultValue);
    }

    getMameInfos(): EventEmitter<any> {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        this._init().subscribe(() => {
            eventEmitter.emit(this._mameInfos);
        });
        return eventEmitter;
    }

    addPushSubscription(sub: any): EventEmitter<any> {
        const config = {
            url: this._configProvider.getServiceUrl("notification/addsub"),
            params: new HttpParams().set("sub", JSON.stringify(sub)),
            useCache: false
        };
        return this._callService(config);
    }

    removePushSubscription(sub: any): EventEmitter<any> {
        const config = {
            url: this._configProvider.getServiceUrl("notification/delsub"),
            params: new HttpParams().set("sub", JSON.stringify(sub)),
            useCache: false
        };
        return this._callService(config);
    }

    setMessageReceived(data: any): EventEmitter<any> {
        const config = {
            url: this._configProvider.getServiceUrl("notification/messagereceived"),
            params: new HttpParams().set("newsId", data.newsId).set("subId", data.subId),
            useCache: false
        };
        return this._callService(config);
    }

    setMessageClicked(data: any): EventEmitter<any> {
        const config = {
            url: this._configProvider.getServiceUrl("notification/messageclicked"),
            params: new HttpParams().set("newsId", data.newsId).set("subId", data.subId),
            useCache: false
        };
        return this._callService(config);
    }

    getDetail(name: string): EventEmitter<any> {
        const config = {
            url: this._configProvider.getServiceUrl("detail"),
            params: new HttpParams().set("name", name),
            useCache: true
        };
        return this._callService(config);
    }

    search(type: string, value: Array<string>): EventEmitter<any> {
        const s = {};
        s[type] = value;
        const config = {
            url: this._configProvider.getServiceUrl("search"),
            params: new HttpParams().set("params", JSON.stringify(s)),
            useCache: false
        };
        return this._callService(config);
    }

    getYears(): EventEmitter<any> {
        const config = {
            url: this._configProvider.getServiceUrl("years"),
            useCache: true
        };
        return this._callService(config);
    }

    getRatings(): EventEmitter<any> {
        const config = {
            url: this._configProvider.getServiceUrl("ratings"),
            useCache: true
        };
        return this._callService(config);
    }

    getLanguages(): EventEmitter<any> {
        const config = {
            url: this._configProvider.getServiceUrl("languages"),
            useCache: true
        };
        return this._callService(config);
    }

    getSeries(): EventEmitter<any> {
        const config = {
            url: this._configProvider.getServiceUrl("series"),
            useCache: true
        };
        return this._callService(config);
    }

    getCategories(): EventEmitter<any> {
        const config = {
            url: this._configProvider.getServiceUrl("categories"),
            useCache: true
        };
        return this._callService(config);
    }

    getManufacturers(): EventEmitter<any> {
        const config = {
            url: this._configProvider.getServiceUrl("manufacturers"),
            useCache: true
        };
        return this._callService(config);
    }

    getVersions(): EventEmitter<any> {
        const config = {
            url: this._configProvider.getServiceUrl("versions"),
            useCache: true
        };
        return this._callService(config);
    }

    _httpCall(source: Observable<any>, defaultValue: any) {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        if (defaultValue === undefined) {
            defaultValue = null;
        }
        this._eventManager.emit(AppEvents.HTTP_BEGIN);
        // source.timeout(AppUtils.getHttpRequestTimeOut())
        source.subscribe((result: any) => {
            this._eventManager.emit(AppEvents.HTTP_END);
            eventEmitter.emit(result);
        }, () => {
            this._eventManager.emit(AppEvents.HTTP_END);
            eventEmitter.emit(defaultValue);
        });
        return eventEmitter;
    }

    _callService(config): EventEmitter<any> {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        const cacheKey = this._getCacheKey(config);
        this._cacheManager.getItem(cacheKey).subscribe((value: any) => {
            if (config.useCache === true && value !== null) {
                setTimeout(() => {
                    eventEmitter.emit(value);
                }, 0);
            }
            else {
                this._init().subscribe(() => {
                    if (this._initialized()) {
                        let params = config.params || new HttpParams();
                        params = params.set("token", this._token);
                        this.httpGet({ url: config.url, params: params }).subscribe((result: any) => {
                            value = this._getData(result);
                            if (config.useCache === true) {
                                this._cacheManager.setItem(cacheKey, value, "version");
                            }
                            eventEmitter.emit(value);
                        });
                    }
                    else {
                        eventEmitter.emit(null);
                    }
                });
            }
        });
        return eventEmitter;
    }

    _getCacheKey(config: any): any {
        let cacheKey = `service_${config.url}`;
        if (config.params !== undefined) {
            cacheKey += `?${config.params.toString()}`;
        }
        return cacheKey;
    }

    _initialized(): boolean {
        return (this._mameInfos !== null);
    }

    _getData(result: any): any {
        return (result !== null) ? result.data : result;
    }

    _init(): EventEmitter<any> {
        const eventEmitter = new EventEmitter();
        if (this._initialized()) {
            setTimeout(() => {
                eventEmitter.emit();
            }, 0);
        }
        else {
            const url = this._configProvider.getServiceUrl("init");
            this.httpGet({ url: url }).subscribe((result: any) => {
                const data = this._getData(result);
                if (data !== null) {
                    this._token = data.token;
                    this._mameInfos = data.mameInfos;
                    this._cacheManager.setItem("version", data.mameInfos.build, undefined).subscribe((event: any) => {
                        if (event.newValue !== event.oldValue) {
                            this._cacheManager.deleteNamespace("version");
                        }
                    });
                }
                eventEmitter.emit();
            });
        }
        return eventEmitter;
    }
}
