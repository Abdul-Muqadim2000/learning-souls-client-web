"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ShieldCheck, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { acceptTeamInvite } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

function AcceptInviteInner() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const { refreshUser } = useAuth();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("No invitation token in the URL. Please use the link from your email.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!token) return;
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      await acceptTeamInvite(token, password, passwordConfirm);
      setSuccess(true);
      await refreshUser();
      setTimeout(() => router.push("/admin"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck className="text-green-600" size={24} />
        </div>
        <h1 className="text-xl font-bold text-gray-800">Welcome to the team!</h1>
        <p className="text-sm text-gray-500 mt-2">Your account has been created. Redirecting to the admin panel...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="text-red-600" size={24} />
        </div>
        <h1 className="text-xl font-bold text-gray-800">Invalid invitation link</h1>
        <p className="text-sm text-gray-500 mt-2">{error || "This link is missing the invitation token. Please use the link from your invitation email."}</p>
        <Link href="/admin/login" className="inline-block mt-4 text-sm text-[var(--color-tertiary)] hover:underline">
          Go to admin login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Accept Invitation</h1>
        <p className="text-sm text-gray-500 mt-2">Set a password to activate your <b>Learning Souls</b> admin account.</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              required
              minLength={8}
              className="pl-10 w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              required
              minLength={8}
              className="pl-10 w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all"
              placeholder="Repeat password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 px-4 bg-[var(--color-secondary)] hover:opacity-90 text-[var(--color-primary)] font-semibold rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] transition-all flex items-center justify-center disabled:opacity-70"
        >
          {submitting ? "Creating account..." : "Accept & Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-gray-400">
        Already have an account? <Link href="/admin/login" className="text-[var(--color-tertiary)] hover:underline">Sign in</Link>
      </p>
    </div>
  );
}

export default function AcceptInvitePage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
      <AcceptInviteInner />
    </Suspense>
  );
}
