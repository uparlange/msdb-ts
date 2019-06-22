import { AbstractComponent } from './abstract-component';
import { AbstractClassHelper } from './abstract-class-helper';
import { AbstractModel } from './abstract-model';
import { Subscription } from 'rxjs';

export class AbstractView extends AbstractComponent {

    model: AbstractModel = null;

    _queryParamsSubscription: Subscription = null;

    constructor(abstractClassHelper: AbstractClassHelper, model: AbstractModel) {
        super(abstractClassHelper);
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
