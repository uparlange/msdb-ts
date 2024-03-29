import { Injectable, EventEmitter } from '@angular/core';
import { AbstractManager } from '../../fwk/abstract-manager';
import { HttpClient } from '@angular/common/http';
import { WindowRef } from '../../fwk/providers/window-ref';
import { environment } from './../../../environments/environment';

@Injectable({ providedIn: "root" })
export class TranslateManager extends AbstractManager {

  private _properties: any = {};
  private _propertyFilePattern: string = environment.assetsFolder + "/i18n/{locale}.json";
  private _loading: boolean = false;
  private _pendingRequests: Array<any> = new Array();
  private _currentLang: string = "";

  constructor(
    private _http: HttpClient, 
    private _windowRef: WindowRef) {
    super();
  }

  override init(): void {
    super.init();
    const navigatorLang = this._windowRef.nativeWindow.navigator.language.split("-")[0];
    const defaultLang = /(fr|en)/gi.test(navigatorLang) ? navigatorLang : "en";
    this.setLanguage(defaultLang);
  }

  setLanguage(lang: string): void {
    if (this._currentLang !== lang) {
      const oldValue = this._currentLang;
      this._currentLang = lang;
      this._loadProperties().subscribe(() => {
        this.emit("languageChange", {
          oldValue: oldValue,
          newValue: lang
        });
      });
    }
  }

  getCurrentLanguage(): string {
    return this._currentLang;
  }

  getValues(params: any): EventEmitter<any> {
    const eventEmitter: EventEmitter<any> = new EventEmitter();
    if (this._loading) {
      this._pendingRequests.push({
        params: params,
        eventEmitter: eventEmitter
      });
    }
    else {
      setTimeout(() => {
        eventEmitter.emit(this._getValues(params));
      }, 0);
    }
    return eventEmitter;
  }

  private _getValues(params: any): Map<String, any> {
    const values:Map<String, any> = new Map();
    params.forEach((param: any) => {
      if (typeof (param) === "object") {
        values.set(param.key, this._getValue(param.key, param.properties));
      } else {
        values.set(param, this._getValue(param, new Array()));
      }
    });
    return values;
  }

  private _getValue(key: string, properties: Array<string>): any {
    let value = key;
    if (this._properties[this._currentLang] != null) {
      if (this._properties[this._currentLang].hasOwnProperty(key)) {
        value = this._properties[this._currentLang][key];
      }
      if (Array.isArray(properties)) {
        properties.forEach((property, index) => {
          value = value.replace(`{${index}}`, property);
        });
      }
    }
    return value;
  }

  private _checkPendingRequests(): void {
    this._pendingRequests.forEach((request) => {
      const values = this._getValues(request.params);
      request.eventEmitter.emit(values);
    });
    this._pendingRequests = new Array();
  }

  private _loadProperties(): EventEmitter<any> {
    const eventEmitter: EventEmitter<any> = new EventEmitter();
    if (!this._properties.hasOwnProperty(this._currentLang) && !this._loading) {
      this._loading = true;
      const path = this._propertyFilePattern.replace("{locale}", this._currentLang);
      this._http.get(path).subscribe((data) => {
        this._properties[this._currentLang] = data;
        this._loading = false;
        this._checkPendingRequests();
        eventEmitter.emit();
      });
    }
    else {
      setTimeout(() => {
        eventEmitter.emit();
      }, 0);
    }
    return eventEmitter;
  }
}