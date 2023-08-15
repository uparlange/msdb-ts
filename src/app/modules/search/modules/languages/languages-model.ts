import { AbstractAppModel } from '../../../../common/abstract-app-model';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';
import { Injectable } from '@angular/core';

@Injectable()
export class LanguagesModel extends AbstractAppModel {

    constructor(
        protected override _helper: AppHelperObject) {
        super(_helper);
    }

    override onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getMsdbProvider().getLanguages().subscribe((data: any) => {
            this.data.provider = data;
            callback();
        });
    }

    protected override _getInitData(): any {
        return {
            filterValue: "",
            provider: []
        };
    }
}