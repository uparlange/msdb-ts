import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { AbstractObject } from '../../fwk/abstract-object';
import { WindowRef } from '../../fwk/providers/window-ref';

@Injectable({ providedIn: "root" })
export class ConfigProvider extends AbstractObject {

  constructor(
    private _windowRef: WindowRef) {
    super();
  }

  getServiceUrl(serviceName: string): string {
    return `${this._getBaseClientUrl()}php/services/${serviceName}.php`;
  }

  getGameIconUrl(game: any): string {
    return game.icon !== null ? `${this.getGameFolder(game)}/${game.icon.name}` : environment.assetsFolder + "/images/game.png";
  }

  getGameFolder(game: any): string {
    return `${this._getBaseClientUrl()}games/${game.name}`;
  }

  getGameManualUrl(game: any): string {
    return `https://www.progettosnaps.net/manuals/pdf/${game.name}.pdf`;
  }

  getGameVideoUrl(game: any): string {
    return `https://www.progettosnaps.net/videosnaps/mp4/${game.name}.mp4`;
  }

  getGameSoundTrackUrl(game: any): string {
    return `https://www.progettosnaps.net/soundtrack/packs/mp3/${game.name}.zip`;
  }

  getSocketPort(): string {
    return environment.wsPort;
  }

  getSocketUrl(): string {
    return `${this._getBaseServerUrl()}:${this.getSocketPort()}`;
  }

  runInNw(): boolean {
    return this._windowRef.nativeWindow.hasOwnProperty("nw");
  }

  inBetaMode(): boolean {
    return this._windowRef.nativeWindow.location.href.indexOf("beta") !== -1;
  }

  getSizeLabel(value: number): string {
    return this._getUnitLabel(value, ["B", "KiB", "MiB", "GiB"], 1024);
  }

  getFrequencyLabel(value: number): string {
    return this._getUnitLabel(value, ["Hz", "kHz", "MHz", "GHz"], 1000);
  }

  getUpdateUrl(): string {
    return "https://raw.githubusercontent.com/uparlange/msdb-ts/master/release/versions.nsis.json";
  }

  private _productionMode(): boolean {
    return this._windowRef.nativeWindow.location.href.indexOf(this._getBaseServerUrl()) === -1;
  }

  private _getBaseServerUrl(): string {
    return "http://localhost";
  }

  private _getUnitLabel(value: number, steps: Array<string>, stepMultiplier: number): string {
    let step: any;
    steps.forEach((item, index) => {
      const stepValue = Math.pow(stepMultiplier, index);
      if (value >= stepValue) {
        step = { unit: item, value: stepValue };
      }
      else {
        return;
      }
    });
    return `${Math.round(value / step.value * 100) / 100} ${step.unit}`;
  }

  private _getBaseClientUrl(): string {
    return "https://msdb.lapli.fr/";
  }
}
