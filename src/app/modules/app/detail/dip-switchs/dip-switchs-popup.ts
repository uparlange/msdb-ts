import { DetailModel } from '../detail-model';
import { AppClassHelper } from 'src/app/common/app-class-helper';
import { AbstractPopup } from 'src/app/fwk/abstract-popup';
import { Component } from '@angular/core';

@Component({
  selector: 'dip-switchs-popup',
  templateUrl: './dip-switchs-popup.html',
  styleUrls: ['./dip-switchs-popup.css']
})
export class DipSwitchsPopup extends AbstractPopup {

  provider: Array<any> = null;

  constructor(appClassHelper: AppClassHelper, detailModel: DetailModel) {
    super(appClassHelper, detailModel);
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
