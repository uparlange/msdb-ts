import { Component, Input, ViewChild, SimpleChanges, ContentChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
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
    @Input() pageIndex: Number = 0;
    @Input() pageSize: Number = 100;

    @ContentChildren(AdvTableColumnDirective) columns: QueryList<AdvTableColumnDirective>;

    @Output() filterValueChange: EventEmitter<any> = new EventEmitter();
    @Output() pageIndexChange: EventEmitter<any> = new EventEmitter();

    displayedColumns: Array<string> = [];
    dataSource: MatTableDataSource<any> = new MatTableDataSource();

    @ViewChild(MatPaginator, { static: false })
    private _matPaginator !: MatPaginator;

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    afterViewInit(): void {
        super.afterViewInit();
        if (this.paginationEnabled) {
            this.dataSource.paginator = this._matPaginator;
        }
    }

    afterContentInit(): void {
        super.afterContentInit();
        this._initDisplayedColumns();
    }

    onDestroy(): void {
        super.onDestroy();
        this.dataSource.paginator = null;
    }

    onChanges(changes: SimpleChanges): void {
        super.onChanges(changes);
        if (changes.provider) {
            this.dataSource.data = this.provider;
        }
        if (changes.filterValue) {
            this._setFilterValue(this.filterValue);
        }
        if (changes.pageIndex) {
            this.pageChanged({ pageIndex: this.pageIndex });
        }
    }

    applyFilter(value: string): void {
        this._setFilterValue(value);
    }

    clearFilter(): void {
        this._setFilterValue("");
    }

    pageChanged(event: any): void {
        this.pageIndex = event.pageIndex;
        this.pageIndexChange.emit(this.pageIndex);
    }

    trackByColumnName(index: number, item: any): string {
        return item ? item.columnName : undefined;
    }

    trackByRowId(index: number, item: any): string {
        return (item && this.rowTrackId) ? item[this.rowTrackId] : undefined;
    }

    private _initDisplayedColumns(): void {
        const displayedColumns: Array<string> = [];
        this.columns.forEach((column: AdvTableColumnDirective) => {
            displayedColumns.push(column.columnName);
        });
        this.displayedColumns = displayedColumns;
    }

    private _setFilterValue(value: string): void {
        this.filterValue = value;
        this.dataSource.filter = value;
        this.filterValueChange.emit(value);
    }
}