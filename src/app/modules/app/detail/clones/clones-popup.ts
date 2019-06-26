import { Component } from '@angular/core';
import { AbstractPopup } from 'src/app/fwk/abstract-popup';
import { AppClassHelper } from 'src/app/common/app-class-helper';
import { DetailModel } from '../detail-model';

@Component({
  selector: 'clones-popup',
  templateUrl: './clones-popup.html',
  styleUrls: ['./clones-popup.css']
})
export class ClonesPopup extends AbstractPopup {

  _routerAction: any = null;

  constructor(appClassHelper: AppClassHelper, detailModel: DetailModel) {
    super(appClassHelper, detailModel);
  }

  showCloneDetail(name: string): void {
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
