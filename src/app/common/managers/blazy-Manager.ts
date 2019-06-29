import { AbstractManager } from '../../fwk/abstract-manager';
import { Injectable } from '@angular/core';
import Blazy from 'blazy';

@Injectable()
export class BlazyManager extends AbstractManager {

  _blazy: BlazyInstance = new Blazy(null);
  _timeoutInterval: any = null;

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
