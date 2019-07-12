import { DetailModel } from '../../detail-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { Component } from '@angular/core';
import { AbstractAppPopup } from 'src/app/common/abstract-app-popup';

@Component({
  selector: 'dip-switchs-popup',
  templateUrl: './dip-switchs-popup.html',
  styleUrls: ['./dip-switchs-popup.css']
})
export class DipSwitchsPopup extends AbstractAppPopup {

  provider: Array<any> = null;

  constructor(appHelperObject: AppHelperObject, detailModel: DetailModel) {
    super(appHelperObject, detailModel);
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
