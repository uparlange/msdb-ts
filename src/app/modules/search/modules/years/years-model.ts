import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { MatTableDataSource } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class YearsModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
    }

    onInit(): void {
        super.onInit();
        this.getCache().getItem("searchByYearsFilterValue", "").subscribe((value: string) => {
            this._setFilterValue(value);
        });
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getProvider().getYears().subscribe((data: any) => {
            this.data.list.data = data;
            callback();
        });
    }

    onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("searchByYearsFilterValue", this.data.filterValue, "version");
    }

    applyFilter(value: string): void {
        this._setFilterValue(value);
    }

    clearFilter(): void {
        this._setFilterValue("");
    }

    _setFilterValue(value: string): void {
        this.data.filterValue = value;
        this.data.list.filter = value;
    }

    _getInitData(): any {
        return {
            list: new MatTableDataSource(),
            filterValue: "",
            displayedColumns: ["label"]
        };
    }
}