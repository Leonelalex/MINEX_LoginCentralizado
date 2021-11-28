/* eslint no-restricted-imports: ["error"] */
import React, { useState } from "react";
import TablePagination from "@material-ui/core/TablePagination";

function Pagination({ size, onPageChange}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
      onPageChange({ page: newPage + 1, size: rowsPerPage});
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
      onPageChange({ page: 1, size: parseInt(event.target.value, 10)});
    };
  
    return (
      <TablePagination
        component="div"
        count={size || 0}
        page={size <= 10 ? 0 : page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    );
  }
  
  
  export { Pagination };