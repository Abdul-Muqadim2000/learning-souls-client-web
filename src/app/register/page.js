"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input, { EmailInput, PasswordInput } from "@/components/ui/Input";
import OTPForm from "@/components/OTPForm";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Eye, EyeOff, UserCircle } from "lucide-react";
import Link from "next/link";

const RegisterPage = () => {
  const { login, register, verifyMFA, isAuthenticated } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

  // State for OTP flow
  const [showOTP, setShowOTP] = useState(false);
  const [challengeId, setChallengeId] = useState(null);
  const [authType, setAuthType] = useState(null); // 'login' or 'register'

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await login(loginData.email, loginData.password);

      if (result.success) {
        setChallengeId(result.data.data);
        setAuthType("login");
        setShowOTP(true);
      } else {
        setError(result.error || "Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (registerData.password !== registerData.passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await register({
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
        passwordConfirm: registerData.passwordConfirm,
      });

      if (result.success) {
        setChallengeId(result.data.data);
        setAuthType("register");
        setShowOTP(true);
      } else {
        setError(result.error || "Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
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
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {authType === "login" ? "Login" : "Register"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex items-center justify-center bg-gray-100 py-22 px-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Side - Green Background with Leaf Shape */}
          <div className="bg-[#09b29d] text-white p-12 flex flex-col justify-center items-center relative overflow-hidden rounded-bl-[120px] lg:rounded-bl-[150px] rounded-tr-[120px] lg:rounded-tr-[150px]">
            {/* Decorative curved shape */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 text-center space-y-6">
              {/* Logo/Icon */}
              <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center">
                <UserCircle className="w-12 h-12 text-[#09b29d]" />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 opacity-90">
                  Learning Souls
                </h2>
                <h1 className="text-4xl font-bold mb-4">
                  {isLogin ? "Welcome Back!" : "Join Us Today!"}
                </h1>
                <p className="text-white/80 max-w-sm mx-auto">
                  {isLogin
                    ? "To stay connected with us please login with your personal info"
                    : "Create an account to access all our features and resources"}
                </p>
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="mt-8 px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#09b29d] transition-all duration-300"
              >
                {isLogin ? "REGISTER" : "LOGIN"}
              </button>
            </div>
          </div>

          {/* Right Side - White Background with Form */}
          <div className="bg-white p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Welcome Text */}
              <div className="mb-8">
                <h1 className="text-5xl font-bold text-gray-800 mb-2 lowercase">
                  welcome
                </h1>
                <p className="text-gray-500">
                  {isLogin
                    ? "Login in to your account to continue"
                    : "Create your account to get started"}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Login Form */}
              {isLogin ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <EmailInput
                    name="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />

                  <PasswordInput
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />

                  <div className="text-right">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-gray-500 hover:text-[#09b29d]"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#09b29d] text-white rounded-full font-semibold hover:bg-[#09b29d]/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "LOGGING IN..." : "LOG IN"}
                  </button>

                  <p className="text-center text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(false);
                        setError("");
                      }}
                      className="text-[#09b29d] font-semibold hover:underline"
                    >
                      register
                    </button>
                  </p>
                </form>
              ) : (
                /* Register Form */
                <form onSubmit={handleRegister} className="space-y-5">
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    required
                  />

                  <EmailInput
                    name="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />

                  <PasswordInput
                    name="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />

                  <PasswordInput
                    name="passwordConfirm"
                    placeholder="Confirm Password"
                    value={registerData.passwordConfirm}
                    onChange={handleRegisterChange}
                    required
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#09b29d] text-white rounded-full font-semibold hover:bg-[#09b29d]/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "CREATING ACCOUNT..." : "REGISTER"}
                  </button>

                  <p className="text-center text-gray-600 text-sm">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(true);
                        setError("");
                      }}
                      className="text-[#09b29d] font-semibold hover:underline"
                    >
                      login
                    </button>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
