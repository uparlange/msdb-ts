import { AbstractAppModel } from '../../common/abstract-app-model';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppHelperObject } from '../../common/providers/app-helper-object';

@Injectable()
export class FavoritesModel extends AbstractAppModel {

    private _favoritesChangeSubscription!: Subscription;

    constructor(
        protected override _helper: AppHelperObject) {
        super(_helper);
    }

    override onInit(): void {
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

    override onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.data.provider = [];
        this.getFavorites().getList().subscribe((list: Array<string>) => {
            this.getMsdbProvider().search("name", list).subscribe((data: any) => {
                this.data.provider = data || [];
                callback();
            });
        });
    }

    override onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("favoritesFilterValue", this.data.filterValue, "version");
        this.getCache().setItem("favoritesPageIndex", this.data.pageIndex, "version");
    }

    protected override _getInitData(): any {
        return {
            filterValue: "",
            pageIndex: 0,
            provider: []
        };
    }
}