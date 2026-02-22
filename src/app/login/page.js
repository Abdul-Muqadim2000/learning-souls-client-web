"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EmailInput, PasswordInput } from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function LoginPageContent() {
  const { isAuthenticated, refreshUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  // Tab state: 'otp' or 'password'
  const [activeTab, setActiveTab] = useState("otp");

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google Login Handler
  const handleGoogleLogin = async (credentialResponse) => {
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Google login failed");
      }

      const data = await response.json();
      const tokens = data.data?.tokens;

      if (tokens) {
        // Store tokens
        if (tokens.accessToken) {
          localStorage.setItem("accessToken", tokens.accessToken);
        }
        if (tokens.refreshToken) {
          localStorage.setItem("refreshToken", tokens.refreshToken);
        }

        // Refresh user data in AuthContext
        await refreshUser();

        // Redirect to dashboard
        const redirect = searchParams.get("redirect") || "/dashboard";
        router.push(redirect);
      } else {
        throw new Error("Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Google login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get("redirect") || "/dashboard";
      router.push(redirect);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Prepare request body based on active tab
      const body = { email: loginData.email };

      // Only include password if on password tab and password is provided
      if (activeTab === "password" && loginData.password) {
        body.password = loginData.password;
      }

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const data = await response.json();

      // Extract challengeId from response
      const challengeId = data.data?.challenge || data.data?.challengeId;

      if (challengeId) {
        // Redirect to verify page with challengeId
        router.push(`/login/verify?challengeId=${challengeId}`);
      } else {
        const tokens = data.data?.tokens;
        if (tokens) {
          // Store tokens properly
          if (tokens.accessToken) {
            localStorage.setItem("accessToken", tokens.accessToken);
          }
          if (tokens.refreshToken) {
            localStorage.setItem("refreshToken", tokens.refreshToken);
          }

          // Refresh user data in AuthContext
          await refreshUser();

          // Redirect to dashboard
          router.push("/dashboard");
        } else {
          throw new Error("Login failed. Please try again.");
        }
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-8 xs:py-12 sm:py-22 px-2 xs:px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl xs:rounded-3xl shadow-2xl overflow-hidden">
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
                <h1 className="text-4xl font-bold mb-4">Access Your Account</h1>
                <p className="text-white/80 max-w-sm mx-auto mb-4">
                  Login to view your donation history and manage your account
                </p>
                <ul className="text-white/70 text-sm space-y-2 max-w-xs mx-auto text-left">
                  <li className="flex items-center gap-2">
                    <span className="text-white">✓</span> Track your donations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-white">✓</span> View contribution
                    history
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-white">✓</span> Manage account
                    settings
                  </li>
                </ul>
              </div>

              {/* Make a Donation Button */}
              <Link
                href="/donate"
                className="inline-block mt-8 px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#09b29d] transition-all duration-300"
              >
                MAKE A DONATION
              </Link>
            </div>
          </div>

          {/* Right Side - White Background with Form */}
          <div className="bg-white p-4 xs:p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Welcome Text */}
              <div className="mb-6 xs:mb-8">
                <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-gray-800 mb-2 lowercase">
                  welcome back
                </h1>
                <p className="text-sm xs:text-base text-gray-500">
                  Access your donation history and account details
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="flex gap-1 xs:gap-2 mb-6 bg-gray-100 rounded-full p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("otp")}
                  className={`flex-1 py-2 xs:py-2.5 sm:py-3 px-2 xs:px-4 sm:px-6 rounded-full font-semibold text-xs xs:text-sm sm:text-base transition-all duration-300 ${
                    activeTab === "otp"
                      ? "bg-[#09b29d] text-white shadow-md"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  OTP Login
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("password")}
                  className={`flex-1 py-2 xs:py-2.5 sm:py-3 px-2 xs:px-4 sm:px-6 rounded-full font-semibold text-xs xs:text-sm sm:text-base transition-all duration-300 ${
                    activeTab === "password"
                      ? "bg-[#09b29d] text-white shadow-md"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Password Login
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                <EmailInput
                  name="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />

                {activeTab === "password" && (
                  <>
                    <PasswordInput
                      name="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                    />

                    <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 xs:gap-0 text-xs xs:text-sm">
                      <Link
                        href="/login/setup-password/request"
                        className="text-gray-500 hover:text-[#09b29d] transition-colors"
                      >
                        New user? Set up password first.
                      </Link>
                      <Link
                        href="/login/reset-password"
                        className="text-gray-500 hover:text-[#09b29d] transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#09b29d] text-white rounded-full font-semibold hover:bg-[#09b29d]/90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "LOGGING IN..." : "LOG IN"}
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative bg-white px-4 text-sm text-gray-500">
                    OR
                  </div>
                </div>

                {/* Google Sign In Button - Custom Styled */}
                <button
                  type="button"
                  onClick={() => {
                    const googleButton = document.querySelector(
                      '[aria-labelledby*="button-label"]',
                    );
                    if (googleButton) googleButton.click();
                  }}
                  disabled={isSubmitting}
                  className="w-full py-3 xs:py-3.5 sm:py-4 px-3 xs:px-4 bg-white text-gray-700 border-2 border-gray-300 rounded-full font-semibold text-xs xs:text-sm sm:text-base hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 xs:gap-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="truncate">Continue with Google</span>
                </button>

                {/* Hidden Google Login for functionality */}
                <div className="hidden">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      setError("Google login failed. Please try again.");
                    }}
                    useOneTap={false}
                    theme="outline"
                    size="large"
                  />
                </div>

                <p className="text-center text-gray-600 text-sm">
                  Want to support our cause?{" "}
                  <Link
                    href="/donate"
                    className="text-[#09b29d] font-semibold hover:underline"
                  >
                    Make a donation
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-gray-600">Loading...</div>
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
