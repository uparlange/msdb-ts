import { Component, Input, SimpleChanges, ContentChildren, QueryList, Output, EventEmitter, ViewChildren, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdvTableColumnDirective } from './adv-table-column-directive';
import { AppHelperObject } from '../../providers/app-helper-object';
import { AbstractAppComponent } from '../../abstract-app-component';

@Component({
    selector: "advTable",
    templateUrl: './adv-table-component.html',
    styleUrls: ['./adv-table-component.css']
})
export class AdvTableComponent extends AbstractAppComponent {

    @Input() provider: Array<any> = [];
    @Input() filterValue: string = "";
    @Input() paginationEnabled: boolean = true;
    @Input() filterEnabled: boolean = true;
    @Input() rowTrackId: string = null;
    @Input() pageIndex: number = 0;
    @Input() pageSize: number = 100;

    @ContentChildren(AdvTableColumnDirective) columns: QueryList<AdvTableColumnDirective>;

    @Output() filterValueChange: EventEmitter<any> = new EventEmitter();
    @Output() pageIndexChange: EventEmitter<any> = new EventEmitter();

    displayedColumns: Array<string> = [];
    dataSource: MatTableDataSource<any> = new MatTableDataSource();

    @ViewChild("primaryPaginatorWrapper")
    private _primaryPaginatorWrapper !: any;

    @ViewChild("primaryPaginator")
    private _primaryPaginator !: MatPaginator;

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    afterViewInit(): void {
        super.afterViewInit();
        if (this.paginationEnabled) {
            this.dataSource.paginator = this._primaryPaginator;
        } else {
            this._primaryPaginatorWrapper.nativeElement.removeChild(this._primaryPaginatorWrapper.nativeElement.firstChild);
        }
    }

    afterContentInit(): void {
        super.afterContentInit();
        const displayedColumns: Array<string> = [];
        this.columns.forEach((column: AdvTableColumnDirective) => {
            displayedColumns.push(column.columnName);
        });
        this.displayedColumns = displayedColumns;
    }

    onDestroy(): void {
        super.onDestroy();
        this.dataSource.paginator = null;
    }

    onChanges(changes: SimpleChanges): void {
        super.onChanges(changes);
        if (changes.provider) {
            this._refreshData(this.provider);
        }
        if (changes.filterValue) {
            this._setFilterValue(this.filterValue);
        }
        if (changes.pageIndex) {
            this._setPageIndex(this.pageIndex);
        }
    }

    applyFilter(value: string): void {
        this._setFilterValue(value);
    }

    clearFilter(): void {
        this._setFilterValue("");
    }

    pageChanged(event: PageEvent): void {
        this._setPageIndex(event.pageIndex);
    }

    syncPrimaryPaginator(event: PageEvent): void {
        this._primaryPaginator.pageIndex = event.pageIndex;
        this._primaryPaginator.pageSize = event.pageSize;
        this._primaryPaginator.page.emit(event);
    }

    trackByColumnName(index: number, item: any): string {
        return item ? item.columnName : undefined;
    }

    trackByRowId(index: number, item: any): string {
        return (item && this.rowTrackId) ? item[this.rowTrackId] : undefined;
    }

    emptyResult(): boolean {
        return !this.dataSource.filteredData || this.dataSource.filteredData.length == 0;
    }

    showSecondaryPaginator(): boolean {
        return !this.emptyResult() && this.paginationEnabled;
    }

    private _setFilterValue(value: string): void {
        this.dataSource.filter = value;
        this.filterValue = value;
        this.filterValueChange.emit(value);
    }

    private _setPageIndex(index: number) {
        this.pageIndex = index;
        this.pageIndexChange.emit(this.pageIndex);
    }

    private _refreshData(data: any[]) {
        this.dataSource.data = data;
    }
}