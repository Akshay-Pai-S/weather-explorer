import type { PaginationProps } from "../types/weather";

export default function Pagination({
  currentPage,
  totalPages,
  rowsPerPage,
  pageSizeOptions,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const paginationButtonClass =
    "rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50";

  const paginationSelectClass =
    "rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transitio focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <label htmlFor="rows-per-page">Rows Per Page</label>
        <select
          id="rows-per-page"
          value={rowsPerPage}
          onChange={(event) => {
            onItemsPerPageChange(Number(event.target.value));
          }}
          className={paginationSelectClass}
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option} className="bg-white py-2 text-sm text-gray-700">
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
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
          onClick={() => onPageChange(currentPage + 1)}
          className={paginationButtonClass}
        >
          Next
        </button>
      </div>
    </div>
  );
}
