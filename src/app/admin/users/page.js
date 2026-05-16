"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import RoleGuard from "@/components/admin/RoleGuard";
import DetailModal, { DetailField, DetailGrid } from "@/components/admin/DetailModal";
import Pagination from "@/components/admin/Pagination";
import { SkeletonTable } from "@/components/admin/Skeleton";
import { Users } from "lucide-react";
import { getAdminDonors, exportAdminResource } from "@/lib/api";

const PAGE_SIZE = 20;

function DonorsInner() {
  const [data, setData] = useState({ donors: [], totalPages: 1, currentPage: 1, totalRecords: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const load = async (p = page) => {
    setLoading(true);
    try {
      const res = await getAdminDonors(p, PAGE_SIZE);
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <PageHeader
        title="Donor Management"
        subtitle="Click any donor to see their full details"
        actions={
          <>
            <button
              onClick={() => exportAdminResource("donors", "csv")}
              className="px-3 py-1.5 border border-gray-300 text-gray-800 font-medium rounded-full hover:bg-gray-100 transition text-sm"
            >
              Export CSV
            </button>
            <button
              onClick={() => exportAdminResource("donors", "pdf")}
              className="px-3 py-1.5 border border-gray-300 text-gray-800 font-medium rounded-full hover:bg-gray-100 transition text-sm"
            >
              Export PDF
            </button>
          </>
        }
      />
      <main className="p-6">
        {loading ? (
          <SkeletonTable columns={5} rows={6} />
        ) : data?.donors?.length > 0 ? (
          <>
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b">
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Email</th>
                    <th className="px-6 py-3 font-medium">Country</th>
                    <th className="px-6 py-3 font-medium">Joined</th>
                    <th className="px-6 py-3 font-medium">Verified</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {data.donors.map((donor) => (
                    <tr
                      key={donor._id}
                      onClick={() => setSelected(donor)}
                      className="hover:bg-gray-50 cursor-pointer transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">{donor.fullname}</td>
                      <td className="px-6 py-4 text-gray-600">{donor.email}</td>
                      <td className="px-6 py-4 text-gray-600">{donor.country || "—"}</td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(donor.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className={`h-2.5 w-2.5 rounded-full ${donor.isVerified ? "bg-green-500" : "bg-red-400"}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={data.currentPage}
              totalPages={data.totalPages}
              totalRecords={data.totalRecords ?? data.donors.length}
              pageSize={PAGE_SIZE}
              shown={data.donors.length}
              onPageChange={setPage}
            />
          </>
        ) : (
          <EmptyState
            title="No donors yet"
            description="Donors will appear here once they complete a donation."
            icon={Users}
          />
        )}
      </main>

      <DetailModal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.fullname || "Donor"}
        subtitle={selected?.email}
      >
        {selected && (
          <DetailGrid>
            <DetailField label="Donor ID" value={selected._id} mono />
            <DetailField
              label="Verified"
              value={selected.isVerified ? "Yes" : "No"}
            />
            <DetailField label="Email" value={selected.email} />
            <DetailField
              label="Phone"
              value={`${selected.countryCode || ""} ${selected.phone || ""}`.trim() || null}
            />
            <DetailField label="Country" value={selected.country} />
            <DetailField label="City" value={selected.city} />
            <DetailField label="Postal Code" value={selected.postalCode} />
            <DetailField label="Gift Aid" value={selected.giftAid ? "Yes" : "No"} />
            <DetailField label="Address" value={selected.addressLine} full />
            <DetailField
              label="Joined"
              value={selected.createdAt ? new Date(selected.createdAt).toLocaleString() : null}
            />
            <DetailField
              label="Last Updated"
              value={selected.updatedAt ? new Date(selected.updatedAt).toLocaleString() : null}
            />
          </DetailGrid>
        )}
      </DetailModal>
    </>
  );
}

export default function UsersPage() {
  return (
    <RoleGuard allow={["super_admin", "admin", "finance_head", "marketing"]}>
      <DonorsInner />
    </RoleGuard>
  );
}
