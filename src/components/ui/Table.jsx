import React from "react";

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
    <div className="w-full overflow-hidden bg-white ">
      <div
        style={{ maxHeight: height }}
        className="overflow-y-auto overflow-x-auto"
      >
        <table className="w-full table-auto border-separate border-spacing-0">
          {headers.length > 0 && (
            <thead className="bg-red-700 text-white italic uppercase  sticky top-0 z-10">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="text-left px-3 py-2 text-sm font-semibold border-b"
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
                  className="text-center italic text-gray-500 p-6"
                >
                  Loading...
                </td>
              </tr>
            )}

            {!isLoading && data.length > 0 && renderRow && (
              <>{data.map((item, index) => renderRow(item, index))}</>
            )}

            {!isLoading &&
              data.length === 0 &&
              (children || (
                <tr>
                  <td
                    colSpan={headers.length || 1}
                    className="text-center italic text-gray-500 p-6"
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

export default Table;
