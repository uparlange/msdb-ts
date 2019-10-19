import { Component, Input, ViewChild, SimpleChanges, ContentChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { AbstractComponent } from 'src/app/fwk/abstract-component';
import { AppHelperObject } from '../../app-helper-object';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdvTableColumnDirective } from './adv-table-column-directive';

@Component({
    selector: "advTable",
    templateUrl: './adv-table-component.html',
    styleUrls: ['./adv-table-component.css']
})
export class AdvTableComponent extends AbstractComponent {

    @ViewChild(MatPaginator, { static: false }) matPaginator !: MatPaginator;

    @ContentChildren(AdvTableColumnDirective) columns: QueryList<AdvTableColumnDirective>;

    @Input() provider: Array<any> = [];
    @Input() filterValue: string = "";
    @Input() paginationEnabled: boolean = true;
    @Input() filterEnabled: boolean = true;
    @Input() rowTrackId: string = null;
    @Input() pageIndex: Number = 0;

    @Output() filterValueChange: EventEmitter<any> = new EventEmitter();
    @Output() pageIndexChange: EventEmitter<any> = new EventEmitter();

    displayedColumns: Array<string> = [];
    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    pageSize: Number = 200;

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    afterViewInit(): void {
        super.afterViewInit();
        if (this.paginationEnabled) {
            this.dataSource.paginator = this.matPaginator;
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

    _initDisplayedColumns(): void {
        const displayedColumns: Array<string> = [];
        this.columns.forEach((column: AdvTableColumnDirective) => {
            displayedColumns.push(column.columnName);
        });
        this.displayedColumns = displayedColumns;
    }

    _setFilterValue(value: string): void {
        this.filterValue = value;
        this.dataSource.filter = value;
        this.filterValueChange.emit(value);
    }
}