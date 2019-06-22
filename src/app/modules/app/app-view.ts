import { Component } from '@angular/core';
import { AppModel } from './app-model';
import { AppShell } from 'src/app/common/app-shell';
import { AppClassHelper } from 'src/app/common/app-class-helper';
import { AbstractAppView } from 'src/app/common/abstract-app-view';

@Component({
  selector: 'app-view',
  templateUrl: './app-view.html',
  styleUrls: ['./app-view.css']
})
export class AppView extends AbstractAppView {

  _shell: AppShell = null;

  constructor(appClassHelper: AppClassHelper, appModel: AppModel, shell: AppShell) {
    super(appClassHelper, appModel);
    this._shell = shell;
  }

  onInit(): void {
    super.onInit();
    this._shell.init();
  }

}
