"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { LayoutDashboard, Users, HandCoins, Mail, ShieldCheck, BarChart3 } from "lucide-react";
import { getAdminStats, getAdminAnalytics } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { SkeletonStatCards } from "@/components/admin/Skeleton";
import AnalyticsCharts, { RangeSelector } from "@/components/admin/AnalyticsCharts";

const ROLE_LABELS = {
  super_admin: "Super Admin",
  admin: "Admin",
  finance_head: "Finance Head",
  marketing: "Marketing",
  it: "IT",
};

const ANALYTICS_ROLES = ["super_admin", "admin", "finance_head", "it"];

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(null);

  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [analyticsError, setAnalyticsError] = useState(null);
  const [days, setDays] = useState(30);

  const canSeeStats = ["super_admin", "admin", "finance_head"].includes(user?.role);
  const canSeeAnalytics = ANALYTICS_ROLES.includes(user?.role);

  // Load headline stats
  useEffect(() => {
    if (!canSeeStats) {
      setStatsLoading(false);
      return;
    }
    let cancelled = false;
    setStatsLoading(true);
    getAdminStats()
      .then((d) => !cancelled && setStats(d))
      .catch((e) => !cancelled && setStatsError(e.message))
      .finally(() => !cancelled && setStatsLoading(false));
    return () => {
      cancelled = true;
    };
  }, [canSeeStats]);

  // Load analytics charts
  useEffect(() => {
    if (!canSeeAnalytics) {
      setAnalyticsLoading(false);
      return;
    }
    let cancelled = false;
    setAnalyticsLoading(true);
    setAnalyticsError(null);
    getAdminAnalytics(days)
      .then((d) => !cancelled && setAnalytics(d))
      .catch((e) => !cancelled && setAnalyticsError(e.message))
      .finally(() => !cancelled && setAnalyticsLoading(false));
    return () => {
      cancelled = true;
    };
  }, [canSeeAnalytics, days]);

  return (
    <>
      <PageHeader
        title={`Welcome, ${user?.fullname || "Admin"}`}
        subtitle={`Signed in as ${ROLE_LABELS[user?.role] || user?.role || ""}`}
        actions={canSeeAnalytics ? <RangeSelector value={days} onChange={setDays} /> : null}
      />

      <main className="p-6">
        {statsError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
            {statsError}
          </div>
        )}

        {canSeeStats ? (
          statsLoading ? (
            <SkeletonStatCards count={5} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <StatCard label="Total Donors" value={stats?.totalDonors ?? 0} icon={Users} />
              <StatCard label="Active Donors" value={stats?.activeDonors ?? 0} icon={Users} />
              <StatCard label="Total Donations" value={stats?.totalDonations ?? 0} icon={HandCoins} />
              <StatCard
                label="Revenue Collected"
                value={`$${(stats?.totalAmount || 0).toLocaleString()}`}
                icon={HandCoins}
                accent
              />
              <StatCard label="Team Members" value={stats?.teamCount ?? 0} icon={ShieldCheck} />
            </div>
          )
        ) : (
          <div className="mb-8 p-5 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800">
            Headline stats are restricted for your role. Use the sidebar to access the sections available to you.
          </div>
        )}

        {canSeeStats && stats?.pendingInvites > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
            <Mail className="text-yellow-700" size={18} />
            <p className="text-sm text-yellow-900">
              <span className="font-semibold">{stats.pendingInvites}</span> pending team invitation
              {stats.pendingInvites === 1 ? "" : "s"}.
            </p>
          </div>
        )}

        {canSeeAnalytics ? (
          <>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
                <BarChart3 size={16} /> Insights — Last {days} days
              </h2>
              <Link
                href="/admin/analytics"
                className="text-xs font-medium text-[var(--color-tertiary)] hover:underline"
              >
                View full analytics →
              </Link>
            </div>

            {analyticsError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                {analyticsError}
              </div>
            )}

            {analyticsLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <div className="animate-pulse bg-gray-200 h-3 w-32 rounded mb-4" />
                    <div className="animate-pulse bg-gray-100 h-56 w-full rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <AnalyticsCharts data={analytics} layout="compact" />
            )}
          </>
        ) : (
          <EmptyState
            title="Analytics restricted"
            description="Your role does not have access to the analytics charts."
            icon={LayoutDashboard}
          />
        )}
      </main>
    </>
  );
}

function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</h3>
        {Icon && <Icon className="text-gray-300" size={18} />}
      </div>
      <p className={`text-2xl font-bold mt-2 ${accent ? "text-[var(--color-secondary)]" : "text-gray-900"}`}>
        {value}
      </p>
    </div>
  );
}
