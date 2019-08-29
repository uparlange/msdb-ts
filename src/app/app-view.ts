import { Component, ViewContainerRef, HostBinding } from '@angular/core';
import { AppModel } from './app-model';
import { AppShell } from 'src/app/common/app-shell';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { MatSnackBar, MatSnackBarConfig, VERSION } from '@angular/material';
import pkg from './../../package.json';
import { AppNw } from './app-nw';


@Component({
  selector: 'app-view',
  templateUrl: './app-view.html',
  styleUrls: ['./app-view.css']
})
export class AppView extends AbstractAppView {

  @HostBinding("attr.mat-version") matVersion: String = VERSION.full;
  @HostBinding("attr.app-version") appVersion: String = pkg.version;

  _shell: AppShell = null;
  _viewContainerRef: ViewContainerRef = null;
  _matSnackBar: MatSnackBar = null;
  _appNw: AppNw = null;

  constructor(appHelperObject: AppHelperObject, appModel: AppModel, shell: AppShell, viewContainerRef: ViewContainerRef, matSnackBar: MatSnackBar,
  ) {
    super(appHelperObject, appModel);
    this._shell = shell;
    this._viewContainerRef = viewContainerRef;
    this._matSnackBar = matSnackBar;
  }

  onInit(): void {
    super.onInit();
    this._shell.init();
    this._initToaster();
    if (this.getConfigProvider().runInNw()) {
      this._initNw();
    }
  }

  showView(view: string): void {
    this.getRouter().navigate([view]);
  }

  _refreshMenuBar(): void {
    this.getLabels().getValues(["L10N_QUIT", "L10N_FILE", "L10N_MY_GAMES", "L10N_CONFIGURATION", "L10N_DISPLAY"]).subscribe((translations) => {
      this._appNw.refreshMenuBar(translations)
    });
  }

  _initNw(): void {
    import("./app-nw").then((mod) => {
      this._appNw = new mod.AppNw();
      this._appNw.init(this);
      this._refreshMenuBar();
      this.getLabels().on("languageChange").subscribe(() => {
        this._refreshMenuBar();
      });
    });
  }

  _initToaster() {
    this.getConnection().on("change").subscribe((online:boolean) => {
      const config = new MatSnackBarConfig();
      config.duration = 1500;
      config.viewContainerRef = this._viewContainerRef;
      const key = online ? "L10_CONNECTED" : "L10_NO_CONNECTION";
      this.getLabels().getValues([key]).subscribe((translations:any) => {
        this._matSnackBar.open(translations[key], null, config);
      });
    });
  }

}
