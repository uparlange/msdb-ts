import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class MyGamesModel extends AbstractAppModel {

    _needRefresh: boolean = true;
    _configChangedSubscription: Subscription = null;
    _changeInRomsDirectorySubscription: Subscription = null;
    _viewActive: boolean = false;

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
    }

    onInit(): void {
        super.onInit();
        this._viewActive = true;
        if (this._configChangedSubscription == null) {
            this._configChangedSubscription = this.getEventBus().on("CONFIG_CHANGED").subscribe(() => {
                this._needRefresh = true;
                this._refreshList();
            });
        }
        this.getCache().getItem("myGamesFilterValue", "").subscribe((value: string) => {
            this.data.filterValue = value;
        });
        if (this._changeInRomsDirectorySubscription == null) {
            this._changeInRomsDirectorySubscription = this.getSocket().on("CHANGE_IN_ROMS_DIRECTORY").subscribe(() => {
                this._needRefresh = true;
                this._refreshList();
            });
        }
        this._refreshList();
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this._refreshList(callback);
    }

    onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("myGamesFilterValue", this.data.filterValue, "version");
        this._viewActive = false;
    }

    _refreshList(callback?: Function) {
        if (this._viewActive && this._needRefresh) {
            this._needRefresh = false;
            this.getSocket().emit("GET_MY_GAMES", null).subscribe((result: any) => {
                if (Array.isArray(result)) {
                    this.getProvider().search("name", result).subscribe((data: any) => {
                        if (Array.isArray(data)) {
                            data.sort((x, y) => {
                                if (x.isbios < y.isbios) return -1;
                                if (x.isbios > y.isbios) return 1;
                                return 0;
                            });
                        }
                        this.data.list.data = data || [];
                        if (callback) {
                            callback();
                        }
                    });
                } else {
                    if (callback) {
                        callback();
                    }
                }
            });
        }
    }

    _getInitData(): any {
        return {
            filterValue: "",
            provider: []
        };
    }
}