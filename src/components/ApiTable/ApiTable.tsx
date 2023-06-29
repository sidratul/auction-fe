import React, { useContext, createContext, useState } from 'react'
import { ApiTableControl, QueryParams } from './ApiTableControl'
import { TableHead } from './components/TableHead';
import { TableBody } from './components/TableBody';

interface ApiTableProps<T,P> {
  control: ApiTableControl<T,P>;
}

interface ApiTableContextProps<T, P=unknown> {
  control: ApiTableControl<T,P>;
}

const TableContext = createContext<ApiTableContextProps<any, any>>({} as ApiTableContextProps<any, any>);

export const useApiTableContext = <T extends unknown = unknown, P = unknown>() => {
  return useContext<ApiTableContextProps<T, P>>(TableContext);
}

export const ApiTable = <T extends unknown, P extends unknown>({control}: ApiTableProps<T, P>) => {
  const defaulParams = {
    limit: 10,
    page: 1,
    orderBy: control.orderBy,
    orderType: control.orderType,
  } as QueryParams<T,P>;

  const [ params, setParams] = useState<QueryParams<T,P>>(defaulParams);
  control.setParams = setParams;
  control.params = params;

  return (
    <TableContext.Provider
      value={{
        control,
      }}
    >
      <table>
        <TableHead/>
        <TableBody/>
      </table>
    </TableContext.Provider>
  )
}