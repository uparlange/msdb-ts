import { AbstractManager } from '../../fwk/abstract-manager';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class HistoryManager extends AbstractManager {

  _history: Array<any> = new Array();

  constructor() {
    super();
  }

  init(): void {
    super.init();
  }

  add(newItem: any) {
    const index: number = this._history.findIndex(function(currentItem: any) {
      return newItem.url === currentItem.url;
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
