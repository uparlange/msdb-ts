import { HomeModel } from './home-model';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { AbstractAppView } from 'src/app/common/abstract-app-view';

@Component({
  templateUrl: './home-view.html',
  styleUrls: ['./home-view.css']
})
export class HomeView extends AbstractAppView {

  constructor(appHelperObject: AppHelperObject, homeModel: HomeModel) {
    super(appHelperObject, homeModel);
  }
}
