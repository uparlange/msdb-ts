import { AbstractAppModel } from '../../common/abstract-app-model';
import { Injectable } from '@angular/core';
import { AppHelperObject } from '../../common/providers/app-helper-object';

@Injectable()
export class HistoryModel extends AbstractAppModel {

    constructor(
        protected override _helper: AppHelperObject) {
        super(_helper);
    }

    override onInit(): void {
        super.onInit();
        this.getHistory().getList().subscribe((list: any) => {
            this.data.provider = list;
        });
    }

    protected override _getInitData(): any {
        return {
            filterValue: "",
            provider: []
        };
    }

}