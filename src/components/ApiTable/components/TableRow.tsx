import React from 'react'
import { useApiTableContext } from '../ApiTable'

interface TableRowProps<T> {
  data: T;
  index: number;
}

export const TableRow = <T extends unknown>(props: TableRowProps<T>) => {
  const { control } = useApiTableContext<T>();
  const { data, index } = props;
  control.numbering = true;
  return (
    <tr>
      {
        control.numbering && (
          <td className='border px-4 py-2 border-slate-300'>
            {(control.params[control.pageName!]-1) * control.params[control.limitName!] + index + 1}
          </td>
        )
      }
      {
        control.getColumns().map(column => (
          <td
            className='border px-4 py-2 border-slate-300'
            key={control.getColumnKey(data, column )}
          >{control.getValue(data, column)}</td>
        ))
      }
    </tr>
  )
}