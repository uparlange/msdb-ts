import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { MsdbProvider } from 'src/app/common/msdb-provider';

@Injectable()
export class AppModel extends AbstractAppModel {

    _cacheChangeSubscription: Subscription = null;

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
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
    }

    onDestroy() {
        super.onDestroy();
        this._cacheChangeSubscription.unsubscribe();
    }

    _getInitData() {
        return {
            searchLastType: null
        };
    }

}
