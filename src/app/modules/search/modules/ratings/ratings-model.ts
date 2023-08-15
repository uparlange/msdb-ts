import { AbstractAppModel } from '../../../../common/abstract-app-model';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';
import { Injectable } from '@angular/core';

@Injectable()
export class RatingsModel extends AbstractAppModel {

    constructor(
        protected override _helper: AppHelperObject) {
        super(_helper);
    }

    override onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getMsdbProvider().getRatings().subscribe((data: any) => {
            this.data.provider = data;
            callback();
        });
    }

    getRatingValue(index: number): number {
        return this.data.ratingSize - index * 0.5;
    }

    protected override _getInitData(): any {
        return {
            filterValue: "",
            ratingSize: 5,
            provider: []
        };
    }

}