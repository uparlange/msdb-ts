import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppEvents } from './app-events';
import { AppHelperObject } from './common/providers/app-helper-object';

@Injectable()
export class AppModel extends AbstractAppModel {

    _cacheChangeSubscription: Subscription = null;
    _setBackgroundClassSubscription: Subscription = null;

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
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

    onDestroy() {
        super.onDestroy();
        this._cacheChangeSubscription.unsubscribe();
        this._setBackgroundClassSubscription.unsubscribe();
    }

    _getInitData() {
        return {
            searchLastType: null,
            contentClass: null
        };
    }

}
