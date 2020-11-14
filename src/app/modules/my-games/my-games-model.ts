import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppEvents } from 'src/app/app-events';
import { AppSocketEvents } from 'src/app/app-socket-events';

@Injectable()
export class MyGamesModel extends AbstractAppModel {

    private _socketConfigChangedSubscription: Subscription = null;
    private _socketChangeInRomsDirectorySubscription: Subscription = null;

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    onInit(): void {
        super.onInit();
        if (this._socketConfigChangedSubscription == null) {
            this._socketConfigChangedSubscription = this.getEventBus().on(AppEvents.CONFIG_CHANGED).subscribe(() => {
                this.needRefresh = true;
                if (this.active) {
                    this._refreshMyGames();
                }
            });
        }
        if (this._socketChangeInRomsDirectorySubscription == null) {
            this._socketChangeInRomsDirectorySubscription = this.getSocket().on(AppSocketEvents.CHANGE_IN_ROMS_DIRECTORY).subscribe(() => {
                this.needRefresh = true;
                if (this.active) {
                    this._refreshMyGames();
                }
            });
        }
        this.getCache().getItem("myGamesFilterValue", "").subscribe((value: string) => {
            this.data.filterValue = value;
        });
        this.getCache().getItem("myGamesPageIndex", 0).subscribe((value: number) => {
            this.data.pageIndex = value;
        });
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this._refreshMyGames();
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

    private _refreshMyGames(): void {
        this.data.provider = [];
        this.getSocket().emit(AppSocketEvents.GET_MY_GAMES, null).subscribe((result: any) => {
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
                });
            }
        });
    }
}