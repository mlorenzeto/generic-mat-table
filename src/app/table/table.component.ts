import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { Sort, SortDirection } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { sortBy, orderBy, cloneDeep } from "lodash";

import { tableSymbol } from "../decorators/column";
import { ColumnModel } from "./../decorators/column.model";
import { TableModel } from "./../decorators/table.model";


@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.sass"],
})
export class TableComponent implements OnInit {
  private _data = [];
  private _originalData: any[] = [];
  private _tableModel: TableModel;
  private _paginator: MatPaginator;

  dataSource = new MatTableDataSource<any>(this._data);

  @ViewChild('paginator') set matPaginator(paginator: MatPaginator) {
    this._paginator = paginator;
    this.setDataSourceAttributes();
  }

  @Input() set data(values: any[]) {
    if (values && values.length > 0) {
      this._data = cloneDeep(values);
      this._tableModel = this._data[0][tableSymbol];
      this.buildColumns();

      const hasDataChanged = this.checkDataChange();
      if (!this._originalData.length || hasDataChanged) {
        // Keep original order of data
        this._originalData = cloneDeep(this._data);
        this.dataSource = new MatTableDataSource<any>(values);
        this.setDataSourceAttributes();

        if (this.actualSortParams) {
          this.sortData(this.actualSortParams);
        }
      }
    }
  }
  get data(): any[] {
    return this._data;
  }
  @Input() instance: any;

  columns: ColumnModel[];
  displayedColumns: string[];

  selectedRowId: string;
  actualSortParams: Sort;

  @Output() dataEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  sortData(params: Sort) {
    this.actualSortParams = params;
    const direction: SortDirection = params.direction;
    this.data = direction
      ? orderBy(this.data, [params.active], [direction])
      : this._originalData;

      this.dataSource = new MatTableDataSource<any>(this.data);
      this.setDataSourceAttributes();
  }

  private checkDataChange(): boolean {
    const actualData = this._data.map(item => item.id);
    const originalData = this._originalData.map(item => item.id);

    const hasDataChanged = !originalData.every(item => actualData.includes(item));

    return hasDataChanged;
  }

  private buildColumns() {
    this.columns = this._tableModel.columns;
    this.sortColumns();
    this.displayedColumns = this.columns.map(col => col.key);
  }

  private sortColumns() {
    this.columns = sortBy(this.columns, ["order"]);
  }

  private setDataSourceAttributes() {
    this.dataSource.paginator = this._paginator;
  }

  actionClick(element: any) {
    this.highlight(element);
    this.dataEvent.emit(element);
  }

  highlight(element: any){
    this.selectedRowId = element.id;
  }
}
