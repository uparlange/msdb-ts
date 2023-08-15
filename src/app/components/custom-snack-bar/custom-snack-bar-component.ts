import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { AppHelperObject } from '../../common/providers/app-helper-object';
import { AbstractAppComponent } from '../../common/abstract-app-component';
import { Component, Inject } from '@angular/core';

@Component({
  selector: "ngForItem",
  templateUrl: './custom-snack-bar-component.html',
  styleUrls: ['./custom-snack-bar-component.css']
})
export class CustomSnackBarComponent extends AbstractAppComponent {

  constructor(
    protected override _helper: AppHelperObject,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private _snackBarRef: MatSnackBarRef<CustomSnackBarComponent>) {
    super(_helper);
  }

  close(): void {
    this._snackBarRef.dismiss();
  }
}
