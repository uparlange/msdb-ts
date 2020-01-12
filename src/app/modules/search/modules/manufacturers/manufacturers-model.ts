import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { Injectable } from '@angular/core';

@Injectable()
export class ManufacturersModel extends AbstractAppModel {

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    onInit(): void {
        super.onInit();
        this.getCache().getItem("searchByManufacturerFilterValue", "").subscribe((value: string) => {
            this.data.filterValue = value;
        });
        this.getCache().getItem("searchByManufacturerPageIndex", 0).subscribe((value: number) => {
            this.data.pageIndex = value;
        });
    }

    onRefresh(callback: Function): void {
        this.getMsdbProvider().getManufacturers().subscribe((data: any) => {
            this.data.provider = data;
            callback();
        });
    }

    onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("searchByManufacturerFilterValue", this.data.filterValue, "version");
        this.getCache().setItem("searchByManufacturerPageIndex", this.data.pageIndex, "version");
    }

    protected _getInitData(): any {
        return {
            filterValue: "",
            pageIndex: 0,
            provider: []
        };
    }
}