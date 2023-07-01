import { useApiTableContext } from '../ApiTable';
import { getData } from '../service';

export const TablePagination = () => {
  const { control } = useApiTableContext<unknown, unknown>()
  const { data, isLoading } =  getData(control.url, control.params);

  if(isLoading) {
    return <></>;
  }

  /** TODO: `total` name should be in control */
  const totalPages = !data ? 0 : Math.ceil(data.total / control.params[control.limitName!]);
  const currentPage = control.params[control.pageName!];

  return (
    <div className=''>
      {currentPage > 1 && (
        <button
          onClick={()=>{
            control.handlePageClick(currentPage-1)
          }}
        >Prev</button>
      )}

      {totalPages !== currentPage && (
        <button
          onClick={()=>{
            control.handlePageClick(currentPage+1)
          }}
        >Next</button>
      )}
    </div>
  );
}