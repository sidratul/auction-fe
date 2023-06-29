import { ReactNode } from "react";
import { ApiTableControl } from "./ApiTableControl";

export interface DataList<T> {
  data: T[];
  total: number;
}