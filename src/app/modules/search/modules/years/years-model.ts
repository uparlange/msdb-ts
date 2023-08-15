import { AbstractAppModel } from '../../../../common/abstract-app-model';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';
import { Injectable } from '@angular/core';

@Injectable()
export class YearsModel extends AbstractAppModel {

    constructor(
        protected override _helper: AppHelperObject) {
        super(_helper);
    }

    override onInit(): void {
        super.onInit();
        this.getCache().getItem("searchByYearsFilterValue", "").subscribe((value: string) => {
            this.data.filterValue = value;
        });
    }

    override onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getMsdbProvider().getYears().subscribe((data: any) => {
            this.data.provider = data;
            callback();
        });
    }

    override onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("searchByYearsFilterValue", this.data.filterValue, "version");
    }

    protected override _getInitData(): any {
        return {
            filterValue: "",
            provider: []
        };
    }
}