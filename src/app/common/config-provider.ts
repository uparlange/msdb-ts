import { AbstractObject } from '../fwk/abstract-object';
import { WindowRef } from '../fwk/window-ref';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider extends AbstractObject {

  _windowRef: WindowRef = null;

  constructor(windowRef: WindowRef) {
    super();
    this._windowRef = windowRef;
  }

  getServiceUrl(serviceName: string): string {
    return `${this._getBaseClientUrl()}php/services/${serviceName}.php`;
  }

  getGameIconUrl(game: any): string {
    return game.icon !== null ? `${this.getGameFolder(game)}/${game.icon.name}` : "assets/game.png";
  }

  getGameFolder(game: any): string {
    return `${this._getBaseClientUrl()}games/${game.name}`;
  }

  getSocketPort(): number {
    return 3000;
  }

  getSocketUrl(): string {
    return `${this._getBaseServerUrl()}:${this.getSocketPort()}`;
  }

  runInNw(): boolean {
    return this._windowRef.nativeWindow.hasOwnProperty("nw");
  }

  _productionMode(): boolean {
    return this._windowRef.nativeWindow.location.href.indexOf(this._getBaseServerUrl()) === -1;
  }

  _getBaseServerUrl(): string {
    return "http://localhost";
  }

  _getBaseClientUrl(): string {
    /*
      let path = "";
      if (!this._productionMode() || this.runInNw()) {
          path = "https://msdb.lapli.fr/";
      }
      return path;
      //return "http://localhost/msdb2/dist/";
      */
    return "https://msdb.lapli.fr/";
  }
}
