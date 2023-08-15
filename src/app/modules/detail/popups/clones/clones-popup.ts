import { Component } from '@angular/core';
import { DetailModel } from '../../detail-model';
import { AbstractAppPopup } from '../../../../common/abstract-app-popup';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';

@Component({
  templateUrl: './clones-popup.html',
  styleUrls: ['./clones-popup.css']
})
export class ClonesPopup extends AbstractAppPopup {

  private _routerAction: any = null;

  constructor(
    protected override _helper: AppHelperObject, 
    public override model: DetailModel) {
    super(_helper, model);
  }

  showCloneDetail(name: string): void {
    this._routerAction = {
      commands: ["/detail"],
      extras: { queryParams: { name: name } }
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
