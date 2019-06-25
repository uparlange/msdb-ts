import { AbstractAppView } from '../../../common/abstract-app-view';
import { AppClassHelper } from '../../../common/app-class-helper';
import { DetailModel } from './detail-model';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BiossetsView } from './biossets/biossets-view';

@Component({
  selector: 'detail-view',
  templateUrl: './detail-view.html',
  styleUrls: ['./detail-view.css']
})
export class DetailView extends AbstractAppView {

  _matDialog: MatDialog = null;

  constructor(appClassHelper: AppClassHelper, detailModel: DetailModel, matDialog: MatDialog) {
    super(appClassHelper, detailModel);
    this._matDialog = matDialog;
  }

  openDriverPopup(): void {
    //this._openPopup(DriverPopup);
  }

  openRomsPopup(): void {
    //this._openPopup(RomsPopup);
  }

  openClonesPopup(): void {
    //this._openPopup(ClonesPopup);
  }

  openDipSwitchsPopup() {
    //this._openPopup(DipSwitchsPopup);
  }

  openChipsPopup(): void {
    //this._openPopup(ChipsPopup);
  }

  openBiossetsPopup(): void {
    this._openPopup(BiossetsView);
  }

  openPortsPopup(): void {
    //this._openPopup(PortsPopup);
  }

  openDeviceReferencesPopup(): void {
    //this._openPopup(DeviceRefsPopup);
  }

  _openPopup(clazz: any): void {
    this.getPopups().open(this._matDialog, clazz, { disableClose: true });
  }
}
