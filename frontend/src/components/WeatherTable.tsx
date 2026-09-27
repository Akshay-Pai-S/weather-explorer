import type { WeatherTableProps } from "../types/weather";
import usePagination from "../hooks/usePagination";
import Pagination from "./Pagination";

export default function WeatherTable({ data }: WeatherTableProps) {
  const {
    currentRows,
    currentPage,
    totalPages,
    rowsPerPage,
    setCurrentPage,
    handleRowsPerPage,
  } = usePagination(data);

  const tableHeaderClass =
    "whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500";
  const tableCellClass = "whitespace-nowrap px-4 py-3 text-sm text-gray-700";

  return (
    <>
      {data.length > 0 && (
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-900">
              Daily Weather
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Daily temperature measurement for the selected data file
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className={`${tableHeaderClass} text-left`}>Date</th>
                  <th className={`${tableHeaderClass} text-right`}>
                    Max Temperature
                  </th>
                  <th className={`${tableHeaderClass} text-right`}>
                    Min Temperature
                  </th>
                  <th className={`${tableHeaderClass} text-right`}>
                    Apparent Max
                  </th>
                  <th className={`${tableHeaderClass} text-right`}>
                    Apparent Min
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((day) => (
                  <tr key={day.date}>
                    <td className={`${tableCellClass} text-left`}>
                      {day.date}
                    </td>
                    <td className={`${tableCellClass} text-right`}>
                      {day.tempMax}
                    </td>
                    <td className={`${tableCellClass} text-right`}>
                      {day.tempMin}
                    </td>
                    <td className={`${tableCellClass} text-right`}>
                      {day.apparentTempMax}
                    </td>
                    <td className={`${tableCellClass} text-right`}>
                      {day.apparentTempMin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            pageSizeOptions={[10, 20, 50]}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={handleRowsPerPage}
          />
        </section>
      )}
    </>
  );
}
