import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { Injectable } from '@angular/core';
import { MsdbProvider } from 'src/app/common/providers/msdb-provider';

@Injectable()
export class LanguagesModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getProvider().getLanguages().subscribe((data: any) => {
            this.data.provider = data;
            callback();
        });
    }

    _getInitData(): any {
        return {
            filterValue: "",
            provider: []
        };
    }
}