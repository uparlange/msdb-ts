import { AbstractAppModel } from '../../../../common/abstract-app-model';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';
import { Injectable } from '@angular/core';

@Injectable()
export class VersionsModel extends AbstractAppModel {

    constructor(
        protected override _helper: AppHelperObject) {
        super(_helper);
    }

    override onInit(): void {
        super.onInit();
        this.getCache().getItem("searchByVersionsFilterValue", "").subscribe((value: string) => {
            this.data.filterValue = value;
        });
        this.getCache().getItem("searchByVersionsPageIndex", 0).subscribe((value: number) => {
            this.data.pageIndex = value;
        });
    }

    override onRefresh(callback: Function): void {
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

    override onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("searchByVersionsFilterValue", this.data.filterValue, "version");
        this.getCache().setItem("searchByVersionsPageIndex", this.data.pageIndex, "version");
    }

    protected override _getInitData(): any {
        return {
            filterValue: "",
            pageIndex: 0,
            provider: []
        };
    }
}