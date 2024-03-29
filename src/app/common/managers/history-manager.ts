import { AbstractManager } from '../../fwk/abstract-manager';
import { EventEmitter, Injectable } from '@angular/core';
import { RouterManager } from '../../fwk/managers/router-manager';

@Injectable({ providedIn: "root" })
export class HistoryManager extends AbstractManager {

  private _history: Array<any> = new Array();

  constructor(
    private _routerManager: RouterManager) {
    super();
  }

  override init(): void {
    super.init();
  }

  add(label: string, icon: string) {
    const newItem = {
      label: label,
      icon: icon,
      url: this._routerManager.getUrlWithoutQueryParams(),
      queryParams: this._routerManager.getUrlQueryParams()
    }
    const index: number = this._history.findIndex(function (currentItem: any) {
      return JSON.stringify(newItem) === JSON.stringify(currentItem);
    });
    if (index !== -1) {
      this._history.splice(index, 1);
    }
    this._history.unshift(newItem);
  }

  getList(): EventEmitter<any> {
    const eventEmitter: EventEmitter<any> = new EventEmitter();
    setTimeout(() => {
      eventEmitter.emit(this._history);
    }, 0);
    return eventEmitter;
  }
}
