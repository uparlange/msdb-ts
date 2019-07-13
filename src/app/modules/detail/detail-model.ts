import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { MsdbProvider } from 'src/app/common/msdb-provider';

@Injectable()
export class DetailModel extends AbstractAppModel {

  _socketConfigChangedSubscription: Subscription = null;

  constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
    super(appHelperObject, msdbProvider);
  }

  onInit(): void {
    super.onInit();
    this._socketConfigChangedSubscription = this.getSocket().on("CONFIG_CHANGED").subscribe(() => {
      this._refreshGameAvailability();
    });
  }

  onRefresh(callback: Function): void {
    super.onRefresh(callback);
    this.data = this._getInitData();
    this.getProvider().getDetail(this.params.name).subscribe((data: any) => {
      if (data === null) {
        this.data.game.description = this.params.name;
      } else {
        this.data.game = data;
        this.getHistory().add(this.data.game.description, "gamepad");
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
        this.getProvider().search("clones", this.params.name).subscribe((data: any) => {
          this.data.clones = data;
          callback();
        });
        this._refreshGameAvailability();
      }
    });
  }

  onDestroy(): void {
    super.onDestroy();
    this._socketConfigChangedSubscription.unsubscribe();
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

  _refreshGameAvailability(): void {
    this.data.gameAvailable = false;
    this.getSocket().emit("IS_ROM_AVAILABLE", this.params.name).subscribe((result: any) => {
      if (result !== null && result.name === this.params.name) {
        this.data.gameAvailable = result.available;
      }
    });
  }

  _getInitData(): any {
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