import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { Injectable } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { AppLabels } from 'src/app/app-labels';

@Injectable()
export class ConfigModel extends AbstractAppModel {

    private _tabsInfo: any = null;

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
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
        this.getCache().setItem("configLastView", tabInfo.type, "version");
    }

    getTabsInfo(): any {
        return this._tabsInfo;
    }

    private _getTabsInfo(): any {
        return {
            _tabs: [
                { index: 0, label: AppLabels.APPLICATION, type: "application" },
                { index: 1, label: AppLabels.MAME, type: "mame" },
                //{ index: 2, label: AppLabels.NWJS, type: "nwjs" }
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

    protected _getInitData(): any {
        return {
            selectedIndex: 0
        };
    }
}