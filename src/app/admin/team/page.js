"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import InviteMemberModal from "@/components/admin/InviteMemberModal";
import RoleGuard from "@/components/admin/RoleGuard";
import DetailModal, { DetailField, DetailGrid } from "@/components/admin/DetailModal";
import { SkeletonTable } from "@/components/admin/Skeleton";
import {
  Shield,
  ShieldAlert,
  Trash2,
  Clock,
  UserPlus,
  Crown,
  Save,
  PowerOff,
  Power,
  Lock,
} from "lucide-react";
import {
  getAdminTeam,
  revokeTeamInvite,
  updateTeamMember,
  exportAdminResource,
} from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const ROLE_LABELS = {
  super_admin: "Super Admin",
  admin: "Admin",
  finance_head: "Finance Head",
  marketing: "Marketing",
  it: "IT",
};

const EDITABLE_ROLES = [
  { value: "admin", label: "Admin" },
  { value: "finance_head", label: "Finance Head" },
  { value: "marketing", label: "Marketing" },
  { value: "it", label: "IT" },
];

const roleBadgeColor = {
  super_admin: "bg-yellow-100 text-yellow-700",
  admin: "bg-blue-100 text-blue-700",
  finance_head: "bg-green-100 text-green-700",
  marketing: "bg-pink-100 text-pink-700",
  it: "bg-gray-100 text-gray-700",
};

