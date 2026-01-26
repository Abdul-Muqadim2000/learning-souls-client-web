"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import OTPForm from "@/components/OTPForm";
import { useAuth } from "@/contexts/AuthContext";

const RegisterPage = () => {
  const { login, register, verifyMFA, isAuthenticated } = useAuth();
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [otpError, setOtpError] = useState("");

  // State for OTP flow
  const [showOTP, setShowOTP] = useState(false);
  const [challengeId, setChallengeId] = useState(null);
  const [authType, setAuthType] = useState(null); // 'login' or 'register'

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (data) => {
    setLoginError("");

    const result = await login(data.email, data.password);

    if (result.success) {
      // Show OTP form with challengeId
      setChallengeId(result.data.challengeId);
      setAuthType("login");
      setShowOTP(true);
    } else {
      setLoginError(result.error || "Login failed. Please try again.");
    }
  };

  const handleRegister = async (data) => {
    setRegisterError("");

    const result = await register({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (result.success) {
      // Show OTP form with challengeId
      setChallengeId(result.data.challengeId);
      setAuthType("register");
      setShowOTP(true);
    } else {
      setRegisterError(
        result.error || "Registration failed. Please try again.",
      );
    }
  };

  const handleOTPSubmit = async (otpData) => {
    setOtpError("");

    const result = await verifyMFA(otpData.challengeId, otpData.code);

    if (result.success) {
      router.push("/dashboard");
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
                setAuthType(null);
              }}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              ← Back to {authType === "login" ? "Login" : "Registration"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Forms Container - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Login Form */}
          <div>
            {loginError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {loginError}
              </div>
            )}
            <LoginForm onSubmit={handleLogin} />
          </div>

          {/* Register Form */}
          <div>
            {registerError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {registerError}
              </div>
            )}
            <RegisterForm onSubmit={handleRegister} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
