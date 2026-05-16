"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLayoutWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, loading, user } = useAuth();
  const isLoginPage = pathname === "/admin/login";
  const isRegisterPage = pathname === "/admin/register";
  const isInviteAcceptPage = pathname === "/admin/invite/accept";
  const isPublicPage = isLoginPage || isRegisterPage || isInviteAcceptPage;

  useEffect(() => {
    if (!loading && !isPublicPage) {
      if (!isAuthenticated) {
        router.push("/admin/login");
      } else if (!["admin", "super_admin", "finance_head", "marketing", "it"].includes(user?.role)) {
        router.push("/admin/login"); // or show a 403 page
      }
    }
  }, [isAuthenticated, loading, isPublicPage, router, user]);

  const isAuthorized = isAuthenticated && ["admin", "super_admin", "finance_head", "marketing", "it"].includes(user?.role);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 font-medium animate-pulse">Loading Portal...</p>
      </div>
    );
  }

  // Prevent flash of the dashboard contents before the router officially pushes the new route
  if (!isPublicPage && !isAuthorized) {
    return (
      <div className="h-screen w-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 font-medium animate-pulse">Redirecting...</p>
      </div>
    );
  }

  if (isPublicPage) {
    return <div className="h-screen w-screen bg-gray-50 flex items-center justify-center">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden md:ml-64">
        {children}
      </div>
    </div>
  );
}