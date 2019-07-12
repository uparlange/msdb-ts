import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Injectable()
export class HistoryModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
    }

    onInit(): void {
        super.onInit();
        this.getHistory().getList().subscribe((list) => {
            this.data.list.data = list;
        });
    }

    _getInitData(): any {
        return {
            list: new MatTableDataSource(),
            displayedColumns: ["icon", "label"]
        };
    }

}