function TeamInner() {
  const { user } = useAuth();
  const [team, setTeam] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [pendingChanges, setPendingChanges] = useState({}); // adminId -> { role, department }
  const [savingId, setSavingId] = useState(null);
  const [selected, setSelected] = useState(null);

  const canInvite = ["super_admin", "admin"].includes(user?.role);
  const canEdit = canInvite;

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminTeam();
      setTeam(data.team || []);
      setPendingInvites(data.pendingInvites || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleRevoke = async (inviteId) => {
    if (!confirm("Revoke this invitation? The link will stop working.")) return;
    try {
      await revokeTeamInvite(inviteId);
      await load();
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePendingChange = (memberId, field, value) => {
    setPendingChanges((prev) => ({
      ...prev,
      [memberId]: { ...(prev[memberId] || {}), [field]: value },
    }));
  };

  const handleSave = async (member) => {
    const changes = pendingChanges[member.id];
    if (!changes) return;
    setSavingId(member.id);
    try {
      await updateTeamMember(member.id, changes);
      setPendingChanges((prev) => {
        const next = { ...prev };
        delete next[member.id];
        return next;
      });
      await load();
    } catch (err) {
      alert(err.message);
    } finally {
      setSavingId(null);
    }
  };

  const handleToggleActive = async (member) => {
    const verb = member.isActive ? "deactivate" : "reactivate";
    if (!confirm(`Are you sure you want to ${verb} ${member.fullname}?`)) return;
    setSavingId(member.id);
    try {
      await updateTeamMember(member.id, { isActive: !member.isActive });
      await load();
    } catch (err) {
      alert(err.message);
    } finally {
      setSavingId(null);
    }
  };

  const isMemberLocked = (member) => {
    // Super admins are locked. Self is locked. (Admins can't edit other admins? Spec says they can.)
    if (member.role === "super_admin") return true;
    if (member.id === user?.id) return true;
    return false;
  };

  const renderMemberRow = (member) => {
    const locked = isMemberLocked(member);
    const draft = pendingChanges[member.id] || {};
    const currentRole = draft.role ?? member.role;
    const currentDept = draft.department ?? (member.department || "");
    const hasChanges = Object.keys(draft).length > 0;
    const isSuperAdmin = member.role === "super_admin";
    const isSelf = member.id === user?.id;

    // Stop bubbling on interactive controls so they don't trigger the row click
    const stop = (e) => e.stopPropagation();

    return (
      <tr
        key={member.id}
        onClick={() => setSelected(member)}
        className="hover:bg-gray-50 cursor-pointer transition"
      >
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{member.fullname}</span>
            {isSuperAdmin && <Crown className="text-yellow-500" size={14} />}
            {isSelf && <span className="text-[10px] uppercase tracking-wider bg-gray-200 text-gray-600 px-1.5 rounded">you</span>}
          </div>
          <div className="text-xs text-gray-500">{member.email}</div>
        </td>
        <td className="px-4 py-3">
          {locked || !canEdit ? (
            <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${roleBadgeColor[member.role] || "bg-gray-100 text-gray-700"}`}>
              {ROLE_LABELS[member.role] || member.role}
            </span>
          ) : (
            <select
              value={currentRole}
              onClick={stop}
              onChange={(e) => handlePendingChange(member.id, "role", e.target.value)}
              disabled={savingId === member.id}
              className="px-2 py-1 text-sm bg-white border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            >
              {EDITABLE_ROLES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          )}
        </td>
        <td className="px-4 py-3">
          {locked || !canEdit ? (
            <span className="text-sm text-gray-600">{member.department || "—"}</span>
          ) : (
            <input
              type="text"
              value={currentDept}
              onClick={stop}
              onChange={(e) => handlePendingChange(member.id, "department", e.target.value)}
              disabled={savingId === member.id}
              placeholder="—"
              className="px-2 py-1 text-sm w-32 bg-white border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          )}
        </td>
        <td className="px-4 py-3">
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${member.isActive ? "text-green-700" : "text-gray-400"}`}>
            <span className={`w-2 h-2 rounded-full ${member.isActive ? "bg-green-500" : "bg-gray-300"}`} />
            {member.isActive ? "Active" : "Disabled"}
          </span>
        </td>
        <td className="px-4 py-3 text-sm text-gray-500">
          {member.lastLoginAt ? new Date(member.lastLoginAt).toLocaleDateString() : "—"}
        </td>
        <td className="px-4 py-3">
          {locked ? (
            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
              <Lock size={12} /> {isSelf ? "Self" : "Protected"}
            </span>
          ) : canEdit ? (
            <div className="flex items-center gap-1" onClick={stop}>
              <button
                onClick={(e) => { e.stopPropagation(); handleSave(member); }}
                disabled={!hasChanges || savingId === member.id}
                className="flex items-center gap-1 px-2.5 py-1 text-xs bg-[var(--color-secondary)] text-[var(--color-primary)] font-semibold rounded-md hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
                title="Save changes"
              >
                <Save size={12} />
                {savingId === member.id ? "..." : "Save"}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleToggleActive(member); }}
                disabled={savingId === member.id}
                className={`p-1.5 rounded-md transition ${member.isActive ? "text-red-600 hover:bg-red-50" : "text-green-600 hover:bg-green-50"}`}
                title={member.isActive ? "Deactivate" : "Reactivate"}
              >
                {member.isActive ? <PowerOff size={14} /> : <Power size={14} />}
              </button>
            </div>
          ) : (
            <span className="text-xs text-gray-400">—</span>
          )}
        </td>
      </tr>
    );
  };

  return (
    <>
      <PageHeader
        title="Team & RBAC"
        subtitle="Manage admin team members, roles, and pending invitations"
        actions={
          <>
            <button
              onClick={() => exportAdminResource("team", "csv")}
              className="px-3 py-1.5 border border-gray-300 text-gray-800 font-medium rounded-full hover:bg-gray-100 transition text-sm"
            >
              Export CSV
            </button>
            <button
              onClick={() => exportAdminResource("team", "pdf")}
              className="px-3 py-1.5 border border-gray-300 text-gray-800 font-medium rounded-full hover:bg-gray-100 transition text-sm"
            >
              Export PDF
            </button>
            {canInvite && (
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-secondary)] text-[var(--color-primary)] font-semibold rounded-full hover:opacity-90 transition text-sm"
              >
                <UserPlus size={14} /> Invite
              </button>
            )}
          </>
        }
      />
      <main className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <SkeletonTable columns={6} rows={5} />
        ) : team.length === 0 && pendingInvites.length === 0 ? (
          <EmptyState
            title="No team members yet"
            description={canInvite ? "Invite your first team member to get started." : "Only Super Admins or Admins can invite team members."}
            icon={ShieldAlert}
          />
        ) : (
          <>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto mb-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b">
                    <th className="px-4 py-3 font-medium">Member</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium">Department</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Last Login</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {team.map(renderMemberRow)}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mb-8">
              Showing all <span className="font-semibold">{team.length}</span> team member{team.length === 1 ? "" : "s"}.
            </p>

            {pendingInvites.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Clock size={18} /> Pending Invitations ({pendingInvites.length})
                </h3>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
                  {pendingInvites.map((inv) => {
                    const label = ROLE_LABELS[inv.role] || inv.role.replace("_", " ");
                    const expires = new Date(inv.expiresAt);
                    return (
                      <div
                        key={inv._id}
                        onClick={() => setSelected({ ...inv, _isInvite: true })}
                        className="flex items-center justify-between p-4 flex-wrap gap-3 cursor-pointer hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="bg-yellow-50 p-2 rounded-full">
                            <Shield className="text-yellow-600" size={18} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">{inv.fullname}</p>
                            <p className="text-sm text-gray-500 truncate">{inv.email}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {label} · expires {expires.toLocaleDateString()} · invited by {inv.invitedBy?.fullname || "—"}
                            </p>
                          </div>
                        </div>
                        {canInvite && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleRevoke(inv._id); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 size={14} /> Revoke
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <InviteMemberModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onInvited={load}
      />

      <DetailModal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.fullname || "Team Member"}
        subtitle={selected?._isInvite ? "Pending invitation" : ROLE_LABELS[selected?.role] || selected?.role}
      >
        {selected && (
          <DetailGrid>
            <DetailField label={selected._isInvite ? "Invite ID" : "Admin ID"} value={selected._isInvite ? selected._id : selected.id} mono />
            <DetailField
              label="Role"
              value={
                <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${roleBadgeColor[selected.role] || "bg-gray-100 text-gray-700"}`}>
                  {ROLE_LABELS[selected.role] || selected.role}
                </span>
              }
            />
            <DetailField label="Full Name" value={selected.fullname} />
            <DetailField label="Email" value={selected.email} />
            <DetailField label="Department" value={selected.department} />
            {selected._isInvite ? (
              <>
                <DetailField label="Status" value={selected.status} />
                <DetailField
                  label="Expires"
                  value={selected.expiresAt ? new Date(selected.expiresAt).toLocaleString() : null}
                />
                <DetailField label="Invited By" value={selected.invitedBy?.fullname} />
                <DetailField label="Invited By Email" value={selected.invitedBy?.email} />
                <DetailField
                  label="Created"
                  value={selected.createdAt ? new Date(selected.createdAt).toLocaleString() : null}
                />
                {selected.personalMessage && (
                  <DetailField label="Personal Message" value={selected.personalMessage} full />
                )}
              </>
            ) : (
              <>
                <DetailField label="Active" value={selected.isActive ? "Yes" : "No"} />
                <DetailField
                  label="Last Login"
                  value={selected.lastLoginAt ? new Date(selected.lastLoginAt).toLocaleString() : "Never"}
                />
                <DetailField
                  label="Joined"
                  value={selected.createdAt ? new Date(selected.createdAt).toLocaleString() : null}
                />
              </>
            )}
          </DetailGrid>
        )}
      </DetailModal>
    </>
  );
}

export default function TeamPage() {
  return (
    <RoleGuard allow={["super_admin", "admin"]}>
      <TeamInner />
    </RoleGuard>
  );
}
