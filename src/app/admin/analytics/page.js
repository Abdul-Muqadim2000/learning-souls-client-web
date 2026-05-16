"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/admin/PageHeader";
import RoleGuard from "@/components/admin/RoleGuard";
import { SkeletonStatCards } from "@/components/admin/Skeleton";
import AnalyticsCharts, { RangeSelector } from "@/components/admin/AnalyticsCharts";
import { TrendingUp, Users, HandCoins } from "lucide-react";
import { getAdminAnalytics } from "@/lib/api";

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

function AnalyticsInner() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getAdminAnalytics(days)
      .then((d) => !cancelled && setData(d))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [days]);

  const headline = data?.headline;

  return (
    <>
      <PageHeader
        title="Platform Analytics"
        subtitle={`Donation trends and donor insights over the last ${days} days`}
        actions={<RangeSelector value={days} onChange={setDays} />}
      />

      <main className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <SkeletonStatCards count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total Donors" value={(headline?.totalDonors ?? 0).toLocaleString()} icon={Users} />
            <StatCard label={`New Donors (${days}d)`} value={(headline?.newDonors ?? 0).toLocaleString()} icon={TrendingUp} />
            <StatCard label={`Donations (${days}d)`} value={(headline?.donationsCount ?? 0).toLocaleString()} icon={HandCoins} />
            <StatCard
              label={`Revenue (${days}d)`}
              value={`$${(headline?.revenue || 0).toLocaleString()}`}
              icon={HandCoins}
              accent
            />
          </div>
        )}

        {!loading && data && <AnalyticsCharts data={data} layout="full" />}
      </main>
    </>
  );
}

export default function AnalyticsPage() {
  return (
    <RoleGuard allow={["super_admin", "admin", "finance_head", "it"]}>
      <AnalyticsInner />
    </RoleGuard>
  );
}
