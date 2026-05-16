"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  HandCoins,
  ShieldAlert,
  BarChart3,
  Menu,
  X,
  Settings,
  ArrowLeft,
  LogOut
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, roles: ["super_admin", "admin", "finance_head", "marketing", "it"], exact: true },
  { name: "Donations", href: "/admin/donations", icon: HandCoins, roles: ["super_admin", "admin", "finance_head"] },
  { name: "Donors", href: "/admin/users", icon: Users, roles: ["super_admin", "admin", "finance_head", "marketing"] },
  { name: "Team", href: "/admin/team", icon: ShieldAlert, roles: ["super_admin", "admin"] },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3, roles: ["super_admin", "admin", "finance_head", "it"] },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  
  const currentUserRole = user?.role || "super_admin";

  const toggleSidebar = () => setIsOpen(!isOpen);

  const filteredLinks = sidebarLinks.filter((link) => link.roles.includes(currentUserRole));

  return (
    <>
      {/* Mobile Menu Button - Visible only on mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md text-gray-700 hover:text-[var(--color-primary)]"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile when sidebar is open */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"} `}
        onClick={toggleSidebar}
      />

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo / Header */}
        <div className="flex items-center justify-center p-4 h-16 border-b border-gray-200 font-bold text-xl text-[var(--color-secondary)]">
          Admin Panel
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {filteredLinks.map((link) => {
            const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-full transition-colors font-medium ${
                  isActive
                    ? "bg-[var(--color-secondary)] text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-gray-200">
          <div className="text-xs text-gray-500 font-medium bg-gray-50 p-3">
            Role: <span className="font-bold text-gray-800 uppercase">{currentUserRole}</span>
          </div>
          <Link
            href="/"
            className="flex items-center justify-center w-full px-4 py-4 bg-[var(--color-tertiary)] text-sm text-[var(--color-primary)] font-semibold hover:bg-black transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            View Website
          </Link>
          <button
            onClick={() => logout()}
            className="flex items-center justify-center w-full px-4 py-4 bg-gray-50 text-sm text-red-600 font-semibold hover:bg-gray-400 cursor-pointer transition-colors"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}