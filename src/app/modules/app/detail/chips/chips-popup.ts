import { DetailModel } from '../detail-model';
import { AppClassHelper } from 'src/app/common/app-class-helper';
import { AbstractPopup } from 'src/app/fwk/abstract-popup';
import { Component } from '@angular/core';

@Component({
  selector: 'chips-popup',
  templateUrl: './chips-popup.html',
  styleUrls: ['./chips-popup.css']
})
export class ChipsPopup extends AbstractPopup {

  provider: Array<any> = null;

  constructor(appClassHelper: AppClassHelper, detailModel: DetailModel) {
    super(appClassHelper, detailModel);
  }

  onInit(): void {
    super.onInit();
    const map = {};
    const provider: Array<any> = new Array();
    this.model.data.game.chips.forEach((item: any) => {
      if (map[item.type] === undefined) {
        map[item.type] = { name: item.type.toUpperCase(), values: [] };
        provider.push(map[item.type]);
      }
      map[item.type].values.push(item);
    });
    this.provider = provider;
  }
}
