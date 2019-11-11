import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { Injectable } from '@angular/core';

@Injectable()
export class YearsModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    onInit(): void {
        super.onInit();
        this.getCache().getItem("searchByYearsFilterValue", "").subscribe((value: string) => {
            this.data.filterValue = value;
        });
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getMsdbProvider().getYears().subscribe((data: any) => {
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