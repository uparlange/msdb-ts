import { AbstractManager } from '../../fwk/abstract-manager';
import { CacheManager } from '../../fwk/managers/cache-manager';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class FavoritesManager extends AbstractManager {

  _cacheManager: CacheManager = null;
  _favorites: Array<string> = new Array();;

  constructor(cacheManager: CacheManager) {
    super();
    this._cacheManager = cacheManager;
  }

  init(): void {
    super.init();
    this._cacheManager.getItem("favorites", []).subscribe((value: Array<any>) => {
      this._favorites = value;
    });
  }

  add(name: string): void {
    if (!this.has(name)) {
      this._favorites.push(name);
      this._save();
      this.emit("change", {
        action: "add",
        value: name
      });
    }
  }

  remove(name: string): void {
    const index = this._favorites.indexOf(name);
    if (index !== -1) {
      this._favorites.splice(index, 1);
      this._save();
      this.emit("change", {
        action: "remove",
        value: name
      });
    }
  }

  has(name: string): boolean {
    return (this._favorites.indexOf(name) !== -1);
  }

  getList(): EventEmitter<any> {
    const eventEmitter: EventEmitter<any> = new EventEmitter();
    setTimeout(() => {
      eventEmitter.emit(this._favorites);
    }, 0);
    return eventEmitter;
  }

  _save(): void {
    this._cacheManager.setItem("favorites", this._favorites, "favorites");
  }
}
