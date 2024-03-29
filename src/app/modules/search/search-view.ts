import { AppHelperObject } from '../../common/providers/app-helper-object';
import { SearchModel } from './search-model';
import { Component } from '@angular/core';
import { AbstractAppView } from '../../common/abstract-app-view';

@Component({
    templateUrl: './search-view.html',
    styleUrls: ['./search-view.css']
})
export class SearchView extends AbstractAppView {

    constructor(
        protected override _helper: AppHelperObject,
        public override model: SearchModel) {
        super(_helper, model);
    }

    tabChanged(event: any): void {
        this._getModel().tabChanged(event);
        const url = `/search/${this.getTabsInfo().byIndex(event.index).type}`;
        this.getRouter().navigate([url]);
    }

    getSearchTabLabel(index: number): any {
        return this._getModel().getSearchTabLabel(index);
    }

    getTabsInfo(): any {
        return this._getModel().getTabsInfo();
    }

    private _getModel(): SearchModel {
        return <SearchModel>this.model;
    }
}
