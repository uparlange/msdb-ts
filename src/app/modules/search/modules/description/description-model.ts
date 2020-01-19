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
            value: "",
            shortcuts: [
                { index: 0, key: "L10N_SEARCH_BY_BIOS", type: "bios" },
                { index: 1, key: "L10N_SEARCH_BY_DEVICE", type: "device" },
                { index: 2, key: "L10N_SEARCH_BY_MECHANICAL", type: "mechanical" },
                { index: 3, key: "L10N_SEARCH_BY_MESS", type: "mess" },
                { index: 4, key: "L10N_SEARCH_BY_ADULT", type: "adult" }
            ]
        };
    }
}
