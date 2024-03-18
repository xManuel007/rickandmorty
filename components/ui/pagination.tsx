// Pagination.tsx
import React from "react";
import { Button } from "./button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const goToPage = (page: number) => {
    if (page < 1) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }
    onPageChange(page);
  };

  return (
    <div className="flex gap-4 py-16 items-center w-full justify-center">
      <Button onClick={() => goToPage(1)} disabled={currentPage === 1}>
        <ChevronsLeft />
      </Button>
      <Button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft />
      </Button>
      <div>{currentPage}</div>
      <Button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
        <ChevronRight />
      </Button>
      <Button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>
        <ChevronsRight />
      </Button>
    </div>
  );
};

export default Pagination;
