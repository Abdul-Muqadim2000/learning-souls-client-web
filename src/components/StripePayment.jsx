"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CheckCircle } from "lucide-react";
import { PrimaryButton } from "./ui/Button";

// Check if Stripe publishable key is configured
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.error(
    "Stripe publishable key is not configured. Please add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your .env.local file.",
  );
}

// Load Stripe outside of component to avoid recreating on every render
const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : null;

// Main Stripe Payment Component - Redirects to Stripe hosted page
export default function StripePayment({
  clientSecret,
  amount,
  currency,
  onError,
}) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!clientSecret) return;

    // Check if Stripe is configured
    if (!stripePromise) {
      const configError =
        "Stripe is not configured. Please check your environment variables.";
      setError(configError);
      if (onError) onError(configError);
      return;
    }

    const redirectToStripe = async () => {
      setIsRedirecting(true);
      try {
        const stripe = await stripePromise;

        if (!stripe) {
          throw new Error(
            "Failed to load Stripe.js. Please check your internet connection and Stripe publishable key.",
          );
        }

        console.log(
          "Redirecting to Stripe payment page with clientSecret:",
          clientSecret,
        );

        // Use the Payment Element approach - this will redirect to Stripe's hosted page
        // Stripe automatically handles the redirect when using confirmPayment
        const result = await stripe.confirmPayment({
          clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/dashboard?payment=success`,
            payment_method_data: {
              billing_details: {
                email: currency, // This will be ignored, just placeholder
              },
            },
          },
          redirect: "if_required", // Only redirect if needed (like 3D Secure)
        });

        console.log("Stripe result:", result);

        // If we reach here, payment succeeded without redirect
        if (result.error) {
          console.error("Stripe error:", result.error);
          setError(result.error.message);
          if (onError) onError(result.error.message);
          setIsRedirecting(false);
        } else if (
          result.paymentIntent &&
          result.paymentIntent.status === "succeeded"
        ) {
          // Payment succeeded, redirect to success page
          window.location.href = `/dashboard?payment=success`;
        }
      } catch (err) {
        console.error("Caught error:", err);
        setError(err.message || "Failed to process payment");
        if (onError) onError(err.message);
        setIsRedirecting(false);
      }
    };

    redirectToStripe();
  }, [clientSecret, onError, currency]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg p-8 shadow-md">
        {error ? (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-red-100 p-6">
                <svg
                  className="w-16 h-16 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Payment Error
            </h2>
            <p className="text-red-600 mb-6">{error}</p>
            <PrimaryButton
              onClick={() => window.location.reload()}
              text="Try Again"
              className="bg-green-600 hover:bg-green-700"
            />
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="animate-spin h-16 w-16 border-4 border-green-600 border-t-transparent rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Redirecting to Secure Payment
            </h2>
            <p className="text-gray-600 mb-4">
              Please wait while we redirect you to Stripe's secure payment
              page...
            </p>
            <div className="bg-gray-50 p-4 rounded-lg inline-block">
              <p className="text-sm text-gray-700">
                <strong>Amount:</strong> {currency} {amount}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
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
        )}
      </div>
    </div>
  );
}

// Success Component
export function PaymentSuccess({ amount, currency, onNewDonation }) {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-green-100 p-6">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Thank You for Your Donation!
      </h2>
      <p className="text-xl text-gray-600 mb-2">
        Your donation of{" "}
        <span className="font-bold text-green-600">
          {currency} {amount}
        </span>{" "}
        has been successfully processed.
      </p>
      <p className="text-gray-600 mb-8">
        Your generosity helps us continue our mission. May your contribution be
        blessed!
      </p>
      {onNewDonation && (
        <PrimaryButton
          onClick={onNewDonation}
          text="Make Another Donation"
          className="bg-green-600 hover:bg-green-700"
        />
      )}
    </div>
  );
}
