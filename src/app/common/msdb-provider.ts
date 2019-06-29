import { AbstractProvider } from '../fwk/abstract-provider';
import { ConfigProvider } from './config-provider';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AppHelperObject } from './app-helper-object';

@Injectable()
export class MsdbProvider extends AbstractProvider {

    _mameInfos: any = null;
    _token: string = null;
    _configProvider: ConfigProvider = null;

    constructor(appHelperObject: AppHelperObject, configProvider: ConfigProvider) {
        super(appHelperObject);
        this._configProvider = configProvider;
    }

    getMameInfos(): EventEmitter<any> {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        this._init().subscribe(() => {
            eventEmitter.emit(this._mameInfos);
        });
        return eventEmitter;
    }

    getDetail(name: string): EventEmitter<any> {
        const config = {
            url: this._configProvider.getServiceUrl("detail"),
            params: new HttpParams().set("name", name),
            useCache: true
        };
        return this._callService(config);
    }

    search(type: string, value: string): EventEmitter<any> {
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

    _callService(config): EventEmitter<any> {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        const cacheKey = this._getCacheKey(config);
        this.getCache().getItem(cacheKey).subscribe((value: any) => {
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
                                this.getCache().setItem(cacheKey, value, "version");
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
                    this.getCache().setItem("version", data.mameInfos.build, undefined).subscribe((event: any) => {
                        if (event.newValue !== event.oldValue) {
                            this.getCache().deleteNamespace("version");
                        }
                    });
                }
                eventEmitter.emit();
            });
        }
        return eventEmitter;
    }
}
