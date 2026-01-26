"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import OTPForm from "@/components/OTPForm";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const { login, verifyMFA, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");

  // State for OTP flow
  const [showOTP, setShowOTP] = useState(false);
  const [challengeId, setChallengeId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get("redirect") || "/dashboard";
      router.push(redirect);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleLogin = async (formData) => {
    setError("");

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Show OTP form with challengeId
      // Handle nested data structure from API response
      setChallengeId(result.data.data || result.data.challengeId);
      setShowOTP(true);
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
  };

  const handleOTPSubmit = async (otpData) => {
    setOtpError("");

    const result = await verifyMFA(otpData.challengeId, otpData.code);

    if (result.success) {
      const redirect = searchParams.get("redirect") || "/dashboard";
      router.push(redirect);
    } else {
      setOtpError(result.error || "Verification failed. Please try again.");
      throw new Error(result.error);
    }
  };

  const handleResendOTP = () => {
    // Implement resend logic if needed
    console.log("Resend OTP requested");
  };

  // If OTP form should be shown
  if (showOTP && challengeId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {otpError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {otpError}
            </div>
          )}
          <OTPForm
            challengeId={challengeId}
            onSubmit={handleOTPSubmit}
            onResend={handleResendOTP}
          />
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setShowOTP(false);
                setChallengeId(null);
              }}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <LoginForm onSubmit={handleLogin} />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
