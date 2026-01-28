"use client";

import { AlertCircle, ArrowLeft, Home, HelpCircle } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

export default function DonateCancel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Cancel Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-8 text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <AlertCircle
                className="w-16 h-16 text-yellow-600"
                strokeWidth={2.5}
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Donation Cancelled
            </h1>
            <p className="text-yellow-50 text-lg">
              Your donation was not completed
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-6">
            {/* Info Message */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <div className="flex items-start">
                <HelpCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-yellow-900">
                    No Payment Was Processed
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Your payment was cancelled and no charges were made to your
                    account. If you encountered any issues, please try again or
                    contact our support team.
                  </p>
                </div>
              </div>
            </div>

            {/* Common Reasons */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Common Reasons for Cancellation
              </h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-yellow-600 font-bold text-sm">•</span>
                  </div>
                  <p className="text-sm text-gray-600 pt-1">
                    You clicked the "Back" or "Cancel" button during checkout
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-yellow-600 font-bold text-sm">•</span>
                  </div>
                  <p className="text-sm text-gray-600 pt-1">
                    Payment information was not entered correctly
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-yellow-600 font-bold text-sm">•</span>
                  </div>
                  <p className="text-sm text-gray-600 pt-1">
                    Connection timeout or network issues
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-yellow-600 font-bold text-sm">•</span>
                  </div>
                  <p className="text-sm text-gray-600 pt-1">
                    You changed your mind about the donation
                  </p>
                </div>
              </div>
            </div>

            {/* What You Can Do */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                What Would You Like to Do?
              </h3>
              <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                <li>Try donating again with a different payment method</li>
                <li>Contact our support team if you need assistance</li>
                <li>Explore our projects to learn more about our work</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <PrimaryButton
                text="Try Again"
                icon={ArrowLeft}
                onClick={() => (window.location.href = "/donate")}
                className="flex-1 justify-center bg-green-600 hover:bg-green-700"
              />
              <SecondaryButton
                text="Go Home"
                icon={Home}
                onClick={() => (window.location.href = "/")}
                className="flex-1 justify-center hover:bg-gray-600 hover:text-white"
              />
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Having trouble completing your donation?
          </p>
          <p className="text-sm text-gray-600">
            Contact us at{" "}
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
