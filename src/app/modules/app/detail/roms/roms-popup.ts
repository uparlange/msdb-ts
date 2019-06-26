import { AbstractPopup } from 'src/app/fwk/abstract-popup';
import { AppClassHelper } from 'src/app/common/app-class-helper';
import { Component } from '@angular/core';
import { DetailModel } from '../detail-model';

@Component({
  selector: 'roms-popup',
  templateUrl: './roms-popup.html',
  styleUrls: ['./roms-popup.css']
})
export class RomsPopup extends AbstractPopup {

  constructor(appClassHelper: AppClassHelper, detailModel: DetailModel) {
    super(appClassHelper, detailModel);
  }
}
