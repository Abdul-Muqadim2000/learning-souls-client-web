"use client";

import { UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBell from "./NotificationBell";

/**
 * Unified, sticky header for every admin page.
 *
 * Layout:
 *   [ title + subtitle ]        [ actions ] [ bell ] [ user pill ]
 *
 * Sticks to the top of the scrolling content area, replacing the previous
 * AdminHeader. Actions slot is right-aligned and consistent across pages.
 *
 * Props:
 *   - title: string (required)
 *   - subtitle?: string
 *   - actions?: ReactNode (buttons, etc.)
 */
export default function PageHeader({ title, subtitle, actions }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between gap-4 px-6 py-3 md:py-4 pl-16 md:pl-6 min-h-[64px] flex-wrap">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight truncate">{title}</h1>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5 truncate">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
          <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block" />
          <NotificationBell />
          <button className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors bg-white shadow-sm">
            <UserCircle size={22} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {user?.fullname || "Admin"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
