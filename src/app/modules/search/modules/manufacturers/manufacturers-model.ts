import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class ManufacturersModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
    }

    onInit(): void {
        super.onInit();
        this.getCache().getItem("searchByManufacturerFilterValue", "").subscribe((value: string) => {
            this._setFilterValue(value);
        });
    }

    onRefresh(callback: Function): void {
        this.getProvider().getManufacturers().subscribe((data: any) => {
            this.data.list.data = data;
            callback();
        });
    }

    onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("searchByManufacturerFilterValue", this.data.filterValue, "version");
        this.data.list.paginator = null;
    }

    applyFilter(value: string): void {
        this._setFilterValue(value);
    }

    clearFilter(): void {
        this._setFilterValue("");
    }

    setPaginator(paginator: MatPaginator): void {
        this.data.list.paginator = paginator;
    }

    pageChanged(event: any): void {
        this.data.pageIndex = event.pageIndex;
    }

    _setFilterValue(value: string) {
        this.data.filterValue = value;
        this.data.list.filter = value;
    }

    _getInitData(): any {
        return {
            list: new MatTableDataSource(),
            filterValue: "",
            displayedColumns: ["label"],
            pageIndex: 0
        };
    }
}