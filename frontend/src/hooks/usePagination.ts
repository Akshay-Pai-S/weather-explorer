import { useEffect, useState } from "react";

export default function usePagination<T>(items: T[], defaultItemsPerPage = 10) {
  const [rowsPerPage, setRowsPerPage] = useState(defaultItemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = items.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  function handleRowsPerPage(value: number) {
    setRowsPerPage(value);
    setCurrentPage(1);
  }

  return {
    currentRows,
    currentPage,
    totalPages,
    rowsPerPage,
    setCurrentPage,
    handleRowsPerPage,
  };
}
