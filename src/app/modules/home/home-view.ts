import { HomeModel } from './home-model';
import { Component } from '@angular/core';
import { AbstractAppView } from '../../common/abstract-app-view';
import { AppHelperObject } from '../../common/providers/app-helper-object';

@Component({
  templateUrl: './home-view.html',
  styleUrls: ['./home-view.css']
})
export class HomeView extends AbstractAppView {

  constructor(
    protected override _helper: AppHelperObject, 
    public override model: HomeModel) {
    super(_helper, model);
  }
}
