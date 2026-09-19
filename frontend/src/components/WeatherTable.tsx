import { useState } from "react";
import type { WeatherTableProps } from "../types/weather";

export default function WeatherTable({ data }: WeatherTableProps) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = data.slice(startIndex, endIndex);

  const tableHeaderClass =
    "whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500";
  const tableCellClass = "whitespace-nowrap px-4 py-3 text-sm text-gray-700";

  const paginationButtonClass =
    "rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50";

  const paginationSelectClass =
    "rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
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
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <label htmlFor="rows-per-page">Rows Per Page</label>
              <select
                id="rows-per-page"
                value={rowsPerPage}
                onChange={(event) => {
                  setRowsPerPage(Number(event.target.value));
                  setCurrentPage(1);
                }}
                className={paginationSelectClass}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
                className={paginationButtonClass}
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => page + 1)}
                className={paginationButtonClass}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
