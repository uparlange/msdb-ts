import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppClassHelper } from 'src/app/common/app-class-helper';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchModel extends AbstractAppModel {

    _tabsInfo: any = null;

    constructor(appClassHelper: AppClassHelper, msdbProvider: MsdbProvider) {
        super(appClassHelper, msdbProvider);
        this._tabsInfo = this._getTabsInfo();
    }

    onInit(): void {
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

    _getInitData(): any {
        return {
            selectedIndex: 0
        };
    }

    _getTabsInfo(): any {
        return {
            _tabs: [
                { index: 0, key: "L10N_SEARCH_BY_DESCRIPTION", type: "description", icon: "magnify" },
                { index: 1, key: "L10N_SEARCH_BY_RATING", type: "ratings", icon: "star-circle-outline" },
                { index: 2, key: "L10N_SEARCH_BY_CATEGORY", type: "categories", icon: "folder-outline" },
                { index: 3, key: "L10N_SEARCH_BY_SERIES", type: "series", icon: "format-list-bulleted" },
                { index: 4, key: "L10N_SEARCH_BY_YEAR", type: "years", icon: "calendar" },
                { index: 5, key: "L10N_SEARCH_BY_LANGUAGE", type: "languages", icon: "flag-outline" },
                { index: 6, key: "L10N_SEARCH_BY_VERSION", type: "versions", icon: "plus-one" },
                { index: 7, key: "L10N_SEARCH_BY_MANUFACTURER", type: "manufacturers", icon: "domain" }
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
}
