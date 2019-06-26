import { AbstractPopup } from 'src/app/fwk/abstract-popup';
import { AppClassHelper } from 'src/app/common/app-class-helper';
import { Component } from '@angular/core';
import { DetailModel } from '../detail-model';

@Component({
  selector: 'device-refs-popup',
  templateUrl: './device-refs-popup.html',
  styleUrls: ['./device-refs-popup.css']
})
export class DeviceRefsPopup extends AbstractPopup {

  _routerAction: any = null;

  constructor(appClassHelper: AppClassHelper, detailModel: DetailModel) {
    super(appClassHelper, detailModel);
  }

  showDeviceDetail(name: string): void {
    this._routerAction = {
      commands: ["/detail"],
      extras: { queryParams: { name: name } }
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
