import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { Injectable } from '@angular/core';

@Injectable()
export class DescriptionModel extends AbstractAppModel {

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
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

    protected _getInitData(): any {
        return {
            value: ""
        };
    }
}
