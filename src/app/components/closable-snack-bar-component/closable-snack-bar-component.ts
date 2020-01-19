import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { AbstractComponent } from 'src/app/fwk/abstract-component';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { AbstractAppComponent } from 'src/app/common/abstract-app-component';

@Component({
  selector: "ngForItem",
  templateUrl: './closable-snack-bar-component.html',
  styleUrls: ['./closable-snack-bar-component.css']
})
export class ClosableSnackBarComponent extends AbstractAppComponent {

  constructor(
    protected _helper: AppHelperObject,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private _snackBarRef: MatSnackBarRef<ClosableSnackBarComponent>) {
    super(_helper);
  }

  close(): void {
    this._snackBarRef.dismiss();
  }
}
