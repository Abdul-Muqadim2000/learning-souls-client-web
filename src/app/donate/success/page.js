"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { CheckCircle, Home, Mail, PencilRuler } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

export default function DonateSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [countdown, setCountdown] = useState(10);

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
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-gray-600">Loading...</div>
        </div>
      }
    >
      <div className="min-h-screen bg-gradient-to-br from-green-200 via-white to-pink-200 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-(--color-secondary) p-8 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                <CheckCircle
                  className="w-12 h-12 text-(--color-secondary)"
                  strokeWidth={2}
                />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Thank You for Your Donation!
              </h1>
              <p className="text-green-50 text-lg">
                May Allah accept your donation and reward you abundantly
              </p>
            </div>

            {/* Content Section */}
            <div className="p-8 space-y-6">
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
                      confirmation email with your receipt has been sent to your
                      email address.
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

              {/* What's Next Section */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  What Happens Next?
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold text-sm">
                        1
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">
                        Email Confirmation
                      </p>
                      <p className="text-sm text-gray-600">
                        Check your inbox for a detailed receipt and donation
                        summary.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold text-sm">
                        2
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Your Impact</p>
                      <p className="text-sm text-gray-600">
                        Your donation will be allocated to your selected
                        project(s) and make a real difference.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold text-sm">
                        3
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">
                        Stay Connected
                      </p>
                      <p className="text-sm text-gray-600">
                        We'll keep you updated on the progress of the projects
                        you've supported.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <PrimaryButton
                  text="Return to Home"
                  icon={Home}
                  onClick={() => (window.location.href = "/")}
                  className="flex-1 justify-center"
                />
                <SecondaryButton
                  icon={PencilRuler}
                  text="View Projects"
                  onClick={() => (window.location.href = "/projects")}
                  className="flex-1 justify-center hover:bg-(--color-secondary) hover:text-white"
                />
              </div>

              {/* Auto-redirect notice */}
              <p className="text-center text-sm text-gray-500 pt-4">
                Redirecting to home page in{" "}
                <span className="font-bold text-green-600">{countdown}</span>{" "}
                seconds...
              </p>
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
    </Suspense>
  );
}
