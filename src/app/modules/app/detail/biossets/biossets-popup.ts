import { AppHelperObject } from 'src/app/common/app-helper-object';
import { Component } from '@angular/core';
import { DetailModel } from '../detail-model';
import { AbstractAppPopup } from 'src/app/common/abstract-app-popup';

@Component({
  selector: 'biossets-popup',
  templateUrl: './biossets-popup.html',
  styleUrls: ['./biossets-popup.css']
})
export class BiossetsPopup extends AbstractAppPopup {

  constructor(appHelperObject: AppHelperObject, detailModel: DetailModel) {
    super(appHelperObject, detailModel);
  }
}
