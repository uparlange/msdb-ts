import { Component } from '@angular/core';
import { DetailModel } from '../../detail-model';
import { AbstractAppPopup } from '../../../../common/abstract-app-popup';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';

@Component({
  templateUrl: './ports-popup.html',
  styleUrls: ['./ports-popup.css']
})
export class PortsPopup extends AbstractAppPopup {

  constructor(
    protected override _helper: AppHelperObject, 
    public override model: DetailModel) {
    super(_helper, model);
  }

  getPortValue(value: string): string {
    return value.replace(/:/g, " > ");
  }
}
