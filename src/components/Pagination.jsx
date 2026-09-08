import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 10,
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers to display with smart ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      if (start > 2) {
        pages.push("ellipsis-1");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("ellipsis-2");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs px-4">
      {/* Information text */}
      <div className="text-xs sm:text-sm text-slate-600 font-medium">
        Showing <span className="font-bold text-slate-900">{startItem}</span> to{" "}
        <span className="font-bold text-slate-900">{endItem}</span> of{" "}
        <span className="font-bold text-[#0B3C8A]">{totalItems}</span> members
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-[#0B3C8A] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#0B3C8A] disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Numbered Page Buttons */}
        {pageNumbers.map((page, idx) => {
          if (typeof page === "string") {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 py-1 text-slate-400 font-bold">
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[36px] h-9 px-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#0B3C8A] text-white shadow-sm scale-105 border border-[#0B3C8A]"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-[#D4AF37]/50"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#0B3C8A] disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-[#0B3C8A] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
