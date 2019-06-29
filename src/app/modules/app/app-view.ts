import { Component, ViewContainerRef } from '@angular/core';
import { AppModel } from './app-model';
import { AppShell } from 'src/app/common/app-shell';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { VERSION } from '@angular/material/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import pkg from './../../../../package.json';

// TODO manager version
@Component({
  selector: 'app-view',
  host: {
    "mat-version": "?"
  },
  templateUrl: './app-view.html',
  styleUrls: ['./app-view.css']
})
export class AppView extends AbstractAppView {

  _shell: AppShell = null;
  _viewContainerRef: ViewContainerRef = null;
  _matSnackBar: MatSnackBar = null;

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

  _initNw(): void {
    this._initMenuBar();
    import("./app-nw").then((mod) => {
      new mod.AppNw().init();
    });
  }

  _showView(view: string): void {
    this.getRouter().navigate([view]);
  }

  _initMenuBar(): void {
    this.getLabels().on("languageChange").subscribe(() => {
      this.getLabels().getValues(["L10N_QUIT", "L10N_FILE", "L10N_MY_GAMES", "L10N_CONFIGURATION", "L10N_DISPLAY"]).subscribe((translations) => {
        const menu = new window.nw.Menu({ type: "menubar" });
        const fileSubMenu = new window.nw.Menu();
        fileSubMenu.append(new window.nw.MenuItem({
          label: translations.L10N_QUIT,
          click: () => {
            window.nw.App.quit();
          }
        }));
        menu.append(new window.nw.MenuItem({
          label: translations.L10N_FILE,
          submenu: fileSubMenu
        }));
        const displaySubMenu = new window.nw.Menu();
        displaySubMenu.append(new window.nw.MenuItem({
          label: translations.L10N_MY_GAMES,
          click: () => {
            this._showView("/mygames");
          }
        }));
        displaySubMenu.append(new window.nw.MenuItem({
          label: translations.L10N_CONFIGURATION,
          click: () => {
            this._showView("/config");
          }
        }));
        menu.append(new window.nw.MenuItem({
          label: translations.L10N_DISPLAY,
          submenu: displaySubMenu
        }));
        const infoSubMenu = new window.nw.Menu();
        infoSubMenu.append(new window.nw.MenuItem({
          label: `v${pkg.version}`
        }));
        menu.append(new window.nw.MenuItem({
          label: "?",
          submenu: infoSubMenu
        }));
        window.nw.Window.get().menu = menu;
      });
    });
  }

  _initToaster() {
    this.getConnection().on("change").subscribe((online) => {
      const config = new MatSnackBarConfig();
      config.duration = 1500;
      config.viewContainerRef = this._viewContainerRef;
      const key = online ? "L10_CONNECTED" : "L10_NO_CONNECTION";
      this.getLabels().getValues([key]).subscribe((translations) => {
        this._matSnackBar.open(translations[key], null, config);
      });
    });
  }

}
