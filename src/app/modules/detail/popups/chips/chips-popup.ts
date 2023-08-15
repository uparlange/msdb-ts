import { DetailModel } from '../../detail-model';
import { Component } from '@angular/core';
import { AbstractAppPopup } from '../../../../common/abstract-app-popup';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';

@Component({
  templateUrl: './chips-popup.html',
  styleUrls: ['./chips-popup.css']
})
export class ChipsPopup extends AbstractAppPopup {

  provider = new Array();

  constructor(
    protected override _helper: AppHelperObject,
    public override model: DetailModel) {
    super(_helper, model);
  }

  override onInit(): void {
    super.onInit();
    const map = new Map<String, any>();
    const list = new Array();
    this.model.data.game.chips.forEach((item: any) => {
      if (map.get(item.type) === undefined) {
        map.set(item.type, { name: item.type.toUpperCase(), values: [] });
        list.push(map.get(item.type));
      }
      map.get(item.type).values.push(item);
    });
    this.provider = list;
  }

  getFrequencyLabel(value: number): string {
    return this._getHelper().getConfigProvider().getFrequencyLabel(value);
  }
}
