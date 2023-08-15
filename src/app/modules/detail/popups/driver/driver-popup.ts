import { Component } from '@angular/core';
import { DetailModel } from '../../detail-model';
import { AbstractAppPopup } from '../../../../common/abstract-app-popup';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';

@Component({
  templateUrl: './driver-popup.html',
  styleUrls: ['./driver-popup.css']
})
export class DriverPopup extends AbstractAppPopup {

  private _routerAction: any = null;

  constructor(
    protected override _helper: AppHelperObject, 
    public override model: DetailModel) {
    super(_helper, model);
  }

  showGamesForMameVersion(version: string): void {
    this._routerAction = {
      commands: ["/result"],
      extras: { queryParams: { type: "version", value: version } }
    };
    this.close();
  }

  override beforeClose(): void {
    super.beforeClose();
    if (this._routerAction != null) {
      this.getRouter().navigate(this._routerAction.commands, this._routerAction.extras);
      this._routerAction = null;
    }
  }
}
