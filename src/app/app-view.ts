import { Component, ViewContainerRef, HostBinding } from '@angular/core';
import { AppModel } from './app-model';
import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import pkg from './../../package.json';
import { VERSION } from '@angular/material/core';
import { AppHelperObject } from './common/providers/app-helper-object';
import { AppShell } from './common/providers/app-shell';
import { environment } from './../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'body',
  templateUrl: './app-view.html',
  styleUrls: ['./app-view.css']
})
export class AppView extends AbstractAppView {

  @HostBinding("attr.mat-version") matVersion: string = VERSION.full;
  @HostBinding("attr.app-version") appVersion: string = pkg.version;
  @HostBinding("style.background-image") backgroundImage: any = null;

  private _shell: AppShell = null;
  private _viewContainerRef: ViewContainerRef = null;
  private _matSnackBar: MatSnackBar = null;
  private _domSanitizer: DomSanitizer = null;

  constructor(appHelperObject: AppHelperObject, appModel: AppModel, shell: AppShell, viewContainerRef: ViewContainerRef, matSnackBar: MatSnackBar,
    domSanitizer: DomSanitizer) {
    super(appHelperObject, appModel);
    this._shell = shell;
    this._viewContainerRef = viewContainerRef;
    this._matSnackBar = matSnackBar;
    this._domSanitizer = domSanitizer;
  }

  onInit(): void {
    super.onInit();
    this.backgroundImage = this._domSanitizer.bypassSecurityTrustStyle("url(" + environment.assetsFolder + "/background.jpg)");
    this._shell.init();
    this._initToaster();
  }

  showPreviousPage(): void {
    this.getRouter().back();
  }

  showView(view: string, extras?: NavigationExtras): void {
    this.getRouter().navigate([view], extras);
  }

  getLogoUrl() {
    return environment.assetsFolder + "/logo.png";
  }

  private _initToaster() {
    this.getConnection().on("change").subscribe((online: boolean) => {
      const key = online ? "L10_CONNECTED" : "L10_NO_CONNECTION";
      this.getLabels().getValues([key]).subscribe((translations: any) => {
        this._showToast(translations[key]);
      });
    });
  }

  private _showToast(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1500;
    config.viewContainerRef = this._viewContainerRef;
    this._matSnackBar.open(message, null, config);
  }

}
