import { AbstractAppModel } from '../../../common/abstract-app-model';
import { AppClassHelper } from '../../../common/app-class-helper';
import { MsdbProvider } from '../../../common/msdb-provider';
import { Injectable } from '@angular/core';

@Injectable()
export class DetailModel extends AbstractAppModel {

  _socketConfigChangedSubscriber: any = null;

  constructor(appClassHelper: AppClassHelper, msdbProvider: MsdbProvider) {
    super(appClassHelper, msdbProvider);
  }

  onInit(): void {
    super.onInit();
    /*
		this._socketConfigChangedSubscriber = this.getSocket().on("CONFIG_CHANGED").subscribe(() => {
			this._refreshGameAvailability();
		});
    */
  }

  onRefresh(callback): void {
    super.onRefresh(callback);
    this.data = this._getInitData();
    this.getProvider().getDetail(this.params.name).subscribe((data) => {
      if (data === null) {
        this.data.game.description = this.params.name;
      } else {
        this.data.game = data;
        this.getHistory().add({ label: this.data.game.description, url: this.getRouter().getUrl(), icon: "gamepad" });
        const images = [];
        this.data.game.images.forEach((image) => {
          if (image.name.indexOf(".ico") === -1) {
            images.push({
              name: image.name,
              src: `${this.getGameFolder(this.data.game)}/${image.name}`,
              w: image.width,
              h: image.height
            });
          }
        });
        this.data.images = images;
        this.setTitle(`${this.data.game.description}`);
        this.setKeywords(`${this.data.game.name}, ${this.data.game.description}`);
        this.getProvider().search("clones", this.params.name).subscribe((data) => {
          this.data.clones = data;
          callback();
        });
        this._refreshGameAvailability();
      }
    });
  }

  onDestroy() {
    super.onDestroy();
    //this._socketConfigChangedSubscriber.unsubscribe();
  }

  inFavorites(game) {
    return this.getFavorites().has(game.name);
  }

  addToFavorite(game) {
    this.getFavorites().add(game.name);
  }

  removeFromFavorites(game) {
    this.getFavorites().remove(game.name);
  }

  playGame(game) {
    this.getSocket().emit("PLAY_GAME", game.name);
  }

  getStatusClass(status) {
    return `label-${status}`;
  }

  getStatusLabel(status) {
    return (status != null) ? `L10N_${status.toUpperCase()}` : null;
  }

  getGameSizeLabel() {
    let size = 0;
    if (this.data.game.roms !== undefined) {
      this.data.game.roms.forEach((element) => {
        size += parseInt(element.size);
      });
    }
    return this.getSizeLabel(size);
  }

  trackByName(index, item) {
    return item ? item.name : undefined;
  }

  trackByTag(index, item) {
    return item ? item.tag : undefined;
  }

  _refreshGameAvailability() {
    this.data.gameAvailable = false;
    this.getSocket().emit("IS_ROM_AVAILABLE", this.params.name).subscribe((result) => {
      if (result !== null && result.name === this.params.name) {
        this.data.gameAvailable = result.available;
      }
    });
  }

  _getInitData() {
    return {
      game: {
        dipswitchs: [],
        chips: [],
        biossets: [],
        ports: [],
        devicerefs: []
      },
      clones: [],
      images: [],
      gameAvailable: false
    };
  }
}
