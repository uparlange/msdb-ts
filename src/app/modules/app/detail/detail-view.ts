import { AbstractAppView } from '../../../common/abstract-app-view';
import { AppHelperObject } from '../../../common/app-helper-object';
import { DetailModel } from './detail-model';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BiossetsPopup } from './biossets/biossets-popup';
import { ChipsPopup } from './chips/chips-popup';
import { ClonesPopup } from './clones/clones-popup';
import { DeviceRefsPopup } from './device-refs/device-refs-popup';
import { DipSwitchsPopup } from './dip-switchs/dip-switchs-popup';
import { DriverPopup } from './driver/driver-popup';
import { PortsPopup } from './ports/ports-popup';
import { RomsPopup } from './roms/roms-popup';

@Component({
  selector: 'detail-view',
  templateUrl: './detail-view.html',
  styleUrls: ['./detail-view.css']
})
export class DetailView extends AbstractAppView {

  _matDialog: MatDialog = null;

  constructor(appHelperObject: AppHelperObject, detailModel: DetailModel, matDialog: MatDialog) {
    super(appHelperObject, detailModel);
    this._matDialog = matDialog;
  }

  getGameVideoUrl(game: any): string {
    return this._getHelper().getConfigProvider().getGameVideoUrl(game);
  }

  getGameManualUrl(game: any): string {
    return this._getHelper().getConfigProvider().getGameManualUrl(game);
  }

  getGameSoundTrackUrl(game: any): string {
    return this._getHelper().getConfigProvider().getGameSoundTrackUrl(game);
  }

  playGame(game: any): void {
    this.getSocket().emit("PLAY_GAME", game.name);
  }

  inFavorites(game: any): boolean {
    return this.getFavorites().has(game.name);
  }

  addToFavorite(game: any): void {
    this.getFavorites().add(game.name);
  }

  removeFromFavorites(game: any): void {
    this.getFavorites().remove(game.name);
  }

  openDriverPopup(): void {
    this._openPopup(DriverPopup);
  }

  openRomsPopup(): void {
    this._openPopup(RomsPopup);
  }

  openClonesPopup(): void {
    this._openPopup(ClonesPopup);
  }

  openDipSwitchsPopup() {
    this._openPopup(DipSwitchsPopup);
  }

  openChipsPopup(): void {
    this._openPopup(ChipsPopup);
  }

  openBiossetsPopup(): void {
    this._openPopup(BiossetsPopup);
  }

  openPortsPopup(): void {
    this._openPopup(PortsPopup);
  }

  openDeviceRefsPopup(): void {
    this._openPopup(DeviceRefsPopup);
  }

  _openPopup(clazz: any): void {
    this.getPopups().open(this._matDialog, clazz, { disableClose: true });
  }
}
