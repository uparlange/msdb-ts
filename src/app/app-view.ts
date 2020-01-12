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
import { AppEvents } from './app-events';
import { ClosableSnackBarComponent } from './components/closable-snack-bar-component/closable-snack-bar-component';

@Component({
  selector: 'body',
  templateUrl: './app-view.html',
  styleUrls: ['./app-view.css']
})
export class AppView extends AbstractAppView {

  @HostBinding("attr.mat-version") matVersion: string = VERSION.full;
  @HostBinding("attr.app-version") appVersion: string = pkg.version;
  @HostBinding("style.background-image") backgroundImage: any = null;

  constructor(
    protected _helper: AppHelperObject,
    public model: AppModel,
    private _shell: AppShell,
    private _viewContainerRef: ViewContainerRef,
    private _matSnackBar: MatSnackBar,
    private _domSanitizer: DomSanitizer) {
    super(_helper, model);
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

  getLogoUrl(): string {
    return environment.assetsFolder + "/logo.png";
  }

  private _initToaster(): void {
    this._initToasterConnectionChange();
    this.getEventBus().on(AppEvents.DISPLAY_TOASTER_MESSAGE).subscribe((event: any) => {
      this._showToast(event.message, event.duration);
    });
  }

  private _initToasterConnectionChange(): void {
    this.getConnection().on("change").subscribe((online: boolean) => {
      const key = online ? "L10_CONNECTED" : "L10_NO_CONNECTION";
      this.getLabels().getValues([key]).subscribe((translations: any) => {
        this._showToast(translations[key], 2000);
      });
    });
  }

  private _showToast(message: string, duration: number): void {
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.viewContainerRef = this._viewContainerRef;
    config.data = { message: message };
    this._matSnackBar.openFromComponent(ClosableSnackBarComponent, config);
  }

}
