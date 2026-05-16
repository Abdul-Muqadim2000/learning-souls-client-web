"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import RoleGuard from "@/components/admin/RoleGuard";
import DetailModal, { DetailField, DetailGrid } from "@/components/admin/DetailModal";
import Pagination from "@/components/admin/Pagination";
import { SkeletonTable } from "@/components/admin/Skeleton";
import { HandCoins, Filter } from "lucide-react";
import { getAdminDonations, exportAdminResource } from "@/lib/api";

const PAGE_SIZE = 20;
const DONATION_TYPES = ["Lillah", "Khairat", "Kafarah", "Zakat"];
const DONATION_STATUSES = ["pending", "processing", "succeeded", "failed", "cancelled"];

const statusBadgeColor = {
  succeeded: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  failed: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-700",
};

function DonationsInner() {
  const [data, setData] = useState({ donations: [], totalPages: 1, currentPage: 1, totalRecords: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    donationType: "",
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
    search: "",
  });

  const cleanFilters = () => {
    const out = {};
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== "" && v != null) out[k] = v;
    });
    return out;
  };

  const loadDonations = async (p = page) => {
    setLoading(true);
    try {
      const res = await getAdminDonations(p, PAGE_SIZE, cleanFilters());
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleFilterChange = (field, value) => {
    setFilters((f) => ({ ...f, [field]: value }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    if (page !== 1) setPage(1);
    else loadDonations(1);
  };

  const handleReset = () => {
    setFilters({ status: "", donationType: "", startDate: "", endDate: "", minAmount: "", maxAmount: "", search: "" });
    if (page !== 1) setPage(1);
    else setTimeout(() => loadDonations(1), 0);
  };

  return (
    <>
      <PageHeader
        title="Donations Records"
        subtitle="Filter, inspect, and export donation transactions"
        actions={
          <>
            <button
              onClick={() => exportAdminResource("donations", "csv", cleanFilters())}
              className="px-3 py-1.5 border border-gray-300 text-gray-800 font-medium rounded-full hover:bg-gray-100 transition text-sm"
            >
              Export CSV
            </button>
            <button
              onClick={() => exportAdminResource("donations", "pdf", cleanFilters())}
              className="px-3 py-1.5 border border-gray-300 text-gray-800 font-medium rounded-full hover:bg-gray-100 transition text-sm"
            >
              Export PDF
            </button>
          </>
        }
      />
      <main className="p-6">
        <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2 mb-3">
          <Filter size={16} /> Filters
        </h2>
        <form onSubmit={handleApply} className="bg-white p-4 mb-6 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Donor name / email</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
              placeholder="Search..."
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none"
            >
              <option value="">All</option>
              {DONATION_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
            <select
              value={filters.donationType}
              onChange={(e) => handleFilterChange("donationType", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none"
            >
              <option value="">All</option>
              {DONATION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">End Date</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Min Amount</label>
            <input
              type="number"
              min="0"
              value={filters.minAmount}
              onChange={(e) => handleFilterChange("minAmount", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Max Amount</label>
            <input
              type="number"
              min="0"
              value={filters.maxAmount}
              onChange={(e) => handleFilterChange("maxAmount", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none"
              placeholder="No limit"
            />
          </div>
          <div className="flex items-end gap-2">
            <button type="submit" className="flex-1 px-3 py-2 text-sm bg-[var(--color-secondary)] text-[var(--color-primary)] font-semibold rounded-lg hover:opacity-90 transition">
              Apply
            </button>
            <button type="button" onClick={handleReset} className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              Reset
            </button>
          </div>
        </form>

        {loading ? (
          <SkeletonTable columns={5} rows={6} />
        ) : data?.donations?.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b">
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Donor</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {data.donations.map((donation) => (
                  <tr
                    key={donation._id}
                    onClick={() => setSelected(donation)}
                    className="hover:bg-gray-50 cursor-pointer transition"
                  >
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {donation.userId?.fullname || "Anonymous"}
                      <div className="text-xs text-gray-500 font-normal">{donation.userId?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-800 font-semibold">
                      {donation.currency} {Number(donation.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${statusBadgeColor[donation.status] || "bg-gray-100 text-gray-700"}`}>
                        {donation.status || "completed"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{donation.donationType || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No donations match your filters"
            description="Try clearing or widening the filters to see more results."
            icon={HandCoins}
          />
        )}

        {!loading && data?.donations?.length > 0 && (
          <Pagination
            currentPage={data.currentPage}
            totalPages={data.totalPages}
            totalRecords={data.totalRecords ?? data.donations.length}
            pageSize={PAGE_SIZE}
            shown={data.donations.length}
            onPageChange={setPage}
          />
        )}
      </main>

      <DetailModal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `Donation ${selected.currency} ${Number(selected.amount).toFixed(2)}` : "Donation"}
        subtitle={selected ? `From ${selected.userId?.fullname || "Anonymous"} on ${new Date(selected.createdAt).toLocaleString()}` : ""}
      >
        {selected && (
          <div className="space-y-5">
            <DetailGrid>
              <DetailField label="Donation ID" value={selected._id} mono />
              <DetailField
                label="Status"
                value={
                  <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${statusBadgeColor[selected.status] || "bg-gray-100 text-gray-700"}`}>
                    {selected.status}
                  </span>
                }
              />
              <DetailField label="Donor Name" value={selected.userId?.fullname} />
              <DetailField label="Donor Email" value={selected.userId?.email} />
              <DetailField label="Type" value={selected.donationType} />
              <DetailField label="Frequency" value={selected.donationFrequency} />
              <DetailField
                label="Amount"
                value={`${selected.currency} ${Number(selected.amount).toFixed(2)}`}
              />
              <DetailField label="Payment Method" value={selected.paymentMethod} />
              <DetailField label="Payment Intent ID" value={selected.paymentIntentId} mono />
              <DetailField label="Transaction ID" value={selected.transactionId} mono />
              <DetailField
                label="Created"
                value={new Date(selected.createdAt).toLocaleString()}
              />
              <DetailField
                label="Updated"
                value={new Date(selected.updatedAt).toLocaleString()}
              />
            </DetailGrid>

            {selected.projects?.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
                  Projects ({selected.projects.length})
                </h4>
                <div className="bg-gray-50 rounded-lg border border-gray-200 divide-y divide-gray-200">
                  {selected.projects.map((p, idx) => (
                    <div key={idx} className="flex justify-between items-center px-3 py-2">
                      <span className="text-sm text-gray-800">{p.name}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {selected.currency} {Number(p.amount).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DetailModal>
    </>
  );
}

export default function DonationsPage() {
  return (
    <RoleGuard allow={["super_admin", "admin", "finance_head"]}>
      <DonationsInner />
    </RoleGuard>
  );
}