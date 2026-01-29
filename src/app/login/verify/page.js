"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function VerifyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, refreshUser } = useAuth();

  const [challengeId, setChallengeId] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get challengeId from URL params
    const id = searchParams.get("challengeId");
    if (id) {
      setChallengeId(id);
    } else {
      // If no challengeId, redirect back to login
      router.push("/login");
    }
  }, [searchParams, router]);

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow digits and limit to 6 characters
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter the verification code");
      return;
    }

    if (otp.length < 6) {
      setError("Code must be 6 digits");
      return;
    }

    if (!challengeId) {
      setError("Invalid session. Please login again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/mfa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challengeId,
          code: otp,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "OTP verification failed");
      }

      const data = await response.json();
      console.log("Verification successful:", data);
      // Store the access token
      if (data.data?.tokens) {
        localStorage.setItem("accessToken", data.data.tokens);
        // Refresh user context to load user data
        await refreshUser();

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        setError("Verification succeeded but no access token received");
      }
    } catch (err) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 py-22 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#09b29d]/10 rounded-full flex items-center justify-center">
              <Mail className="w-10 h-10 text-[#09b29d]" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Verify Your Email
            </h1>
            <p className="text-gray-600">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <Input
              type="text"
              name="otp"
              placeholder="000000"
              value={otp}
              onChange={handleOtpChange}
              error={error}
              maxLength={6}
              className="text-center text-2xl tracking-widest font-mono"
              autoComplete="one-time-code"
              inputMode="numeric"
              required
              autoFocus
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || otp.length < 6}
              className="w-full py-4 bg-[#09b29d] text-white rounded-full font-semibold hover:bg-[#09b29d]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Verifying..." : "Verify Code"}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-4">
              For your security, this code will expire in 10 minutes
            </p>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-[#09b29d] inline-flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-gray-600">Loading...</div>
        </div>
      }
    >
      <VerifyPageContent />
    </Suspense>
  );
}
