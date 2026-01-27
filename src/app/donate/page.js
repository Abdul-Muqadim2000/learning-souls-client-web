"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StripePayment from "@/components/StripePayment";
import { PrimaryButton } from "@/components/ui/Button";

export default function DonatePage() {
  const router = useRouter();
  const [amount, setAmount] = useState(50);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login?redirect=/donate");
    }
  }, [router]);

  const handleContinueToPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Please login to make a donation");
      }

      // Step 1: Send request to server to create payment intent
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/donation`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount,
            currency: "USD",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create donation");
      }

      if (result.status === "success") {
        // Step 2: Receive clientSecret from server
        setClientSecret(result.data.clientSecret);
        // The StripePayment component will now redirect to Stripe's hosted page
      } else {
        throw new Error(result.message || "Failed to create donation");
      }
    } catch (err) {
      setError(err.message);
      console.error("Donation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentError = (error) => {
    setError(error);
    setClientSecret(null); // Reset to show the form again
  };

  // If we have a clientSecret, show the Stripe payment component
  // which will automatically redirect to Stripe's hosted payment page
  if (clientSecret) {
    return (
      <StripePayment
        clientSecret={clientSecret}
        amount={amount}
        currency="USD"
        onError={handlePaymentError}
      />
    );
  }

  // Otherwise, show the donation form
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Make a Donation
          </h1>
          <p className="text-gray-600 mb-8">
            Support our mission to empower communities through education
          </p>

          <div className="space-y-6">
            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donation Amount (USD)
              </label>
              
              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[10, 25, 50, 100].map((value) => (
                  <button
                    key={value}
                    onClick={() => setAmount(value)}
                    className={`px-4 py-2 rounded-lg border-2 transition ${
                      amount === value
                        ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    ${value}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  min="1"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter custom amount"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Continue to Payment Button */}
            <PrimaryButton
              onClick={handleContinueToPayment}
              disabled={loading || amount <= 0}
              text={
                loading
                  ? "Processing..."
                  : `Continue to Payment - $${amount.toFixed(2)}`
              }
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            />

            {/* Info Text */}
            <div className="text-center text-sm text-gray-500">
              <p>You will be redirected to Stripe's secure payment page</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Secured by Stripe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Your donation helps us provide quality education and resources to
            communities in need.
          </p>
          <p className="mt-2">Thank you for your generosity!</p>
        </div>
      </div>
    </div>
  );
}
