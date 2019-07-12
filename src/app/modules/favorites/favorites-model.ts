import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Injectable()
export class FavoritesModel extends AbstractAppModel {

    _needRefresh: boolean = true;
    _favoritesChangeSubscription: Subscription = null;

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
    }

    onInit(): void {
        super.onInit();
        if (this._favoritesChangeSubscription == null) {
            this._favoritesChangeSubscription = this.getFavorites().on("change").subscribe(() => {
                this._needRefresh = true;
            });
        }
        this.getCache().getItem("favoritesFilterValue", "").subscribe((value: string) => {
            this._setFilterValue(value);
        });
        if (this._needRefresh) {
            this._refreshList();
        }
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this._refreshList(callback);
    }

    onDestroy(): void {
        super.onDestroy();
        this.getCache().setItem("favoritesFilterValue", this.data.filterValue, "version");
        this.data.list.paginator = null;
    }

    applyFilter(value: string): void {
        this._setFilterValue(value);
    }

    clearFilter(): void {
        this._setFilterValue("");
    }

    setPaginator(paginator: MatPaginator): void {
        this.data.list.paginator = paginator;
    }

    pageChanged(event: any): void {
        this.data.pageIndex = event.pageIndex;
    }

    _setFilterValue(value: string): void {
        this.data.filterValue = value;
        this.data.list.filter = value;
    }

    _refreshList(callback?: Function): void {
        this._needRefresh = false;
        this.data.list.data = [];
        this.getFavorites().getList().subscribe((list: Array<string>) => {
            this.getProvider().search("name", list).subscribe((data: any) => {
                this.data.list.data = data || [];
                if (callback) {
                    callback();
                }
            });
        })
    }

    _getInitData(): any {
        return {
            list: new MatTableDataSource(),
            filterValue: "",
            displayedColumns: ["icon", "description"],
            pageIndex: 0
        };
    }
}