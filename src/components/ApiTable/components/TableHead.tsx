import React from 'react'
import { useApiTableContext } from '../ApiTable';

export const TableHead = <T extends unknown, P extends unknown>() => {
  const { control } = useApiTableContext<T,P>();
  const handleSortBy = (column: keyof T) => {
    let newOrderType: 'ASC' | 'DESC' = 'ASC';
    if (column === control.params[control.orderByName!] && control.params[control.orderTypeName!] === 'ASC') {
      newOrderType = 'DESC';
    }
    control.handleSort(column, newOrderType);
  };

  return (
    <thead>
      <tr>
        {
          <th className='border px-4 py-2 border-slate-300'>No.</th>
        }
        {
          control.getColumns().map(column => (
            <th
              key={column.label}
              onClick={() => column.sort && handleSortBy(column.sort)}
              className='border px-4 py-2 border-slate-300'
            >
              {column.label}
              { control.params[control.orderByName!] === column.sort && (
                <i
                  className={`bi bi-caret-${
                    control.params[control.orderTypeName!] === 'ASC' ? 'down' : 'up'
                  }-fill`}
                ></i>
              )}
            </th>
          ))
        }
      </tr>
    </thead>
  )
}