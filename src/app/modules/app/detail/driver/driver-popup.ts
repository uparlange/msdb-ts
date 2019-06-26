import { AbstractPopup } from 'src/app/fwk/abstract-popup';
import { AppClassHelper } from 'src/app/common/app-class-helper';
import { Component } from '@angular/core';
import { DetailModel } from '../detail-model';

@Component({
  selector: 'driver-popup',
  templateUrl: './driver-popup.html',
  styleUrls: ['./driver-popup.css']
})
export class DriverPopup extends AbstractPopup {

  _routerAction: any = null;

  constructor(appClassHelper: AppClassHelper, detailModel: DetailModel) {
    super(appClassHelper, detailModel);
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
