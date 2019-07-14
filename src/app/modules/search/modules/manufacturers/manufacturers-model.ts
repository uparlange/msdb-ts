import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { Injectable } from '@angular/core';

@Injectable()
export class ManufacturersModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
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
        this.getProvider().getManufacturers().subscribe((data: any) => {
            this.data.provider = data;
            callback();
        });
    }

    onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("searchByManufacturerFilterValue", this.data.filterValue, "version");
        this.getCache().setItem("searchByManufacturerPageIndex", this.data.pageIndex, "version");
    }

    _getInitData(): any {
        return {
            filterValue: "",
            pageIndex: 0,
            provider: []
        };
    }
}