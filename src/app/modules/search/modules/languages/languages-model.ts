import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { Injectable } from '@angular/core';

@Injectable()
export class LanguagesModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getMsdbProvider().getLanguages().subscribe((data: any) => {
            this.data.provider = data;
            callback();
        });
    }

    protected _getInitData(): any {
        return {
            filterValue: "",
            provider: []
        };
    }
}