import { AbstractPopup } from 'src/app/fwk/abstract-popup';
import { AppClassHelper } from 'src/app/common/app-class-helper';
import { Component } from '@angular/core';
import { DetailModel } from '../detail-model';

@Component({
  selector: 'ports-popup',
  templateUrl: './ports-popup.html',
  styleUrls: ['./ports-popup.css']
})
export class PortsPopup extends AbstractPopup {

  constructor(appClassHelper: AppClassHelper, detailModel: DetailModel) {
    super(appClassHelper, detailModel);
  }

  getPortValue(value: string): string {
    return value.replace(/:/g, " > ");
  }
}
