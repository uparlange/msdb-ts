import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppClassHelper } from 'src/app/common/app-class-helper';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { Injectable } from '@angular/core';

@Injectable()
export class DescriptionModel extends AbstractAppModel {

    constructor(appClassHelper: AppClassHelper, msdbProvider: MsdbProvider) {
        super(appClassHelper, msdbProvider);
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
