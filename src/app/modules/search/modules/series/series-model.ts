import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { Injectable } from '@angular/core';

@Injectable()
export class SeriesModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
    }

    onInit(): void {
        super.onInit();
        this.getCache().getItem("searchBySeriesFilterValue", "").subscribe((value: string) => {
            this.data.filterValue = value;
        });
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getProvider().getSeries().subscribe((data: any) => {
            this.data.provider = data;
            callback();
        });
    }

    onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("searchBySeriesFilterValue", this.data.filterValue, "version");
    }

    _getInitData(): any {
        return {
            filterValue: "",
            provider: []
        };
    }
}