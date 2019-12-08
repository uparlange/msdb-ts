import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppEvents } from 'src/app/app-events';

@Injectable()
export class MyGamesModel extends AbstractAppModel {

    private _configChangedSubscription: Subscription = null;
    private _changeInRomsDirectorySubscription: Subscription = null;

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    onInit(): void {
        super.onInit();
        if (this._configChangedSubscription == null) {
            this._configChangedSubscription = this.getEventBus().on(AppEvents.CONFIG_CHANGED).subscribe(() => {
                this.needRefresh = true;
            });
        }
        this.getCache().getItem("myGamesFilterValue", "").subscribe((value: string) => {
            this.data.filterValue = value;
        });
        this.getCache().getItem("myGamesPageIndex", 0).subscribe((value: number) => {
            this.data.pageIndex = value;
        });
        if (this._changeInRomsDirectorySubscription == null) {
            this._changeInRomsDirectorySubscription = this.getSocket().on("CHANGE_IN_ROMS_DIRECTORY").subscribe(() => {
                this.needRefresh = true;
            });
        }
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.data.provider = [];
        this.getSocket().emit("GET_MY_GAMES", null).subscribe((result: any) => {
            if (Array.isArray(result)) {
                this.getMsdbProvider().search("name", result).subscribe((data: any) => {
                    if (Array.isArray(data)) {
                        data.sort((x, y) => {
                            if (x.isbios < y.isbios) return -1;
                            if (x.isbios > y.isbios) return 1;
                            return 0;
                        });
                    }
                    this.data.provider = data || [];
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

    onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("myGamesFilterValue", this.data.filterValue, "version");
        this.getCache().setItem("myGamesPageIndex", this.data.pageIndex, "version");
    }

    protected _getInitData(): any {
        return {
            filterValue: "",
            pageIndex: 0,
            provider: []
        };
    }
}