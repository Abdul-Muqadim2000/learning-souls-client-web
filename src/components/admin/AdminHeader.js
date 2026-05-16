"use client";
import { UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBell from "./NotificationBell";

export default function AdminHeader({ title = "Dashboard" }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm md:h-16 h-20 pl-16 md:pl-6">
      <h1 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h1>

      <div className="flex items-center gap-4">
        <NotificationBell />

        <button className="flex items-center gap-2 p-1 pl-3 pr-4 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors bg-white shadow-sm">
          <UserCircle size={24} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {user?.fullname || "Admin"}
          </span>
        </button>
      </div>
    </header>
  );
}
