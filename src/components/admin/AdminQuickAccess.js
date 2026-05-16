"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminQuickAccess() {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading || !isAuthenticated || !user) return null;

  const isAdmin = ["admin", "super_admin", "finance_head"].includes(user.role);
  if (!isAdmin) return null;

  return (
    <Link
      href="/admin"
      title="Access Admin Dashboard"
      className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-14 h-14 bg-[var(--color-tertiary)] text-white rounded-full shadow-xl hover:bg-black transition-all duration-300 hover:scale-105"
    >
      <Shield size={24} />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-secondary)] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-secondary)] border border-white"></span>
      </span>
    </Link>
  );
}