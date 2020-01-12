import { Component } from '@angular/core';
import { DetailModel } from '../../detail-model';
import { AbstractAppPopup } from 'src/app/common/abstract-app-popup';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Component({
  templateUrl: './ports-popup.html',
  styleUrls: ['./ports-popup.css']
})
export class PortsPopup extends AbstractAppPopup {

  constructor(
    protected _helper: AppHelperObject, 
    public model: DetailModel) {
    super(_helper, model);
  }

  getPortValue(value: string): string {
    return value.replace(/:/g, " > ");
  }
}
