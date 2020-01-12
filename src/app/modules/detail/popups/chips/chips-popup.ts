import { DetailModel } from '../../detail-model';
import { Component } from '@angular/core';
import { AbstractAppPopup } from 'src/app/common/abstract-app-popup';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Component({
  templateUrl: './chips-popup.html',
  styleUrls: ['./chips-popup.css']
})
export class ChipsPopup extends AbstractAppPopup {

  provider: Array<any> = null;

  constructor(
    protected _helper: AppHelperObject, 
    public model: DetailModel) {
    super(_helper, model);
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

  getFrequencyLabel(value: number): string {
    return this._getHelper().getConfigProvider().getFrequencyLabel(value);
  }
}
