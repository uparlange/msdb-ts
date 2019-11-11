import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { Injectable } from '@angular/core';

@Injectable()
export class RatingsModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getMsdbProvider().getRatings().subscribe((data: any) => {
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