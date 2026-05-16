"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

/**
 * Generic right-side detail drawer / center modal.
 *
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - title: string
 * - subtitle?: string
 * - children: ReactNode
 * - footer?: ReactNode
 */
export default function DetailModal({ open, onClose, title, subtitle, children, footer }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-2xl max-h-[85vh] rounded-xl shadow-xl border border-gray-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start p-5 border-b border-gray-200">
          <div className="min-w-0 pr-3">
            <h2 className="text-lg font-semibold text-gray-900 truncate">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 truncate mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 -m-1 flex-shrink-0"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">{children}</div>

        {footer && (
          <div className="px-5 py-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Helper: a key-value field row used inside a DetailModal.
 */
export function DetailField({ label, value, mono = false, full = false }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <dt className="text-xs uppercase tracking-wider text-gray-400 font-medium">{label}</dt>
      <dd className={`mt-1 text-sm text-gray-800 break-words ${mono ? "font-mono" : ""}`}>
        {value === null || value === undefined || value === "" ? (
          <span className="text-gray-300">—</span>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

export function DetailGrid({ children }) {
  return <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">{children}</dl>;
}
