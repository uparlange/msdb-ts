import { AbstractComponent } from './abstract-component';
import { AbstractHelperObject } from './abstract-helper-object';
import { Subscription } from 'rxjs';
import { AbstractModel } from './abstract-model';

export class AbstractPopup extends AbstractComponent {

  model: AbstractModel = null;

  _popupsAfterOpenSubscription: Subscription = null;
  _popupsBeforeCloseSubscription: Subscription = null;

  constructor(AbstractHelperObject: AbstractHelperObject, model: AbstractModel) {
    super(AbstractHelperObject);
    this.model = model;
  }

  ngOnInit() {
    super.ngOnInit();
    this._popupsAfterOpenSubscription = this._helper.getPopups().on("afterOpen").subscribe(() => {
      this.afterOpen();
    });
    this._popupsBeforeCloseSubscription = this._helper.getPopups().on("beforeClose").subscribe(() => {
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
    this._helper.getPopups().closeActive();
  }
}
