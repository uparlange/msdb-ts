import { Injectable } from '@angular/core';
import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Injectable()
export class HomeModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    onInit() {
        super.onInit();
        this.getCache().getItem("searchLastType", "description").subscribe((value: string) => {
            this.data.searchLastType = value;
        });
    }

    onRefresh(callback: Function) {
        super.onRefresh(callback);
        if (this.data.mame.build === null) {
            this.getMsdbProvider().getMameInfos().subscribe((data: any) => {
                if (data !== null) {
                    data.version = data.build.substr(0, data.build.indexOf("(")).trim();
                    this.data.mame = data;
                }
                callback();
            });
        }
    }

    _getInitData() {
        return {
            searchLastType: null,
            mame: {
                build: null
            }
        };
    }
}
