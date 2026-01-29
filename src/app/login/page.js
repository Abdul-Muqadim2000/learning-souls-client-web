"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EmailInput, PasswordInput } from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";
import { UserCircle } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function LoginPageContent() {
  const { isAuthenticated } = useAuth();
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
      const body =
        activeTab === "otp"
          ? { email: loginData.email }
          : { email: loginData.email, password: loginData.password };

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
        setError("Login succeeded but no challenge ID received");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-22 px-4">
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
          <div className="bg-white p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Welcome Text */}
              <div className="mb-8">
                <h1 className="text-5xl font-bold text-gray-800 mb-2 lowercase">
                  welcome back
                </h1>
                <p className="text-gray-500">
                  Access your donation history and account details
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="flex gap-2 mb-6 bg-gray-100 rounded-full p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("otp")}
                  className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
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
                  className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
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

                    <div className="text-right">
                      <Link
                        href="/forgot-password"
                        className="text-sm text-gray-500 hover:text-[#09b29d]"
                      >
                        Forgot your password?
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
