import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Injectable()
export class LanguagesModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getProvider().getLanguages().subscribe((data: any) => {
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