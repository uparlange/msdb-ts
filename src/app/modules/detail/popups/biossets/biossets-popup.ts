import { Component } from '@angular/core';
import { AbstractAppPopup } from 'src/app/common/abstract-app-popup';
import { DetailModel } from '../../detail-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Component({
  templateUrl: './biossets-popup.html',
  styleUrls: ['./biossets-popup.css']
})
export class BiossetsPopup extends AbstractAppPopup {

  constructor(
    protected _helper: AppHelperObject,
    public model: DetailModel) {
    super(_helper, model);
  }
}
