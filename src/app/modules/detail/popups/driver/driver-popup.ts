import { AppHelperObject } from 'src/app/common/app-helper-object';
import { Component } from '@angular/core';
import { DetailModel } from '../../detail-model';
import { AbstractAppPopup } from 'src/app/common/abstract-app-popup';

@Component({
  selector: 'driver-popup',
  templateUrl: './driver-popup.html',
  styleUrls: ['./driver-popup.css']
})
export class DriverPopup extends AbstractAppPopup {

  _routerAction: any = null;

  constructor(appHelperObject: AppHelperObject, detailModel: DetailModel) {
    super(appHelperObject, detailModel);
  }

  showGamesForMameVersion(version: string): void {
    this._routerAction = {
      commands: ["/result"],
      extras: { queryParams: { type: "version", value: version } }
    };
    this.close();
  }

  beforeClose(): void {
    super.beforeClose();
    if (this._routerAction != null) {
      this.getRouter().navigate(this._routerAction.commands, this._routerAction.extras);
      this._routerAction = null;
    }
  }
}
