import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { DetailModel } from '../../detail-model';
import { AbstractAppPopup } from 'src/app/common/abstract-app-popup';

@Component({
  selector: 'clones-popup',
  templateUrl: './clones-popup.html',
  styleUrls: ['./clones-popup.css']
})
export class ClonesPopup extends AbstractAppPopup {

  _routerAction: any = null;

  constructor(appHelperObject: AppHelperObject, detailModel: DetailModel) {
    super(appHelperObject, detailModel);
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
