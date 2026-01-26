"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { PrimaryButton } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ProtectedRoute from "@/components/ProtectedRoute";
import { updateProfile, createDonation } from "@/lib/api";
import StripePayment, { PaymentSuccess } from "@/components/StripePayment";
import {
  LogOut,
  User,
  DollarSign,
  History,
  Mail,
  Calendar,
  Pen,
  X,
  Check,
} from "lucide-react";

export default function DashboardPage() {
  const { user, logout, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState("donate");
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  // Check URL for payment success
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("payment") === "success") {
        setShowPaymentSuccess(true);
        setActiveTab("donate");
        // Clean up URL
        window.history.replaceState({}, "", "/dashboard");
      }
    }
  }, []);

  const tabs = [
    { id: "donate", label: "Make Donation", icon: DollarSign },
    { id: "donations", label: "Your Donations", icon: History },
    { id: "profile", label: "User Profile", icon: User },
    { id: "logout", label: "Logout", icon: LogOut },
  ];

  const handleTabClick = (tabId) => {
    if (tabId === "logout") {
      logout();
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="bg-white rounded-t-lg shadow-sm p-6 mb-0">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                  Dashboard
                </h1>
                <p className="text-gray-600">
                  Welcome, {user?.username || user?.email || "User"}!
                </p>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <nav className="flex -mb-px space-x-2 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isLogout = tab.id === "logout";

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`
                      group inline-flex items-center px-4 py-4 border-b-2 font-medium text-sm
                      transition-all duration-200 ease-in-out
                      ${
                        isLogout
                          ? "border-transparent text-red-600 hover:text-red-700 hover:border-red-300"
                          : isActive
                            ? "border-green-500 text-green-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }
                    `}
                  >
                    <Icon
                      className={`
                        -ml-0.5 mr-2 h-5 w-5
                        ${
                          isLogout
                            ? "text-red-500 group-hover:text-red-600"
                            : isActive
                              ? "text-green-500"
                              : "text-gray-400 group-hover:text-gray-500"
                        }
                      `}
                      aria-hidden="true"
                    />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-b-lg shadow-md p-8 min-h-[500px]">
            {activeTab === "donate" && (
              <DonationContent
                showSuccess={showPaymentSuccess}
                onSuccessShown={() => setShowPaymentSuccess(false)}
              />
            )}
            {activeTab === "donations" && (
              <DonationHistoryContent user={user} />
            )}
            {activeTab === "profile" && (
              <ProfileContent user={user} refreshUser={refreshUser} />
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// User Profile Content Component
function ProfileContent({ user, refreshUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  // Update form data whenever user prop changes
  useEffect(() => {
    setFormData({
      username: user?.username || "",
      email: user?.email || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await updateProfile(formData);

      // Refresh user data from server first
      await refreshUser();

      setMessage({
        type: "success",
        text: response.message || "Profile updated successfully!",
      });
      setIsEditing(false);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to update profile",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      username: user?.username || "",
      email: user?.email || "",
    });
    setMessage({ type: "", text: "" });
  };

  return (
    <div className="max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
        {!isEditing && (
          <PrimaryButton
            onClick={() => setIsEditing(true)}
            text="Edit Profile"
            icon={Pen}
            className="bg-green-600 hover:bg-green-700"
          />
        )}
      </div>

      {/* Message Alert */}
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <p className="font-medium">{message.text}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Information Card */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="mr-2 h-5 w-5 text-green-600" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              {isEditing ? (
                <Input
                  type="text"
                  name="username"
                  label="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <>
                  <label className="text-sm font-medium text-gray-500 block mb-2">
                    Username
                  </label>
                  <p className="text-gray-900 font-medium">
                    {user?.username || "N/A"}
                  </p>
                </>
              )}
            </div>

            {/* Email */}
            <div>
              {isEditing ? (
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <>
                  <label className="text-sm font-medium text-gray-500 flex items-center mb-2">
                    <Mail className="mr-1 h-4 w-4" />
                    Email
                  </label>
                  <p className="text-gray-900 font-medium">
                    {user?.email || "N/A"}
                  </p>
                </>
              )}
            </div>

            {/* User ID - Read Only */}
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-2">
                User ID
              </label>
              <p className="text-gray-900 font-mono text-sm">
                {user?.id || "N/A"}
              </p>
            </div>

            {/* Member Since - Read Only */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-500 flex items-center mb-2">
                <Calendar className="mr-1 h-4 w-4" />
                Member Since
              </label>
              <p className="text-gray-900 font-medium">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Account Status
          </h3>
          <p className="text-green-700 font-medium">✓ Active Account</p>
          <p className="text-sm text-gray-600 mt-2">
            Your account is in good standing. Thank you for being part of our
            community!
          </p>
        </div>

        {/* Edit Actions */}
        {isEditing && (
          <div className="flex justify-start gap-4">
            <PrimaryButton
              type="submit"
              text={isLoading ? "Saving..." : "Save Changes"}
              icon={isLoading ? null : Check}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            />
            <PrimaryButton
              type="button"
              onClick={handleCancel}
              text="Cancel"
              icon={X}
              disabled={isLoading}
              className="bg-gray-500 hover:bg-gray-600"
            />
          </div>
        )}
      </form>
    </div>
  );
}

// Make Donation Content Component
function DonationContent({ showSuccess, onSuccessShown }) {
  const { user } = useAuth();
  const [step, setStep] = useState("form"); // "form", "payment", "success"
  const [amount, setAmount] = useState("");
  const [name, setName] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currency, setCurrency] = useState("USD");
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    type: "",
    text: "",
  });
  const [paymentIntent, setPaymentIntent] = useState(null);

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  // Handle payment success from URL
  useEffect(() => {
    if (showSuccess) {
      setStep("success");
      onSuccessShown();
    }
  }, [showSuccess, onSuccessShown]);

  const handleDonate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage({ type: "", text: "" });

    try {
      // Prepare donation data according to backend schema
      const donationData = {
        amount: parseFloat(amount),
        currency: currency,
      };

      // Add optional email if provided
      if (email) {
        donationData.email = email;
      }

      // Add optional name if provided (stored but not validated)
      if (name) {
        donationData.name = name;
      }

      const response = await createDonation(donationData);

      // Store the payment intent details
      if (response.data) {
        setPaymentIntent(response.data);
        setStep("payment");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      setResponseMessage({
        type: "error",
        text: error.message || "Failed to create donation. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentError = (errorMessage) => {
    setStep("form");
    setPaymentIntent(null);
    setResponseMessage({
      type: "error",
      text: errorMessage || "Payment failed. Please try again.",
    });
  };

  const handleNewDonation = () => {
    setStep("form");
    setAmount("");
    setMessage("");
    setPaymentIntent(null);
    setResponseMessage({ type: "", text: "" });
  };

  // Show success page
  if (step === "success") {
    return (
      <div className="max-w-3xl">
        <PaymentSuccess
          amount={amount}
          currency={currency}
          onNewDonation={handleNewDonation}
        />
      </div>
    );
  }

  // Show payment page
  if (step === "payment" && paymentIntent) {
    return (
      <div className="max-w-3xl">
        <StripePayment
          clientSecret={paymentIntent.clientSecret}
          amount={amount}
          currency={currency}
          onError={handlePaymentError}
        />
      </div>
    );
  }

  // Show donation form
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Make a Donation</h2>
      <p className="text-gray-600 mb-6">
        Your contribution helps us continue our mission of spreading knowledge
        and supporting our community.
      </p>

      {/* Response Message Alert */}
      {responseMessage.text && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            responseMessage.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : responseMessage.type === "info"
                ? "bg-blue-50 border border-blue-200 text-blue-800"
                : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <p className="font-medium">{responseMessage.text}</p>
        </div>
      )}

      <form onSubmit={handleDonate} className="space-y-6">
        {/* Name Field */}
        <Input
          type="text"
          name="name"
          label="Name (Optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        {/* Email Field */}
        <Input
          type="email"
          name="email"
          label="Email (Optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        {/* Currency Selection */}
        <Input
          type="select"
          name="currency"
          label="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          options={[
            { value: "USD", label: "USD - US Dollar" },
            { value: "EUR", label: "EUR - Euro" },
            { value: "GBP", label: "GBP - British Pound" },
            { value: "CAD", label: "CAD - Canadian Dollar" },
            { value: "AUD", label: "AUD - Australian Dollar" },
          ]}
        />

        {/* Donation Category */}
        <Input
          type="select"
          name="category"
          label="Donation Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            { value: "general", label: "General Fund" },
            { value: "quran", label: "Quran Translation Project" },
            { value: "hadith", label: "Hadith Translation Project" },
            { value: "books", label: "Books Distribution Project" },
            { value: "apps", label: "App Development" },
          ]}
        />

        {/* Quick Amount Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Amount
          </label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {predefinedAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setAmount(amt.toString())}
                className={`
                  px-4 py-3 border-2 rounded-md font-semibold transition-all
                  ${
                    amount === amt.toString()
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-300 hover:border-green-300 text-gray-700"
                  }
                `}
              >
                ${amt}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <Input
          type="number"
          name="amount"
          label="Or Enter Custom Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="1"
          max="999999"
          step="0.01"
          required
        />
        <p className="text-xs text-gray-500 -mt-4 ml-1">
          Minimum: $1, Maximum: $999,999
        </p>

        {/* Optional Message */}
        <Input
          type="textarea"
          name="message"
          label="Message (Optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add a personal message..."
          rows={3}
        />

        {/* Submit Button */}
        <div className="pt-4">
          <PrimaryButton
            text={
              isLoading
                ? "Creating Payment..."
                : `Continue to Payment - ${currency} ${amount || "0"}`
            }
            className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
            icon={isLoading ? null : DollarSign}
            type="submit"
            disabled={isLoading}
          />
        </div>
      </form>

      {/* Trust Indicators */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Secure Payment:</strong> All donations are processed securely
          through Stripe. Your contribution is tax-deductible where applicable.
        </p>
      </div>
    </div>
  );
}

// Donation History Content Component
function DonationHistoryContent({ user }) {
  // Sample donation data - replace with actual API call
  const donations = [
    {
      id: 1,
      date: "2026-01-20",
      amount: 100,
      category: "Quran Translation Project",
      status: "Completed",
    },
    {
      id: 2,
      date: "2025-12-15",
      amount: 50,
      category: "General Fund",
      status: "Completed",
    },
    {
      id: 3,
      date: "2025-11-10",
      amount: 75,
      category: "Books Distribution Project",
      status: "Completed",
    },
  ];

  const totalDonated = donations.reduce(
    (sum, donation) => sum + donation.amount,
    0,
  );

  return (
    <div className="max-w-5xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Your Donation History
      </h2>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6 border border-green-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Donated</p>
            <p className="text-3xl font-bold text-green-600">${totalDonated}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Number of Donations</p>
            <p className="text-3xl font-bold text-blue-600">
              {donations.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Member Since</p>
            <p className="text-xl font-bold text-gray-700">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "2025"}
            </p>
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.length > 0 ? (
                donations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(donation.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donation.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      ${donation.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No donations yet. Make your first donation to support our
                    cause!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Thank You Message */}
      {donations.length > 0 && (
        <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Thank You for Your Generosity! 🌟
          </h3>
          <p className="text-green-700">
            Your contributions make a real difference in our mission. May your
            generosity be blessed and rewarded.
          </p>
        </div>
      )}
    </div>
  );
}
