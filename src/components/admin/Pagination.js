"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pagination + total-count footer for list views.
 * Props:
 * - currentPage, totalPages, totalRecords, pageSize, shown
 * - onPageChange(newPage)
 */
export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalRecords = 0,
  pageSize = 20,
  shown = 0,
  onPageChange,
}) {
  const from = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = (currentPage - 1) * pageSize + shown;
  const hasMore = totalRecords > shown && currentPage < totalPages;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 mt-3 bg-white rounded-xl border border-gray-200 shadow-sm">
      <p className="text-sm text-gray-600">
        Showing <span className="font-semibold text-gray-900">{from}–{to}</span> of{" "}
        <span className="font-semibold text-gray-900">{totalRecords.toLocaleString()}</span>
        {hasMore && (
          <span className="ml-2 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
            {totalRecords - shown} more not shown
          </span>
        )}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={14} /> Prev
        </button>
        <span className="text-sm text-gray-500">
          Page <span className="font-semibold text-gray-900">{currentPage}</span> / {totalPages || 1}
        </span>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
