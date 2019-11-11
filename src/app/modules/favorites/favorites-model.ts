import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Injectable()
export class FavoritesModel extends AbstractAppModel {

    _needRefresh: boolean = true;
    _favoritesChangeSubscription: Subscription = null;
    _viewActive: boolean = false;

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    onInit(): void {
        super.onInit();
        this._viewActive = true;
        if (this._favoritesChangeSubscription == null) {
            this._favoritesChangeSubscription = this.getFavorites().on("change").subscribe(() => {
                this._needRefresh = true;
                this._refreshList();
            });
        }
        this.getCache().getItem("favoritesFilterValue", "").subscribe((value: string) => {
            this.data.filterValue = value;
        });
        this.getCache().getItem("favoritesPageIndex", 0).subscribe((value: number) => {
            this.data.pageIndex = value;
        });
        this._refreshList();
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this._refreshList(callback);
    }

    onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("favoritesFilterValue", this.data.filterValue, "version");
        this.getCache().setItem("favoritesPageIndex", this.data.pageIndex, "version");
        this._viewActive = false;
    }

    _refreshList(callback?: Function): void {
        if (this._viewActive && this._needRefresh) {
            this._needRefresh = false;
            this.data.provider = [];
            this.getFavorites().getList().subscribe((list: Array<string>) => {
                this.getMsdbProvider().search("name", list).subscribe((data: any) => {
                    this.data.provider = data || [];
                    if (callback) {
                        callback();
                    }
                });
            })
        }
    }

    _getInitData(): any {
        return {
            filterValue: "",
            pageIndex: 0,
            provider: []
        };
    }
}