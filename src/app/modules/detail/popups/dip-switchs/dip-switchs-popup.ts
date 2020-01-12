import { DetailModel } from '../../detail-model';
import { Component } from '@angular/core';
import { AbstractAppPopup } from 'src/app/common/abstract-app-popup';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Component({
  templateUrl: './dip-switchs-popup.html',
  styleUrls: ['./dip-switchs-popup.css']
})
export class DipSwitchsPopup extends AbstractAppPopup {

  provider: Array<any> = null;

  constructor(
    protected _helper: AppHelperObject, 
    public model: DetailModel) {
    super(_helper, model);
  }

  onInit(): void {
    super.onInit();
    const map = {};
    const provider = [];
    this.model.data.game.dipswitchs.forEach((item: any) => {
      if (map[item.tag] === undefined) {
        map[item.tag] = { name: item.tag, switchs: [] };
        provider.push(map[item.tag]);
      }
      map[item.tag].switchs.push(item);
    });
    this.provider = provider;
  }
}
