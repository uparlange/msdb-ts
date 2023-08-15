import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbstractAppModel } from '../../common/abstract-app-model';
import { AppHelperObject } from '../../common/providers/app-helper-object';
import { AppEvents } from '../../app-events';

@Injectable()
export class DetailModel extends AbstractAppModel {

  private _socketConfigChangedSubscription: Subscription = new Subscription();
  private _socketChangeInRomsDirectorySubscription: Subscription = new Subscription();

  constructor(
    protected override _helper: AppHelperObject) {
    super(_helper);
  }

  override onRefresh(callback: Function): void {
    super.onRefresh(callback);
    this.data = this._getInitData();
    this.getMsdbProvider().getDetail(this.params.name).subscribe((data: any) => {
      if (data === null) {
        this.data.game.description = this.params.name;
      } else {
        this.data.game = data;
        if (this.data.game.adult) {
          this.getEventBus().emit(AppEvents.SET_BACKGROUND_CLASS, "background-adult");
        }
        const images:Array<any> = [];
        this.data.game.images.forEach((image: any) => {
          if (image.name.indexOf(".ico") === -1) {
            images.push({
              name: image.name,
              src: `${this.getGameFolder(this.data.game)}/${image.name}`,
              w: image.width,
              h: image.height
            });
          } else {
            this.data.game.icon = { name: image.name };
          }
        });
        this.data.images = images;
        this.getHistory().add(this.data.game.description, this.getGameIconUrl(this.data.game));
        this.setTitle(`${this.data.game.description}`);
        this.setKeywords(`${this.data.game.name}, ${this.data.game.description}`);
        this.getMsdbProvider().search("clones", this.params.name).subscribe((data: any) => {
          this.data.clones = data;
          callback();
        });
        this._refreshGameAvailability();
      }
    });
  }

  override onDestroy(): void {
    super.onDestroy();
    this._socketConfigChangedSubscription.unsubscribe();
    this._socketChangeInRomsDirectorySubscription.unsubscribe();
  }

  getGameSizeLabel() {
    let size = 0;
    if (this.data.game.roms !== undefined) {
      this.data.game.roms.forEach((element: any) => {
        size += parseInt(element.size);
      });
    }
    return this.getSizeLabel(size);
  }

  getRatingValue(label: string): number {
    const value = parseInt(label.substring(label.indexOf("to") + 3, label.indexOf("(") - 1));
    return value / 20;
  }

  private _refreshGameAvailability(): void {
    this.data.gameAvailable = false;
  }

  protected override _getInitData(): any {
    return {
      game: {},
      clones: [],
      images: [],
      gameAvailable: false
    };
  }
}