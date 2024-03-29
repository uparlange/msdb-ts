import { DetailModel } from './detail-model';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BiossetsPopup } from './popups/biossets/biossets-popup';
import { ChipsPopup } from './popups/chips/chips-popup';
import { ClonesPopup } from './popups/clones/clones-popup';
import { DeviceRefsPopup } from './popups/device-refs/device-refs-popup';
import { DipSwitchsPopup } from './popups/dip-switchs/dip-switchs-popup';
import { DriverPopup } from './popups/driver/driver-popup';
import { PortsPopup } from './popups/ports/ports-popup';
import { RomsPopup } from './popups/roms/roms-popup';
import { AbstractAppView } from '../../common/abstract-app-view';
import { AppHelperObject } from '../../common/providers/app-helper-object';

@Component({
  templateUrl: './detail-view.html',
  styleUrls: ['./detail-view.css']
})
export class DetailView extends AbstractAppView {

  constructor(
    protected override _helper: AppHelperObject,
    public override model: DetailModel,
    private _matDialog: MatDialog) {
    super(_helper, model);
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
    // TODO ?
  }

  inFavorites(game: any): boolean {
    return this.getFavorites().has(game.name);
  }

  addToFavorites(game: any): void {
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

  private _openPopup(clazz: any): void {
    this.getPopups().open(this._matDialog, clazz, {
      disableClose: true,
      minWidth: 360
    });
  }
}
