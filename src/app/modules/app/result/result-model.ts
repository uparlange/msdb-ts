import { MatPaginator, MatTableDataSource } from '@angular/material';
import { EventEmitter, Injectable } from '@angular/core';
import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { AppClassHelper } from 'src/app/common/app-class-helper';

@Injectable()
export class ResultModel extends AbstractAppModel {

    _FILTER_MESS: string = "mess";
    _FILTER_CLONE: string = "clone";
    _FILTER_BIOS: string = "bios";
    _FILTER_DEVICE: string = "device";

    constructor(appClassHelper: AppClassHelper, msdbProvider: MsdbProvider) {
        super(appClassHelper, msdbProvider);
    }

    onInit(): void {
        super.onInit();
        this._setFilterText("");
        this._setFilterList([]);
        this._getTitle().subscribe((title: string) => {
            this.data.title = title;
            this.getHistory().add({ label: title, url: this.getRouter().getUrl(), icon: "magnify" });
        })
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.data.list.data = [];
        this.getProvider().search(this.params.type, this.params.value).subscribe((data: any) => {
            this.data.source = data || [];
            this._initFilters();
            this._filterList();
            callback();
        });
    }

    onDestroy(): void {
        super.onDestroy();
        this.data.list.paginator = null;
    }

    setPaginator(matPaginator: MatPaginator): void {
        this.data.list.paginator = matPaginator;
    }

    pageChanged(event: any): void {
        this.data.pageIndex = event.pageIndex;
    }

    applyFilter(value: string): void {
        this._setFilterText(value);
    }

    clearFilter(): void {
        this._setFilterText("");
    }

    filterChange(event: any): void {
        this.data.filter.list = event.value;
        this._filterList();
    }

    _setFilterText(value: string): void {
        this.data.filter.text = value;
        this.data.list.filter = value;
    }

    _setFilterList(value: Array<string>): void {
        this.data.filter.list = value;
    }

    _getTitle(): EventEmitter<any> {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        const labelKey = this._getSearchLabel(this.params.type);
        this.getLabels().getValues([labelKey]).subscribe((translations: any) => {
            const title = `${translations[labelKey]} "${this.params.value}"`;
            eventEmitter.emit(title);
        });
        return eventEmitter;
    }

    _getSearchLabel(type: string): string {
        return (type) ? `L10N_SEARCH_BY_${type.toUpperCase()}` : "";
    }

    _initFilters(): void {
        this.data.filter.messDisabled = this.data.source.findIndex(game => game.ismess) === -1;
        this.data.filter.cloneDisabled = this.data.source.findIndex(game => game.cloneof != null) === -1;
        this.data.filter.biosDisabled = this.data.source.findIndex(game => game.isbios == "yes") === -1;
        this.data.filter.deviceDisabled = this.data.source.findIndex(game => game.isdevice == "yes") === -1;
        const filterList = [];
        if (!this.data.filter.messDisabled) {
            filterList.push(this._FILTER_MESS);
        }
        if (!this.data.filter.cloneDisabled) {
            filterList.push(this._FILTER_CLONE);
        }
        if (!this.data.filter.biosDisabled && (this.params.value == "System / BIOS" || this.params.type == "bios")) {
            filterList.push(this._FILTER_BIOS);
        }
        if (!this.data.filter.deviceDisabled && (this.params.value == "System / Device" || this.params.type == "device")) {
            filterList.push(this._FILTER_DEVICE);
        }
        this._setFilterList(filterList);
    }

    _filterList(): void {
        this.data.list.data = this.data.source.filter((game) => {
            return !(
                (game.ismess && !this.data.filter.list.includes(this._FILTER_MESS)) ||
                (game.cloneof != null && !this.data.filter.list.includes(this._FILTER_CLONE)) ||
                (game.isbios == "yes" && !this.data.filter.list.includes(this._FILTER_BIOS)) ||
                (game.isdevice == "yes" && !this.data.filter.list.includes(this._FILTER_DEVICE))
            );
        });
    }

    _getInitData(): any {
        return {
            source: [],
            list: new MatTableDataSource(),
            displayedColumns: ["icon", "description"],
            pageIndex: 0,
            filter: {
                messDisabled: true,
                cloneDisabled: true,
                biosDisabled: true,
                deviceDisabled: true,
                list: [],
                text: ""
            },
            title: ""
        };
    }
}
