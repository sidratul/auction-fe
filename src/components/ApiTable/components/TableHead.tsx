import React from 'react'
import { useApiTableContext } from '../ApiTable';

export const TableHead = <T extends unknown, P extends unknown>() => {
  const { control } = useApiTableContext<T,P>();
  const handleSortBy = (column: string) => {
    let newOrderType: 'ASC' | 'DESC' = 'ASC';
    if (column === control.params.orderBy && control.params.orderType === 'ASC') {
      newOrderType = 'DESC';
    }
    control.handleSort(column, newOrderType);
  };

  return (
    <thead>
      <tr>
        {
          <th>No.</th>
        }
        {
          control.getColumns().map(column => (
            <th
              key={column.label}
              onClick={() => column.sort && handleSortBy(column.sort as string)}
            >
              {column.label}
              { control.params.orderBy === column.sort && (
                <i
                  className={`bi bi-caret-${
                    control.params.orderType === 'ASC' ? 'down' : 'up'
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