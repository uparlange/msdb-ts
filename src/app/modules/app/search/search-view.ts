import { AppHelperObject } from 'src/app/common/app-helper-object';
import { SearchModel } from './search-model';
import { Component } from '@angular/core';
import { AbstractAppView } from 'src/app/common/abstract-app-view';

@Component({
    templateUrl: './search-view.html',
    styleUrls: ['./search-view.css']
})
export class SearchView extends AbstractAppView {

    constructor(appHelperObject: AppHelperObject, searchModel: SearchModel) {
        super(appHelperObject, searchModel);
    }

    tabChanged(event: any): void {
        this._getModel().tabChanged(event);
        const url = `/search/${this._getModel().getTabsInfo().byIndex(event.index).type}`;
        this.getRouter().navigate([url]);
    }

    getSearchTabLabel(index: number): any {
        return this._getModel().getSearchTabLabel(index);
    }

    getTabsInfo(): any {
        return this._getModel().getTabsInfo();
    }

    trackByKey(index: number, item: any): any {
        return item ? item.key : undefined;
    }

    _getModel(): SearchModel {
        return <SearchModel>this.model;
    }
}
