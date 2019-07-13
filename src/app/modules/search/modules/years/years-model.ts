import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { Injectable } from '@angular/core';

@Injectable()
export class YearsModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
    }

    onInit(): void {
        super.onInit();
        this.getCache().getItem("searchByYearsFilterValue", "").subscribe((value: string) => {
            this.data.filterValue = value;
        });
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getProvider().getYears().subscribe((data: any) => {
            this.data.provider = data;
            callback();
        });
    }

    onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("searchByYearsFilterValue", this.data.filterValue, "version");
    }

    _getInitData(): any {
        return {
            filterValue: "",
            provider: []
        };
    }
}