import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { Injectable } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Injectable()
export class HistoryModel extends AbstractAppModel {

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    onInit(): void {
        super.onInit();
        this.getHistory().getList().subscribe((list: any) => {
            this.data.provider = list;
        });
    }

    protected _getInitData(): any {
        return {
            filterValue: "",
            provider: []
        };
    }

}