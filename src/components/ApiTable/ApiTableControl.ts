import React, { ReactNode } from 'react'

interface Column<T> {
  label: string;
  value: keyof T | ((row: T) => ReactNode);
  sort?: keyof T;
}

type OrderType = "ASC" | "DESC";

export type QueryParams<P> = Partial<P>;

export interface ApiTableControlProps<T,P> {
  columns: Column<T>[];
  url: string,
  numbering?: boolean;
  orderType?: OrderType,
  orderBy?: keyof T,
  default?: Partial<P>,
  limitName?: keyof P,
  orderByName?: keyof P,
  orderTypeName?: keyof P,
  pageName?: keyof P,
}

export class ApiTableControl<T, P> {
  private columns: Column<T>[] = [];
  private keyName: string = "id";
  url: string = "";
  numbering?: boolean = true;
  limitName?: keyof P;
  orderByName?: keyof P;
  orderTypeName?: keyof P;
  pageName?: keyof P;
  defaultParams: QueryParams<P>;
  params: QueryParams<P> = {} as QueryParams<P>;
  setParams: React.Dispatch<React.SetStateAction<QueryParams<P>>> = () => {} ;
  refreshFunction: ()=> void = () => {};

  constructor (props: ApiTableControlProps<T,P>) {
    this.columns = props.columns
    this.url = props.url;
    this.numbering = props.numbering;

    this.limitName = props.limitName || "limit" as keyof P;
    this.pageName = props.orderTypeName || "page" as keyof P;
    this.orderByName = props.pageName || "orderBy" as keyof P;
    this.orderTypeName = props.orderByName || "orderType" as keyof P;

    this.defaultParams = {
      [this.pageName]: 1,
      [this.limitName]: 10,
      [this.orderByName]: "id",
      [this.orderTypeName]: "DESC",
      ...props.default,
    } as  QueryParams<P>;
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

  filter(name: keyof P, value: string | string[] | undefined) {
    this.setParams((prev) => {
      if(!value) {
        delete prev[name];
        return {
          ...prev,
        }
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  }

  handleSort(by: keyof T, type: OrderType) {
    this.setParams((prev) => {
      return {
        ...prev,
        ...{
          [this.orderByName!]: by,
          [this.orderTypeName!]: type,
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