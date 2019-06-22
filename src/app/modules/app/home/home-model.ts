import { Injectable } from '@angular/core';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppClassHelper } from 'src/app/common/app-class-helper';

@Injectable()
export class HomeModel extends AbstractAppModel {

    constructor(appClassHelper: AppClassHelper, msdbProvider: MsdbProvider) {
        super(appClassHelper, msdbProvider);
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
            this.getProvider().getMameInfos().subscribe((data: any) => {
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
