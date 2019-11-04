import { Injectable, EventEmitter } from '@angular/core';
import { AbstractManager } from 'src/app/fwk/abstract-manager';
import { HttpClient } from '@angular/common/http';
import { WindowRef } from 'src/app/fwk/providers/window-ref';

@Injectable({ providedIn: "root" })
export class TranslateManager extends AbstractManager {

  _http: HttpClient = null;
  _windowRef: WindowRef = null;
  _properties: any = {};
  _propertyFilePattern: string = "/assets/data/{locale}.json";
  _loading: boolean = false;
  _pendingRequests: Array<any> = new Array();
  _currentLang: string = null;

  constructor(http: HttpClient, windowRef: WindowRef) {
    super();
    this._http = http;
    this._windowRef = windowRef;
  }

  init(): void {
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

  _getValues(params: any): any {
    const values = {};
    params.forEach((param: any) => {
      if (typeof (param) === "object") {
        values[param.key] = this._getValue(param.key, param.properties);
      } else {
        values[param] = this._getValue(param, null);
      }
    });
    return values;
  }

  _getValue(key: string, properties: Array<string>): any {
    let value = key;
    if (this._properties[this._currentLang] !== undefined) {
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

  _checkPendingRequests(): void {
    this._pendingRequests.forEach((request) => {
      const values = this._getValues(request.params);
      request.eventEmitter.emit(values);
    });
    this._pendingRequests = new Array();
  }

  _loadProperties(): EventEmitter<any> {
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