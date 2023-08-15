import { AbstractAppModel } from '../../common/abstract-app-model';
import { AppHelperObject } from '../../common/providers/app-helper-object';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchModel extends AbstractAppModel {

    private _tabsInfo: any = null;

    constructor(
        protected override _helper: AppHelperObject) {
        super(_helper);
        this._tabsInfo = this._getTabsInfo();
    }

    override onInit(): void {
        super.onInit();
        const type = this.getRouter().getUrlWithoutQueryParams().split("/")[2];
        const tabInfo = this.getTabsInfo().byType(type);
        this.data.selectedIndex = tabInfo.index;
    }

    tabChanged(event: any): void {
        const tabInfo = this.getTabsInfo().byIndex(event.index);
        this.getCache().setItem("searchLastType", tabInfo.type, "version");
    }

    getSearchTabLabel(index: number): any {
        const tabInfo = this.getTabsInfo().byIndex(index);
        return tabInfo.key;
    }

    getTabsInfo(): any {
        return this._tabsInfo;
    }

    private _getTabsInfo(): any {
        return {
            _tabs: [
                { index: 0, key: "L10N_SEARCH_BY_DESCRIPTION", type: "description" },
                { index: 1, key: "L10N_SEARCH_BY_RATING", type: "ratings" },
                { index: 2, key: "L10N_SEARCH_BY_CATEGORY", type: "categories" },
                { index: 3, key: "L10N_SEARCH_BY_SERIES", type: "series" },
                { index: 4, key: "L10N_SEARCH_BY_YEAR", type: "years" },
                { index: 5, key: "L10N_SEARCH_BY_LANGUAGE", type: "languages" },
                { index: 6, key: "L10N_SEARCH_BY_VERSION", type: "versions" },
                { index: 7, key: "L10N_SEARCH_BY_MANUFACTURER", type: "manufacturers" }
            ],
            getTabs(): any {
                return this._tabs;
            },
            byIndex(value: number): any {
                let tab = null;
                this._tabs.forEach((item: any) => {
                    if (item.index === value) {
                        tab = item;
                        return;
                    }
                });
                return tab;
            },
            byType(value: string): any {
                let tab = null;
                this._tabs.forEach((item: any) => {
                    if (item.type === value) {
                        tab = item;
                        return;
                    }
                });
                return tab;
            }
        };
    }

    protected override _getInitData(): any {
        return {
            selectedIndex: 0
        };
    }
}
