import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { MatTableDataSource } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class RatingsModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getProvider().getRatings().subscribe((data: any) => {
            this.data.list.data = data;
            callback();
        });
    }

    _getInitData(): any {
        return {
            list: new MatTableDataSource(),
            displayedColumns: ["label"]
        };
    }

}