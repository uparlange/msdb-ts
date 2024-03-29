import { EventEmitter, Injectable } from '@angular/core';
import { AbstractAppModel } from '../../common/abstract-app-model';
import { AppHelperObject } from '../../common/providers/app-helper-object';

@Injectable()
export class ResultModel extends AbstractAppModel {

    private _FILTER_MESS: string = "mess";
    private _FILTER_CLONE: string = "clone";
    private _FILTER_BIOS: string = "bios";
    private _FILTER_DEVICE: string = "device";

    constructor(
        protected override _helper: AppHelperObject) {
        super(_helper);
    }

    override onInit(): void {
        super.onInit();
        this._setFilterList([]);
        this._getTitle().subscribe((title: string) => {
            this.data.title = title;
            this.getHistory().add(title, this.getMdiIconByType(this.params.type));
        })
    }

    override onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.data.provider = [];
        this.getMsdbProvider().search(this.params.type, this.params.value).subscribe((data: any) => {
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

    private _setFilterList(value: Array<string>): void {
        this.data.filter.list = value;
    }

    private _getTitle(): EventEmitter<any> {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        const labelKey = this._getSearchLabel(this.params.type);
        this.getLabels().getValues([labelKey]).subscribe((translations: Map<String, any>) => {
            const title = `${translations.get(labelKey)} "${this.params.value}"`;
            eventEmitter.emit(title);
        });
        return eventEmitter;
    }

    private _getSearchLabel(type: string): string {
        return (type) ? `L10N_SEARCH_BY_${type.toUpperCase()}` : "";
    }

    private _initFilters(): void {
        this.data.filter.messDisabled = this.data.source.findIndex((game: { ismess: boolean; }) => game.ismess) === -1;
        this.data.filter.cloneDisabled = this.data.source.findIndex((game: { cloneof: string; }) => game.cloneof != null) === -1;
        this.data.filter.biosDisabled = this.data.source.findIndex((game: { isbios: string; }) => game.isbios == "yes") === -1;
        this.data.filter.deviceDisabled = this.data.source.findIndex((game: { isdevice: string; }) => game.isdevice == "yes") === -1;
        const filterList : Array<string> = [];
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

    private _filterList(): void {
        this.data.provider = this.data.source.filter((game: any) => {
            return !(
                (game.ismess && !this.data.filter.list.includes(this._FILTER_MESS)) ||
                (game.cloneof != null && !this.data.filter.list.includes(this._FILTER_CLONE)) ||
                (game.isbios == "yes" && !this.data.filter.list.includes(this._FILTER_BIOS)) ||
                (game.isdevice == "yes" && !this.data.filter.list.includes(this._FILTER_DEVICE))
            );
        });
    }

    protected override _getInitData(): any {
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
