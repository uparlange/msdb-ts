import { AbstractComponent } from './abstract-component';
import { Subscription } from 'rxjs';
import { AbstractModel } from './abstract-model';
import { AbstractHelperObject } from './abstract-helper-object';
import { FwkHelperObject } from './providers/fwk-helper-object';
import { Component } from '@angular/core';

@Component({
  template: ""
})
export class AbstractPopup extends AbstractComponent {

  private _popupsAfterOpenSubscription: Subscription = null;
  private _popupsBeforeCloseSubscription: Subscription = null;

  constructor(
    protected _helper: AbstractHelperObject,
    public model: AbstractModel) {
    super(_helper);
  }

  ngOnInit() {
    super.ngOnInit();
    this._popupsAfterOpenSubscription = this._getHelper().getPopups().on("afterOpen").subscribe(() => {
      this.afterOpen();
    });
    this._popupsBeforeCloseSubscription = this._getHelper().getPopups().on("beforeClose").subscribe(() => {
      this.beforeClose();
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this._popupsAfterOpenSubscription.unsubscribe();
    this._popupsBeforeCloseSubscription.unsubscribe();
    this.model = null;
  }

  afterOpen(): void {
    // need override
  }

  beforeClose(): void {
    // need override
  }

  close() {
    this._getHelper().getPopups().closeActive();
  }

  protected _getHelper(): FwkHelperObject {
    return <FwkHelperObject>this._helper;
  }
}
