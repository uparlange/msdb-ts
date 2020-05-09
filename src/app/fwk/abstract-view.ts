import { AbstractComponent } from './abstract-component';
import { AbstractModel } from './abstract-model';
import { Subscription } from 'rxjs';
import { FwkHelperObject } from './providers/fwk-helper-object';
import { AbstractHelperObject } from './abstract-helper-object';
import { Component } from '@angular/core';

@Component({
    template: ""
  })
export class AbstractView extends AbstractComponent {

    private _queryParamsSubscription: Subscription = null;

    constructor(
        protected _helper: AbstractHelperObject,
        public model: AbstractModel) {
        super(_helper);
    }

    ngOnInit() {
        super.ngOnInit();
        this._queryParamsSubscription = this._getHelper().getActivatedRoute().queryParams.subscribe((params) => {
            this.model.init(params);
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.model.destroy();
        this.model = null;
        this._queryParamsSubscription.unsubscribe();
    }

    protected _getHelper(): FwkHelperObject {
        return <FwkHelperObject>this._helper;
    }
}
