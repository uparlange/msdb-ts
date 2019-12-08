import { AbstractComponent } from './abstract-component';
import { AbstractHelperObject } from './abstract-helper-object';
import { AbstractModel } from './abstract-model';
import { Subscription } from 'rxjs';

export class AbstractView extends AbstractComponent {

    model: AbstractModel = null;

    private _queryParamsSubscription: Subscription = null;

    constructor(AbstractHelperObject: AbstractHelperObject, model: AbstractModel) {
        super(AbstractHelperObject);
        this.model = model;
    }

    ngOnInit() {
        super.ngOnInit();
        this._queryParamsSubscription = this._helper.getActivatedRoute().queryParams.subscribe((params) => {
            this.model.init(params);
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.model.destroy();
        this.model = null;
        this._queryParamsSubscription.unsubscribe();
    }
}
