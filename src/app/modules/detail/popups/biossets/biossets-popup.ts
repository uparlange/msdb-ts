import { AppHelperObject } from 'src/app/common/app-helper-object';
import { Component } from '@angular/core';
import { AbstractAppPopup } from 'src/app/common/abstract-app-popup';
import { DetailModel } from '../../detail-model';

@Component({
  templateUrl: './biossets-popup.html',
  styleUrls: ['./biossets-popup.css']
})
export class BiossetsPopup extends AbstractAppPopup {

  constructor(appHelperObject: AppHelperObject, detailModel: DetailModel) {
    super(appHelperObject, detailModel);
  }
}
