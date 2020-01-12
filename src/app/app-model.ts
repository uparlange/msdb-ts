import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppEvents } from './app-events';
import { AppHelperObject } from './common/providers/app-helper-object';

@Injectable()
export class AppModel extends AbstractAppModel {

    private _cacheChangeSubscription: Subscription = null;
    private _setBackgroundClassSubscription: Subscription = null;

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    onInit(): void {
        super.onInit();
        this.getCache().getItem("searchLastType", "description").subscribe((value: string) => {
            this.data.searchLastType = value;
        });
        this._cacheChangeSubscription = this.getCache().on("change").subscribe((event: any) => {
            if (event.key === "searchLastType") {
                this.data.searchLastType = event.newValue;
            }
        });
        this.data.contentClass = null;
        this._setBackgroundClassSubscription = this.getEventBus().on(AppEvents.SET_BACKGROUND_CLASS).subscribe((className) => {
            this.data.contentClass = className;
        });
    }

    onDestroy(): void {
        super.onDestroy();
        this._cacheChangeSubscription.unsubscribe();
        this._setBackgroundClassSubscription.unsubscribe();
    }

    protected _getInitData(): any {
        return {
            searchLastType: null,
            contentClass: null
        };
    }

}
