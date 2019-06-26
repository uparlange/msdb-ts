import { AbstractPopup } from 'src/app/fwk/abstract-popup';
import { AppClassHelper } from 'src/app/common/app-class-helper';
import { Component } from '@angular/core';
import { DetailModel } from '../detail-model';

@Component({
  selector: 'biossets-popup',
  templateUrl: './biossets-popup.html',
  styleUrls: ['./biossets-popup.css']
})
export class BiossetsPopup extends AbstractPopup {

  constructor(appClassHelper: AppClassHelper, detailModel: DetailModel) {
    super(appClassHelper, detailModel);
  }
}
