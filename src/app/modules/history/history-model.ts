import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { Injectable } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Injectable()
export class HistoryModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    onInit(): void {
        super.onInit();
        this.getHistory().getList().subscribe((list: any) => {
            this.data.provider = list;
        });
    }

    _getInitData(): any {
        return {
            filterValue: "",
            provider: []
        };
    }

}