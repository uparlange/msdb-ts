import { AbstractManager } from '../../fwk/abstract-manager';
import { Injectable } from '@angular/core';
import Blazy from 'blazy';

@Injectable({ providedIn: "root" })
export class BlazyManager extends AbstractManager {

  private _blazy: BlazyInstance = new Blazy(null);
  private _timeoutInterval: any = null;

  constructor() {
    super();
  }

  init(): void {
    super.init();
  }

  refresh() {
    if (this._timeoutInterval !== null) {
      clearTimeout(this._timeoutInterval);
    }
    this._timeoutInterval = setTimeout(() => {
      this._blazy.revalidate();
    }, 50);
  }
}
