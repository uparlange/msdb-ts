import { Component } from '@angular/core';
import { DetailModel } from '../../detail-model';
import { AbstractAppPopup } from 'src/app/common/abstract-app-popup';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Component({
  templateUrl: './roms-popup.html',
  styleUrls: ['./roms-popup.css']
})
export class RomsPopup extends AbstractAppPopup {

  constructor(
    protected _helper: AppHelperObject, 
    public model: DetailModel) {
    super(_helper, model);
  }

  getSizeLabel(value: number): string {
    return this.getConfigProvider().getSizeLabel(value);
  }
}
