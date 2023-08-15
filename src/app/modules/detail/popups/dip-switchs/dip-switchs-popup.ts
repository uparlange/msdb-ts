import { DetailModel } from '../../detail-model';
import { Component } from '@angular/core';
import { AbstractAppPopup } from '../../../../common/abstract-app-popup';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';

@Component({
  templateUrl: './dip-switchs-popup.html',
  styleUrls: ['./dip-switchs-popup.css']
})
export class DipSwitchsPopup extends AbstractAppPopup {

  provider: Array<any> = new Array();

  constructor(
    protected override _helper: AppHelperObject,
    public override model: DetailModel) {
    super(_helper, model);
  }

  override onInit(): void {
    super.onInit();
    const map = new Map<String, any>();
    const list: Array<any> = new Array();
    this.model.data.game.dipswitchs.forEach((item: any) => {
      if (map.get(item.tag) === undefined) {
        map.set(item.tag, { name: item.tag, switchs: [] });
        list.push(map.get(item.tag));
      }
      map.get(item.tag).switchs.push(item);
    });
    this.provider = list;
  }
}
