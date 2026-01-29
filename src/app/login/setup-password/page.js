"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PasswordInput } from "@/components/ui/Input";
import { setupPassword } from "@/lib/api";
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

function SetupPasswordContent() {
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
      await setupPassword(token, password, passwordConfirm);
      setSuccess(true);
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      if (err.message.includes("expired") || err.message.includes("Invalid")) {
        setError(
          "This setup link has expired or is invalid. Please request a new one.",
        );
        setTokenError(true);
      } else {
        setError(err.message || "Failed to set up password. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (tokenError) {
    return (
      <div className=" flex items-center justify-center bg-gray-100 py-22 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Invalid or Expired Link
            </h1>
            <p className="text-gray-600 mb-6">
              This password setup link is invalid or has expired. Links expire
              after 1 hour for security reasons.
            </p>
            <Link
              href="/login/setup-password/request"
              className="inline-block w-full py-3 bg-[#09b29d] text-white rounded-full font-semibold hover:bg-[#09b29d]/90 transition-colors mb-3"
            >
              Request New Setup Link
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
      <div className="flex items-center justify-center bg-gray-100 py-22 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Password Set Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Your password has been set up. You are now logged in and will be
              redirected to your dashboard...
            </p>
            <div className="animate-pulse text-[#09b29d] text-sm">
              Redirecting...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 py-22 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#09b29d] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Your Password
          </h1>
          <p className="text-gray-600">
            Set up a secure password for your Learning Souls account. You'll use
            this to login in the future.
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
            placeholder="Password (min. 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <PasswordInput
            name="passwordConfirm"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            autoComplete="new-password"
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Password Requirements:</strong>
            </p>
            <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
              <li>At least 8 characters long</li>
              <li>Should be unique and secure</li>
              <li>Remember it for future logins</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#09b29d] text-white rounded-full font-semibold hover:bg-[#09b29d]/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "SETTING UP..." : "SET PASSWORD & LOGIN"}
          </button>

          <p className="text-center text-gray-600 text-sm">
            By setting up your password, you agree to our{" "}
            <Link
              href="/terms-and-conditions"
              className="text-[#09b29d] hover:underline"
            >
              Terms & Conditions
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function SetupPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-gray-600">Loading...</div>
        </div>
      }
    >
      <SetupPasswordContent />
    </Suspense>
  );
}
