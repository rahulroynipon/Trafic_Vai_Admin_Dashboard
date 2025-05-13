import AppLoader from "./../global/AppLoader";

const Table = ({
  headers = [],
  data = [],
  renderRow,
  height = "65svh",
  children,
  isLoading,
}) => {
  const hasData = data.length > 0 && typeof renderRow === "function";

  return (
    <div className="relative w-full bg-white">
      <div
        style={{ maxHeight: height }}
        className="absolute top-full left-0 w-full z-0 overflow-auto shadow-sm bg-base-100"
      >
        <table className="w-full table-auto ">
          {headers.length > 0 && (
            <thead className=" bg-primary/10 capitalize sticky top-0 z-10">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="text-left px-3 py-2 text-sm font-semibold text-nowrap text-content-300"
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
                  className="text-center  italic text-content-400 p-6"
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
      </div>
    </div>
  );
};

const TableHeader = ({ title = "Title", children }) => {
  return (
    <div className="bg-base-100 p-4 shadow-sm flex flex-wrap items-center justify-between space-x-3 space-y-2">
      <h1 className="text-2xl font-semibold text-content-200">{title}</h1>
      <div>{children}</div>
    </div>
  );
};

export { Table, TableHeader };
