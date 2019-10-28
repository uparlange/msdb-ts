import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { Injectable } from '@angular/core';
import { MsdbProvider } from 'src/app/common/providers/msdb-provider';

@Injectable()
export class DescriptionModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
    }

    onInit(): void {
        super.onInit();
        this.getCache().getItem("searchByDescriptionValue", "").subscribe((value: string) => {
            this.data.value = value;
        });
    }

    onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("searchByDescriptionValue", this.data.value, "version");
    }

    _getInitData(): any {
        return {
            value: ""
        };
    }
}
