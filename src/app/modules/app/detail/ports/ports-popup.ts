import { AppHelperObject } from 'src/app/common/app-helper-object';
import { Component } from '@angular/core';
import { DetailModel } from '../detail-model';
import { AbstractAppPopup } from 'src/app/common/abstract-app-popup';

@Component({
  selector: 'ports-popup',
  templateUrl: './ports-popup.html',
  styleUrls: ['./ports-popup.css']
})
export class PortsPopup extends AbstractAppPopup {

  constructor(appHelperObject: AppHelperObject, detailModel: DetailModel) {
    super(appHelperObject, detailModel);
  }

  getPortValue(value: string): string {
    return value.replace(/:/g, " > ");
  }
}
