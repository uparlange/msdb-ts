import { AbstractComponent } from './abstract-component';
import { AbstractClassHelper } from './abstract-class-helper';
import { Subscription } from 'rxjs';
import { AbstractModel } from './abstract-model';

export class AbstractPopup extends AbstractComponent {

  model: AbstractModel = null;

  _popupsAfterOpenSubscription: Subscription = null;
  _popupsBeforeCloseSubscription: Subscription = null;

  constructor(abstractClassHelper: AbstractClassHelper, model: AbstractModel) {
    super(abstractClassHelper);
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
