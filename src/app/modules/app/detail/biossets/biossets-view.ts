import { AbstractPopup } from 'src/app/fwk/abstract-popup';
import { AppClassHelper } from 'src/app/common/app-class-helper';
import { Component } from '@angular/core';
import { DetailModel } from '../detail-model';

@Component({
  selector: 'biossets-view',
  templateUrl: './biossets-view.html',
  styleUrls: ['./biossets-view.css']
})
export class BiossetsView extends AbstractPopup {

  constructor(appClassHelper: AppClassHelper, detailModel: DetailModel) {
    super(appClassHelper, detailModel);
  }
}
