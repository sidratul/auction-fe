import React, { useContext, createContext, useState } from 'react'
import { ApiTableControl, QueryParams } from './ApiTableControl'
import { TableHead } from './components/TableHead';
import { TableBody } from './components/TableBody';
import { TablePagination } from './components/TablePagination';

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
  const [ params, setParams] = useState<QueryParams<P>>(control.defaultParams);
  control.setParams = setParams;
  control.params = params;

  return (
    <TableContext.Provider
      value={{
        control,
      }}
    >
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <TableHead/>
          <TableBody/>
        </table>
      </div>
      <TablePagination/>
    </TableContext.Provider>
  )
}