import { HomeModel } from './home-model';
import { Component } from '@angular/core';
import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Component({
  templateUrl: './home-view.html',
  styleUrls: ['./home-view.css']
})
export class HomeView extends AbstractAppView {

  constructor(appHelperObject: AppHelperObject, homeModel: HomeModel) {
    super(appHelperObject, homeModel);
  }
}
