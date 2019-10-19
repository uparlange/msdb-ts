import { EventEmitter, Injectable } from '@angular/core';
import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { AppHelperObject } from 'src/app/common/app-helper-object';

@Injectable()
export class ResultModel extends AbstractAppModel {

    _FILTER_MESS: string = "mess";
    _FILTER_CLONE: string = "clone";
    _FILTER_BIOS: string = "bios";
    _FILTER_DEVICE: string = "device";

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
    }

    onInit(): void {
        super.onInit();
        this._setFilterList([]);
        this._getTitle().subscribe((title: string) => {
            this.data.title = title;
            this.getHistory().add(title, "magnify");
        })
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.data.provider = [];
        this.getProvider().search(this.params.type, this.params.value).subscribe((data: any) => {
            this.data.source = data || [];
            this._initFilters();
            this._filterList();
            callback();
        });
    }

    filterChange(event: any): void {
        this.data.filter.list = event.value;
        this._filterList();
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
        this.data.provider = this.data.source.filter((game: any) => {
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
            filterValue: "",
            provider: [],
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
