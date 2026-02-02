"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { CheckCircle, Home, Mail, PencilRuler } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

function DonateSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    // Clear the donation form data from localStorage on successful payment
    localStorage.removeItem("donateFormData");
    localStorage.removeItem("donateCurrentStep");
  }, []);

  useEffect(() => {
    // Countdown timer for auto-redirect
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Auto-redirect to home after countdown
      window.location.href = "/";
    }
  }, [countdown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-white to-pink-200 flex items-center justify-center p-4 py-8">
      <div className="max-w-6xl w-full" style={{ maxHeight: "80vh" }}>
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col">
          {/* Header Section */}
          <div className="bg-(--color-secondary) p-6 text-center flex-shrink-0">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg animate-bounce">
              <CheckCircle
                className="w-10 h-10 text-(--color-secondary)"
                strokeWidth={2}
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Thank You for Your Donation!
            </h1>
            <p className="text-green-50 text-base">
              May Allah accept your donation and reward you abundantly
            </p>
          </div>

          {/* Content Section - Two Columns */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {/* Left Column - Status Messages */}
              <div className="space-y-4">
                {/* Account Created Message */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900">
                        Your Account Has Been Created!
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        An account has been automatically created with your
                        email. You can now access your donation dashboard and
                        track your contributions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-900">
                        Payment Successful
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                        Your donation has been processed successfully. A
                        confirmation email with your receipt has been sent to
                        your email address.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Session Info (if available) */}
                {sessionId && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Transaction Reference
                    </p>
                    <p className="text-xs text-gray-600 font-mono break-all">
                      {sessionId}
                    </p>
                  </div>
                )}

                {/* Email Notification Info */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 font-semibold mb-2">
                    📧 Check your inbox!
                  </p>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Payment confirmation and receipt</li>
                    <li>• Account credentials and login instructions</li>
                    <li>• Updates on how your donation is making an impact</li>
                  </ul>
                </div>
              </div>

              {/* Right Column - What's Next */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    What Happens Next?
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    Your generous contribution will help us distribute Quran
                    translations, publish educational materials, and develop
                    free Islamic resources. Here's how to access your account:
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium text-sm">
                        Login via OTP (One-Time Password)
                      </p>
                      <p className="text-xs text-gray-600">
                        Quick access - Enter your email and receive a secure
                        code instantly.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium text-sm">
                        Login with Google
                      </p>
                      <p className="text-xs text-gray-600">
                        One-click sign-in using your existing Google account.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium text-sm">
                        Setup a Password (Recommended)
                      </p>
                      <p className="text-xs text-gray-600">
                        Click <strong>"Password Login"</strong> →{" "}
                        <strong>"New user? Set up password first."</strong> →
                        Enter your email address and follow the verification
                        process to create a permanent password.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4">
                  <PrimaryButton
                    text="Login to Dashboard"
                    icon={Mail}
                    onClick={() => (window.location.href = "/login")}
                    className="w-full justify-center"
                  />
                  <SecondaryButton
                    icon={Home}
                    text="Return to Home"
                    onClick={() => (window.location.href = "/")}
                    className="w-full justify-center hover:bg-(--color-secondary) hover:text-white"
                  />
                </div>

                {/* Auto-redirect notice */}
                <p className="text-center text-xs text-gray-500 pt-2">
                  Redirecting to home in{" "}
                  <span className="font-bold text-green-600">{countdown}</span>{" "}
                  seconds...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact us at{" "}
            <a
              href="mailto:support@learningsouls.org"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              support@learningsouls.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DonateSuccess() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-gray-600">Loading...</div>
        </div>
      }
    >
      <DonateSuccessContent />
    </Suspense>
  );
}
