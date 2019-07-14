import { AppHelperObject } from 'src/app/common/app-helper-object';
import { Component } from '@angular/core';
import { DetailModel } from '../../detail-model';
import { AbstractAppPopup } from 'src/app/common/abstract-app-popup';

@Component({
  templateUrl: './roms-popup.html',
  styleUrls: ['./roms-popup.css']
})
export class RomsPopup extends AbstractAppPopup {

  constructor(appHelperObject: AppHelperObject, detailModel: DetailModel) {
    super(appHelperObject, detailModel);
  }

  getSizeLabel(value: number): string {
    return this.getConfigProvider().getSizeLabel(value);
  }
}
