import { Component } from '@angular/core';
import { AbstractAppPopup } from '../../../../common/abstract-app-popup';
import { DetailModel } from '../../detail-model';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';

@Component({
  templateUrl: './biossets-popup.html',
  styleUrls: ['./biossets-popup.css']
})
export class BiossetsPopup extends AbstractAppPopup {

  constructor(
    protected override _helper: AppHelperObject,
    public override model: DetailModel) {
    super(_helper, model);
  }
}
