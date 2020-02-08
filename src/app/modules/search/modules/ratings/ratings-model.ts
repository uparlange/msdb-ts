import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { Injectable } from '@angular/core';

@Injectable()
export class RatingsModel extends AbstractAppModel {

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getMsdbProvider().getRatings().subscribe((data: any) => {
            this.data.provider = data;
            callback();
        });
    }

    getRatingValue(index: number): number {
        return this.data.ratingSize - index * 0.5;
    }

    protected _getInitData(): any {
        return {
            filterValue: "",
            ratingSize: 5,
            provider: []
        };
    }

}