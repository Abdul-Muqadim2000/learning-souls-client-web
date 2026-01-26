"use client";

import { useAuth } from "@/contexts/AuthContext";
import { PrimaryButton } from "@/components/ui/Button";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome to Your Dashboard
                </h1>
                <p className="text-gray-600">{user?.email || "User"}</p>
              </div>
              <PrimaryButton onClick={logout}>Logout</PrimaryButton>
            </div>
          </div>

          {/* User Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Profile Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-gray-800 font-medium">
                    {user?.username || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800 font-medium">
                    {user?.email || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <p className="text-gray-600">
                  This is a protected route. Only authenticated users can access
                  this page.
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  You can add more features and functionality here based on your
                  application needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
