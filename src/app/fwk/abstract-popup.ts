import { AbstractComponent } from './abstract-component';
import { AbstractClassHelper } from './abstract-class-helper';
import { Subscription } from 'rxjs';
import { AbstractModel } from './abstract-model';

export class AbstractPopup extends AbstractComponent {

  model: AbstractModel = null;

  _popupsAfterOpenSubscriber: Subscription = null;
  _popupsBeforeCloseSubscriber: Subscription = null;

  constructor(abstractClassHelper: AbstractClassHelper, model: AbstractModel) {
    super(abstractClassHelper);
    this.model = model;
  }

  ngOnInit() {
    super.ngOnInit();
    this._popupsAfterOpenSubscriber = this._helper.getPopups().on("afterOpen").subscribe(() => {
      this.afterOpen();
    });
    this._popupsBeforeCloseSubscriber = this._helper.getPopups().on("beforeClose").subscribe(() => {
      this.beforeClose();
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this._popupsAfterOpenSubscriber.unsubscribe();
    this._popupsBeforeCloseSubscriber.unsubscribe();
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
