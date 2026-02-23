"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PasswordInput } from "@/components/ui/Input";
import { confirmPasswordReset } from "@/lib/api";
import { ArrowLeft, CheckCircle, AlertCircle, Lock } from "lucide-react";
import Link from "next/link";

function ConfirmResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (!tokenFromUrl) {
      setTokenError(true);
    } else {
      setToken(tokenFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsSubmitting(true);

    try {
      await confirmPasswordReset(token, password, passwordConfirm);
      setSuccess(true);
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      if (err.message.includes("expired") || err.message.includes("Invalid")) {
        setError(
          "This reset link has expired or is invalid. Please request a new one.",
        );
        setTokenError(true);
      } else {
        setError(err.message || "Failed to reset password. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (tokenError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Invalid or Expired Link
            </h1>
            <p className="text-gray-600 mb-6">
              This password reset link is invalid or has expired. Reset links
              expire after 1 hour for security reasons.
            </p>
            <Link
              href="/login/reset-password"
              className="inline-block w-full py-3 bg-[#09b29d] text-white rounded-full font-semibold hover:bg-[#09b29d]/90 transition-colors mb-3"
            >
              Request New Reset Link
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#09b29d] justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Password Reset Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Your password has been reset successfully. You are now being
              logged in and redirected to your dashboard...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#09b29d] mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-[#09b29d]/10 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-[#09b29d]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Reset Your Password
          </h1>
          <p className="text-gray-600 text-center">
            Enter your new password below
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <PasswordInput
            name="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <PasswordInput
            name="passwordConfirm"
            placeholder="Confirm new password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />

          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold mb-1">Password requirements:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>At least 8 characters long</li>
              <li>Both passwords must match</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#09b29d] text-white rounded-full font-semibold hover:bg-[#09b29d]/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "RESETTING PASSWORD..." : "RESET PASSWORD"}
          </button>

          <p className="text-center text-gray-600 text-sm">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-[#09b29d] font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function ConfirmResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#09b29d]"></div>
        </div>
      }
    >
      <ConfirmResetPasswordContent />
    </Suspense>
  );
}
