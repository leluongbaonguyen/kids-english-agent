import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function PaginationControl({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 12,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [12, 24, 48, 96],
  itemLabel = 'mục'
}) {
  if (totalPages <= 1 && totalItems <= pageSize) return null;

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers with ellipses
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3 px-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg text-white text-xs select-none">
      
      {/* ITEMS COUNT SUMMARY */}
      <div className="flex items-center gap-2 text-slate-300 font-bold">
        <span>
          Hiển thị <strong className="text-cyan-300 font-mono-code">{startItem} - {endItem}</strong> / <strong className="text-amber-300 font-mono-code">{totalItems}</strong> {itemLabel}
        </span>

        {/* Optional Page Size Selector */}
        {onPageSizeChange && (
          <div className="flex items-center gap-1 ml-2">
            <span className="text-[11px] text-slate-400 font-bold">Cỡ trang:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="bg-slate-950 border border-slate-700 text-cyan-300 font-bold rounded-lg px-2 py-1 text-xs cursor-pointer focus:outline-none"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} / trang
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* PAGE BUTTONS */}
      <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-0.5">
        {/* First Page */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          title="Trang đầu"
          className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>

        {/* Previous Page */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          title="Trang trước"
          className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((pg, idx) => {
          if (pg === '...') {
            return (
              <span key={`dots-${idx}`} className="px-2 py-1 text-slate-500 font-mono-code">
                ...
              </span>
            );
          }

          const isActive = pg === currentPage;
          return (
            <button
              key={pg}
              onClick={() => onPageChange(pg)}
              className={`min-w-[32px] h-8 px-2.5 rounded-xl font-black text-xs transition cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md scale-105 border border-cyan-300'
                  : 'bg-slate-800/80 text-slate-300 border border-slate-700/80 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {pg}
            </button>
          );
        })}

        {/* Next Page */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          title="Trang sau"
          className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Last Page */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          title="Trang cuối"
          className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
}
