import React, { ReactNode } from 'react'

interface Column<T> {
  label: string;
  value: keyof T | ((row: T) => ReactNode);
  sort?: keyof T;
}

type OrderType = "ASC" | "DESC";

export interface DefaultParams<T>{
  orderBy: keyof T,
  orderType: OrderType,
  page: 1,
  limit: 10,
}

export type QueryParams<T, P> = DefaultParams<T> & P;

export interface ApiTableControlProps<T> {
  columns: Column<T>[];
  url: string,
  numbering?: boolean;
  orderType?: OrderType,
  orderBy?: keyof T,
}

export class ApiTableControl<T, P> {
  private columns: Column<T>[] = [];
  private keyName: string = "id";
  url: string = "";
  numbering?: boolean = true;
  orderType: OrderType = "DESC";
  orderBy?: keyof T;
  params: QueryParams<T,P> = {} as QueryParams<T,P>;
  setParams: React.Dispatch<React.SetStateAction<QueryParams<T,P>>> = () => {} ;
  refreshFunction: ()=> void = () => {};

  constructor (props: ApiTableControlProps<T>) {
    this.columns = props.columns
    this.url = props.url;
    this.numbering = props.numbering;
    if(props.orderBy) {
      this.orderBy = props.orderBy;
    }
    if(props.orderType) {
      this.orderType = props.orderType;
    }
  }

  getColumns() {
    return this.columns;
  }

  getTotalColumn() {
    return this.columns.length;
  }

  private getKeyName(){
    return this.keyName;
  }

  getValue(data: T, column: Column<T>): ReactNode {
    if (typeof column.value !== "function") {
      return data[column.value] as unknown as ReactNode;
    }

    return column.value(data)
  }

  getKey(data: T): any {
    const key = this.getKeyName();
    return data[key as keyof T] as unknown as ReactNode;
  }

  getColumnKey(data: T, column: Column<T>): any {
    const key = this.getKey(data);
    return `${key}-${column.label}`;
  }

  filter(name: string, value: any) {
    this.setParams((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  handleSort(by: string, type: OrderType) {
    this.orderBy = by as keyof T;
    this.orderType = type;
    this.setParams((prev) => {
      return {
        ...prev,
        ...{
          orderBy: by,
          orderType: type,
        }
      }
    });
  }

  handlePageClick = (page: number) => {
    this.setParams((prev) => {
      return { ...prev, page };
    });
  }

  refresh() {
    this.refreshFunction();
  }
}