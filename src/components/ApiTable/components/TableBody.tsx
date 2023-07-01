import React from 'react'
import { useApiTableContext } from '../ApiTable';
import { getData } from '../service';
import { TableLoading } from './TableLoading';
import { TableRow } from './TableRow';

export const TableBody = <T extends unknown, P extends unknown>() => {
  const { control } = useApiTableContext<T,P>();
  const { data, isLoading, mutate } =  getData<T,P>(control.url, control.params);
  control.refreshFunction = mutate;

  return (
    <tbody>

      { isLoading ? (
        <tr>
          <td colSpan={control.getTotalColumn()} style={{ textAlign:'center' }}>
            <TableLoading/>
          </td>
        </tr>
      ) : data && (
        data.data.map((row, index) => (
          <TableRow key={control.getKey(row)} data={row} index={index} />
        ))
      )}

      {data?.data.length === 0 && (
        /** TODO. using table cell */
        <div>No Data</div>
      )}
    </tbody>
  )
}