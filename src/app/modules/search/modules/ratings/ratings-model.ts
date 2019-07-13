import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { Injectable } from '@angular/core';

@Injectable()
export class RatingsModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getProvider().getRatings().subscribe((data: any) => {
            this.data.provider = data;
            callback();
        });
    }

    _getInitData(): any {
        return {
            filterValue: "",
            provider: []
        };
    }

}