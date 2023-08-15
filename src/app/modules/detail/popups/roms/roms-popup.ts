import { Component } from '@angular/core';
import { DetailModel } from '../../detail-model';
import { AbstractAppPopup } from '../../../../common/abstract-app-popup';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';

@Component({
  templateUrl: './roms-popup.html',
  styleUrls: ['./roms-popup.css']
})
export class RomsPopup extends AbstractAppPopup {

  constructor(
    protected override _helper: AppHelperObject, 
    public override model: DetailModel) {
    super(_helper, model);
  }

  getSizeLabel(value: number): string {
    return this.getConfigProvider().getSizeLabel(value);
  }
}
