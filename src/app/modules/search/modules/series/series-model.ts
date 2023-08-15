import { AbstractAppModel } from '../../../../common/abstract-app-model';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';
import { Injectable } from '@angular/core';

@Injectable()
export class SeriesModel extends AbstractAppModel {

    constructor(
        protected override _helper: AppHelperObject) {
        super(_helper);
    }

    override onInit(): void {
        super.onInit();
        this.getCache().getItem("searchBySeriesFilterValue", "").subscribe((value: string) => {
            this.data.filterValue = value;
        });
        this.getCache().getItem("searchBySeriesPageIndex", 0).subscribe((value: number) => {
            this.data.pageIndex = value;
        });
    }

    override onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getMsdbProvider().getSeries().subscribe((data: any) => {
            this.data.provider = data;
            callback();
        });
    }

    override onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("searchBySeriesFilterValue", this.data.filterValue, "version");
        this.getCache().setItem("searchBySeriesPageIndex", this.data.pageIndex, "version");
    }

    protected override _getInitData(): any {
        return {
            filterValue: "",
            pageIndex: 0,
            provider: []
        };
    }
}