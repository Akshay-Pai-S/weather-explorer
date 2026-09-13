import { useState } from "react";
import type { WeatherTableProps } from "../types/weather";

export default function WeatherTable({ data }: WeatherTableProps) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = data.slice(startIndex, endIndex);
  return (
    <section>
      {data.length > 0 && (
        <>
          <h2>Weather Data</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Maximum Temperature</th>
                <th>Minimum Temperature</th>
                <th>Apparent Maximum</th>
                <th>Apparent Minimum</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((day) => (
                <tr key={day.date}>
                  <td>{day.date}</td>
                  <td>{day.tempMax}</td>
                  <td>{day.tempMin}</td>
                  <td>{day.apparentTempMax}</td>
                  <td>{day.apparentTempMin}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <label htmlFor="rows-per-page">Rows Per Page</label>
            <select
              id="rows-per-page"
              value={rowsPerPage}
              onChange={(event) => {
                setRowsPerPage(Number(event.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div>
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
