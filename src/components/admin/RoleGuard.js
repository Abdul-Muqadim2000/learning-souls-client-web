"use client";

import { useAuth } from "@/contexts/AuthContext";
import { ShieldOff } from "lucide-react";
import Link from "next/link";

export default function RoleGuard({ allow, children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Checking permissions...</div>
    );
  }

  if (!allow.includes(user?.role)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <ShieldOff className="text-red-500" size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Access denied</h2>
        <p className="text-sm text-gray-500 mt-2 max-w-md">
          Your role ({user?.role || "unknown"}) does not have permission to view this page.
        </p>
        <Link
          href="/admin"
          className="mt-5 px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-primary)] font-semibold rounded-full text-sm hover:opacity-90 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return children;
}
