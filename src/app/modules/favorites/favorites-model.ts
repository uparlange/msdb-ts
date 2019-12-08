import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Injectable()
export class FavoritesModel extends AbstractAppModel {

    private _favoritesChangeSubscription: Subscription = null;

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    onInit(): void {
        super.onInit();
        if (this._favoritesChangeSubscription == null) {
            this._favoritesChangeSubscription = this.getFavorites().on("change").subscribe(() => {
                this.needRefresh = true;
            });
        }
        this.getCache().getItem("favoritesFilterValue", "").subscribe((value: string) => {
            this.data.filterValue = value;
        });
        this.getCache().getItem("favoritesPageIndex", 0).subscribe((value: number) => {
            this.data.pageIndex = value;
        });
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.data.provider = [];
        this.getFavorites().getList().subscribe((list: Array<string>) => {
            this.getMsdbProvider().search("name", list).subscribe((data: any) => {
                this.data.provider = data || [];
                if (callback) {
                    callback();
                }
            });
        });
    }

    onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("favoritesFilterValue", this.data.filterValue, "version");
        this.getCache().setItem("favoritesPageIndex", this.data.pageIndex, "version");
    }

    protected _getInitData(): any {
        return {
            filterValue: "",
            pageIndex: 0,
            provider: []
        };
    }
}