import { AbstractManager } from '../abstract-manager';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class PopupManager extends AbstractManager {

  private _matDialogRef: MatDialogRef<any, any> = null;
  private _matDialogRefAfterOpenedSubscription: Subscription = null;
  private _matDialogRefBeforeCloseSubscription: Subscription = null;
  private _matDialogRefAfterClosedSubscription: Subscription = null;

  constructor() {
    super();
  }

  init() {
    super.init();
  }

  open(matDialog: MatDialog, clazz: any, config: any) {
    this._matDialogRef = matDialog.open(clazz, config);
    this._matDialogRefAfterOpenedSubscription = this._matDialogRef.afterOpened().subscribe(() => {
      this.emit("afterOpen");
    });
    this._matDialogRefBeforeCloseSubscription = this._matDialogRef.beforeClosed().subscribe(() => {
      this.emit("beforeClose");
    });
    this._matDialogRefAfterClosedSubscription = this._matDialogRef.afterClosed().subscribe(() => {
      this._matDialogRefAfterOpenedSubscription.unsubscribe();
      this._matDialogRefBeforeCloseSubscription.unsubscribe();
      this._matDialogRefAfterClosedSubscription.unsubscribe();
      this._matDialogRef = null;
    });
  }

  closeActive() {
    if (this._matDialogRef != null) {
      this._matDialogRef.close();
    }
  }
}
