import { Injectable } from '@angular/core';
import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { Subscription } from 'rxjs';

@Injectable()
export class UpdateModel extends AbstractAppModel {

    private _updatedVersionChangedSubscription: Subscription = null;
    private _downloadProgressSubscription: Subscription = null;

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    onInit(): void {
        super.onInit();
        this._updatedVersionChangedSubscription = this.getNw().on("updatedVersionChanged").subscribe(() => {
            this._updateVersion();
        });
        this._downloadProgressSubscription = this.getNw().on("downloadProgress").subscribe((event: any) => {
            
        });
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.data.currentVersion = this.getNw().getCurrentVersion();
        this._updateVersion();
        callback();
    }

    onDestroy(): void {
        super.onDestroy();
        this._updatedVersionChangedSubscription.unsubscribe();
        this._downloadProgressSubscription.unsubscribe();
    }

    update(): void {
        this.getNw().update();
    }

    private _updateVersion(): void {
        const version = this.getNw().getUpdatedVersion();
        if (version != null) {
            this.data.updatedVersion = version;
        }
    }

    protected _getInitData(): any {
        return {
            currentVersion: null,
            updatedVersion: {
                installers: []
            }
        };
    }
}