import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { Injectable } from '@angular/core';

@Injectable()
export class VersionsModel extends AbstractAppModel {

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    onInit(): void {
        super.onInit();
        this.getCache().getItem("searchByVersionsFilterValue", "").subscribe((value: string) => {
            this.data.filterValue = value;
        });
        this.getCache().getItem("searchByVersionsPageIndex", 0).subscribe((value: number) => {
            this.data.pageIndex = value;
        });
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getMsdbProvider().getVersions().subscribe((data: any) => {
            this.getMsdbProvider().getMameInfos().subscribe((infos: any) => {
                data.forEach((element: any) => {
                    Object.assign(element, infos.history[element.label]);
                });
                this.data.provider = data;
                callback();
            });
        });
    }

    onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("searchByVersionsFilterValue", this.data.filterValue, "version");
        this.getCache().setItem("searchByVersionsPageIndex", this.data.pageIndex, "version");
    }

    protected _getInitData(): any {
        return {
            filterValue: "",
            pageIndex: 0,
            provider: []
        };
    }
}