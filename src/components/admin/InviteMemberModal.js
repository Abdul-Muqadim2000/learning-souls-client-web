"use client";

import { useState } from "react";
import { X, Mail, User, Building, MessageSquare, Shield, Lock } from "lucide-react";
import { inviteTeamMember } from "@/lib/api";

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "finance_head", label: "Finance Head" },
  { value: "marketing", label: "Marketing" },
  { value: "it", label: "IT" },
];

export default function InviteMemberModal({ open, onClose, onInvited }) {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    role: "admin",
    department: "",
    personalMessage: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!open) return null;

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const reset = () => {
    setForm({ fullname: "", email: "", role: "admin", department: "", personalMessage: "" });
    setError(null);
    setSuccess(null);
  };

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        fullname: form.fullname.trim(),
        email: form.email.trim(),
        role: form.role,
      };
      if (form.department.trim()) payload.department = form.department.trim();
      if (form.personalMessage.trim()) payload.personalMessage = form.personalMessage.trim();

      await inviteTeamMember(payload);
      setSuccess(`Invitation sent to ${payload.email}`);
      onInvited?.();
      setTimeout(handleClose, 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl border border-gray-200">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Invite Team Member</h2>
            <p className="text-sm text-gray-500">They'll receive an email with a setup link.</p>
          </div>
          <button
            onClick={handleClose}
            disabled={submitting}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200">
              {success}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                minLength={2}
                value={form.fullname}
                onChange={(e) => handleChange("fullname", e.target.value)}
                className="pl-10 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none"
                placeholder="Jane Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="pl-10 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none"
                placeholder="jane@learningsouls.org"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="relative">
                <Shield className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <select
                  value={form.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className="pl-10 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none appearance-none"
                >
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
              <p className="mt-1 flex items-center gap-1 text-[11px] text-gray-400">
                <Lock size={10} /> Super Admin role is reserved
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department <span className="text-gray-400 font-normal">(optional)</span></label>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={form.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                  className="pl-10 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none"
                  placeholder="Operations"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Personal Message <span className="text-gray-400 font-normal">(optional)</span></label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <textarea
                rows={3}
                maxLength={500}
                value={form.personalMessage}
                onChange={(e) => handleChange("personalMessage", e.target.value)}
                className="pl-10 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none resize-none"
                placeholder="Welcome to the team!"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{form.personalMessage.length}/500</p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-primary)] font-semibold rounded-full hover:opacity-90 transition disabled:opacity-70"
            >
              {submitting ? "Sending..." : "Send Invite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
