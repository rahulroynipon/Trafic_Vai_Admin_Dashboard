import AppLoader from "./../global/AppLoader";
import Button from "./Button";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";

const Table = ({
  headers = [],
  data = [],
  renderRow,
  height = "68svh",
  children,
  pagination = {},
  onPageChange = () => {},
  isLoading,
}) => {
  const hasData = data.length > 0 && typeof renderRow === "function";

  return (
    <div className="relative flex-1  w-full bg-white">
      <div
        style={{ maxHeight: height }}
        className="absolute top-full left-0 w-full z-0 overflow-auto shadow-sm bg-base-100 flex flex-col"
      >
        <table className="w-full table-auto flex-grow">
          {headers.length > 0 && (
            <thead className="bg-base-100 capitalize sticky top-0 z-10">
              <tr className="bg-primary/10 ">
                {headers.map((header) => (
                  <th
                    key={header}
                    className="text-left px-3 py-2 text-sm font-semibold whitespace-nowrap text-content-300"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          )}

          <tbody>
            {isLoading && (
              <tr>
                <td
                  colSpan={headers.length || 1}
                  className="text-center italic text-content-400 p-6"
                >
                  <AppLoader className="size-8 border-2" />
                </td>
              </tr>
            )}

            {!isLoading && hasData && (
              <>{data.map((item, index) => renderRow(item, index))}</>
            )}

            {!isLoading &&
              data.length === 0 &&
              (children || (
                <tr>
                  <td
                    colSpan={headers.length || 1}
                    className="text-center italic text-content-400 p-6"
                  >
                    No data available.
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Sticky pagination at bottom */}
        <div className="sticky bottom-0 left-0 right-0 bg-base-100 z-20 border-t border-content-400/15">
          <TablePagination
            pagination={pagination}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

const TableHeader = ({ title = "Title", children, className = "" }) => {
  return (
    <div className="bg-base-100 p-4 shadow-sm w-full flex flex-wrap items-center justify-between space-x-3 space-y-2">
      <h1 className="text-2xl font-semibold text-content-200">{title}</h1>
      <div className={className}>{children}</div>
    </div>
  );
};

const TablePagination = ({ pagination = {}, onPageChange }) => {
  const { total = 0, page = 1, limit = 10, totalPages = 1 } = pagination;

  // Ensure totalPages is at least 1 to avoid edge cases
  const safeTotalPages = totalPages > 0 ? totalPages : 1;
  const currentPage =
    page > safeTotalPages ? safeTotalPages : page < 1 ? 1 : page;

  const from = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const to = Math.min(currentPage * limit, total);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === safeTotalPages;

  // Helper to safely change page, no call if invalid page
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= safeTotalPages && newPage !== currentPage) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2.5 items-center justify-between">
        <span className="text-sm text-content-400 font-medium">
          Showing {from} to {to} of {total} entries
        </span>

        <div className="flex gap-2">
          <Button
            variant="icon"
            onClick={() => handlePageChange(1)}
            disabled={isFirstPage}
            className="size-7 border border-content-400/40 text-content-400 disabled:text-content-400/40 disabled:border-content-400/40 disabled:bg-transparent"
          >
            <MdKeyboardDoubleArrowLeft className="text-2xl" />
          </Button>

          <Button
            variant="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={isFirstPage}
            className="size-7 border border-content-400/40 text-content-400 disabled:text-content-400/40 disabled:border-content-400/40 disabled:bg-transparent"
          >
            <MdKeyboardArrowLeft className="text-2xl" />
          </Button>

          <Button
            variant="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={isLastPage}
            className="size-7 border border-content-400/40 text-content-400 disabled:text-content-400/40 disabled:border-content-400/40 disabled:bg-transparent"
          >
            <MdKeyboardArrowRight className="text-2xl" />
          </Button>

          <Button
            variant="icon"
            onClick={() => handlePageChange(safeTotalPages)}
            disabled={isLastPage}
            className="size-7 border border-content-400/40 text-content-400 disabled:text-content-400/40 disabled:border-content-400/40 disabled:bg-transparent"
          >
            <MdKeyboardDoubleArrowRight className="text-2xl" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Table, TableHeader, TablePagination };
