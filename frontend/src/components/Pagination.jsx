import { Pagination as MuiPagination } from "@mui/material";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={(_, page) => onPageChange(page)}
      color="primary"
    />
  );
}
