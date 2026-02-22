"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { PrimaryButton } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ProtectedRoute from "@/components/ProtectedRoute";
import { updateProfile, getDonations } from "@/lib/api";
import Link from "next/link";
import {
  LogOut,
  User,
  Heart,
  Mail,
  Calendar,
  Pen,
  X,
  Check,
  CheckIcon,
  XIcon,
  Loader2,
  DollarSign,
} from "lucide-react";

export default function DashboardPage() {
  const { user, logout, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "User Profile", icon: User },
    { id: "donations", label: "Your Donations", icon: Heart },
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
      <div className="min-h-screen bg-gray-50 py-4 xs:py-6 sm:py-8 px-2 xs:px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="bg-white rounded-t-lg shadow-sm p-3 xs:p-4 sm:p-6 mb-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
              <div>
                <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                  Dashboard
                </h1>
                <p className="text-sm xs:text-base text-gray-600 truncate">
                  Welcome, {user?.username || user?.email || "User"}!
                </p>
              </div>
              {/* Donate Now Button */}
              <Link href="/donate" className="w-full sm:w-auto">
                <PrimaryButton
                  text="Donate Now"
                  icon={Heart}
                  className="bg-[#09b29d] hover:bg-[#09b29d]/90 text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base sm:text-lg w-full sm:w-auto"
                />
              </Link>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <nav
              className="flex -mb-px space-x-1 xs:space-x-2 px-2 xs:px-4 sm:px-6"
              aria-label="Tabs"
            >
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isLogout = tab.id === "logout";

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`
                      group inline-flex items-center justify-center px-2 xs:px-3 sm:px-4 py-3 sm:py-4 border-b-2 font-medium text-xs sm:text-sm
                      transition-all duration-200 ease-in-out flex-1 sm:flex-initial
                      ${
                        isLogout
                          ? "border-transparent text-red-600 hover:text-red-700 hover:border-red-300"
                          : isActive
                            ? "border-[#09b29d] text-[#09b29d]"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }
                    `}
                  >
                    <Icon
                      className={`
                        h-4 w-4 sm:h-5 sm:w-5 sm:-ml-0.5 sm:mr-2
                        ${
                          isLogout
                            ? "text-red-500 group-hover:text-red-600"
                            : isActive
                              ? "text-[#09b29d]"
                              : "text-gray-400 group-hover:text-gray-500"
                        }
                      `}
                      aria-hidden="true"
                    />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden text-[10px] xs:text-xs ml-1">
                      {tab.id === "profile"
                        ? "Profile"
                        : tab.id === "donations"
                          ? "Donations"
                          : "Logout"}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-b-lg shadow-md p-3 xs:p-4 sm:p-6 md:p-8 min-h-[400px] sm:min-h-[500px]">
            {activeTab === "profile" && (
              <ProfileContent user={user} refreshUser={refreshUser} />
            )}
            {activeTab === "donations" && <DonationsContent />}
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
    fullname: user?.fullname || "",
    email: user?.email || "",
    countryCode: user?.countryCode || "+1",
    phone: user?.phone || "",
    addressLine: user?.addressLine || "",
    city: user?.city || "",
    postalCode: user?.postalCode || "",
    country: user?.country || "",
    giftAid: user?.giftAid || false,
  });

  // Update form data whenever user prop changes
  useEffect(() => {
    setFormData({
      fullname: user?.fullname || "",
      email: user?.email || "",
      countryCode: user?.countryCode || "+1",
      phone: user?.phone || "",
      addressLine: user?.addressLine || "",
      city: user?.city || "",
      postalCode: user?.postalCode || "",
      country: user?.country || "",
      giftAid: user?.giftAid || false,
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
      fullname: user?.fullname || "",
      email: user?.email || "",
      countryCode: user?.countryCode || "+1",
      phone: user?.phone || "",
      addressLine: user?.addressLine || "",
      city: user?.city || "",
      postalCode: user?.postalCode || "",
      country: user?.country || "",
      giftAid: user?.giftAid || false,
    });
    setMessage({ type: "", text: "" });
  };

  const countryCodes = [
    { code: "+1", country: "US/Canada" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "India" },
    { code: "+92", country: "Pakistan" },
    { code: "+971", country: "UAE" },
    { code: "+966", country: "Saudi Arabia" },
    { code: "+20", country: "Egypt" },
    { code: "+880", country: "Bangladesh" },
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
        {!isEditing && (
          <PrimaryButton
            onClick={() => setIsEditing(true)}
            text="Edit Profile"
            icon={Pen}
            className="bg-[#09b29d] hover:bg-[#09b29d]/90"
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
        {/* Personal Information Card */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="mr-2 h-5 w-5 text-[#09b29d]" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              {isEditing ? (
                <Input
                  type="text"
                  name="fullname"
                  label="Full Name"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <>
                  <label className="text-sm font-medium text-gray-500 block mb-2">
                    Full Name
                  </label>
                  <p className="text-gray-900 font-medium">
                    {user?.fullname || "N/A"}
                  </p>
                </>
              )}
            </div>

            {/* Email - Read Only */}
            <div>
              <label className="text-sm font-medium text-gray-500 flex items-center mb-2">
                <Mail className="mr-1 h-4 w-4" />
                Email
              </label>
              <p className="text-gray-900 font-medium">
                {user?.email || "N/A"}
              </p>
            </div>

            {/* Phone Number with Country Code */}
            <div className="md:col-span-2">
              {isEditing ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="flex flex-col min-[500px]:flex-row gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="w-full min-[500px]:w-40 px-4 py-3 bg-[#c8e6df] text-gray-900 font-semibold border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#09b29d] focus:border-[#09b29d]"
                    >
                      {countryCodes.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.code} ({item.country})
                        </option>
                      ))}
                    </select>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className="flex-1"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <label className="text-sm font-medium text-gray-500 block mb-2">
                    Phone Number
                  </label>
                  <p className="text-gray-900 font-medium">
                    {user?.countryCode && user?.phone
                      ? `${user.countryCode} ${user.phone}`
                      : "N/A"}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Address Information Card */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Address Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Address Line */}
            <div className="md:col-span-2">
              {isEditing ? (
                <Input
                  type="text"
                  name="addressLine"
                  label="Address Line"
                  value={formData.addressLine}
                  onChange={handleInputChange}
                  placeholder="Street address, P.O. box, etc."
                />
              ) : (
                <>
                  <label className="text-sm font-medium text-gray-500 block mb-2">
                    Address Line
                  </label>
                  <p className="text-gray-900 font-medium">
                    {user?.addressLine || "N/A"}
                  </p>
                </>
              )}
            </div>

            {/* City */}
            <div>
              {isEditing ? (
                <Input
                  type="text"
                  name="city"
                  label="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                />
              ) : (
                <>
                  <label className="text-sm font-medium text-gray-500 block mb-2">
                    City
                  </label>
                  <p className="text-gray-900 font-medium">
                    {user?.city || "N/A"}
                  </p>
                </>
              )}
            </div>

            {/* Postal Code */}
            <div>
              {isEditing ? (
                <Input
                  type="text"
                  name="postalCode"
                  label="Postal Code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="Postal code / ZIP code"
                />
              ) : (
                <>
                  <label className="text-sm font-medium text-gray-500 block mb-2">
                    Postal Code
                  </label>
                  <p className="text-gray-900 font-medium">
                    {user?.postalCode || "N/A"}
                  </p>
                </>
              )}
            </div>

            {/* Country */}
            <div className="md:col-span-2">
              {isEditing ? (
                <Input
                  type="text"
                  name="country"
                  label="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                />
              ) : (
                <>
                  <label className="text-sm font-medium text-gray-500 block mb-2">
                    Country
                  </label>
                  <p className="text-gray-900 font-medium">
                    {user?.country || "N/A"}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Donation Preferences Card */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Donation Preferences
          </h3>

          {/* Gift Aid */}
          <div className="flex items-start">
            {isEditing ? (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="giftAid"
                  id="giftAid"
                  checked={formData.giftAid}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-[#09b29d] border-gray-300 rounded focus:ring-[#09b29d] focus:ring-2"
                />
                <label htmlFor="giftAid" className="ml-3 text-sm text-gray-700">
                  <span className="font-medium">Enable Gift Aid</span>
                  <p className="text-gray-500 mt-1">
                    I am a UK taxpayer and would like to apply Gift Aid to my
                    donations
                  </p>
                </label>
              </div>
            ) : (
              <>
                <label className="text-sm font-medium text-gray-500 block mb-2">
                  Gift Aid Status
                </label>
                <p className="text-gray-900 font-medium">
                  {user?.giftAid ? (
                    <>
                      <CheckIcon className="ml-4 mr-2 text-green-500 inline-block" />
                      {"Enabled"}
                    </>
                  ) : (
                    <>
                      <XIcon className="ml-4 mr-2 text-red-500 inline-block" />
                      {"Not Enabled"}
                    </>
                  )}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Account Information Card */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User ID - Read Only */}
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-2">
                User ID
              </label>
              <p className="text-gray-900 font-mono text-sm">
                {user?.id || user?._id || "N/A"}
              </p>
            </div>

            {/* Member Since - Read Only */}
            <div>
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

            {/* Role - Read Only */}
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-2">
                Account Role
              </label>
              <p className="text-gray-900 font-medium capitalize">
                {user?.role || "user"}
              </p>
            </div>

            {/* Account Status */}
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-2">
                Account Status
              </label>
              <p className="text-green-700 font-medium">✓ Active</p>
            </div>
          </div>
        </div>

        {/* Edit Actions */}
        {isEditing && (
          <div className="flex justify-start gap-4">
            <PrimaryButton
              type="submit"
              text={isLoading ? "Saving..." : "Save Changes"}
              icon={isLoading ? null : Check}
              disabled={isLoading}
              className="bg-[#09b29d] hover:bg-[#09b29d]/90"
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

// Donations Content Component
function DonationsContent() {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      setIsLoading(true);
      setError("");
      try {
        const data = await getDonations();
        setDonations(data || []);
      } catch (err) {
        setError(err.message || "Failed to load donations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const getStatusBadge = (status) => {
    const statusStyles = {
      succeeded: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      failed: "bg-red-100 text-red-800 border-red-200",
      cancelled: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <span
        className={`px-2 xs:px-3 py-1 rounded-full text-[10px] xs:text-xs font-semibold border ${statusStyles[status] || statusStyles.pending}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatCurrency = (amount, currency) => {
    const symbols = {
      GBP: "£",
      USD: "$",
      EUR: "€",
      AED: "AED ",
      SAR: "SAR ",
      PKR: "Rs ",
      INR: "₹",
    };
    return `${symbols[currency] || currency} ${amount.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-[#09b29d] animate-spin mb-4" />
        <p className="text-gray-600">Loading your donations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Your Donations
        </h2>
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-6">
          <p className="font-medium">Error loading donations</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (donations.length === 0) {
    return (
      <div className="max-w-4xl">
        <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-3 xs:gap-4 mb-6">
          <h2 className="text-xl xs:text-2xl font-bold text-gray-800">
            Your Donations
          </h2>
          <Link href="/donate" className="w-full xs:w-auto">
            <PrimaryButton
              text="Make a Donation"
              icon={Heart}
              className="bg-[#09b29d] hover:bg-[#09b29d]/90 text-sm xs:text-base px-4 xs:px-6 py-2 xs:py-3 w-full xs:w-auto"
            />
          </Link>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 xs:p-8 sm:p-12 text-center">
          <Heart className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 xs:mb-4" />
          <h3 className="text-lg xs:text-xl font-semibold text-gray-800 mb-2">
            No Donations Yet
          </h3>
          <p className="text-sm xs:text-base text-gray-600 mb-4 xs:mb-6 px-2">
            You haven't made any donations yet. Start making a difference today!
          </p>
          <Link href="/donate" className="inline-block w-full xs:w-auto">
            <PrimaryButton
              text="Make Your First Donation"
              icon={Heart}
              className="bg-[#09b29d] hover:bg-[#09b29d]/90 text-sm xs:text-base px-4 xs:px-6 py-2 xs:py-3 w-full xs:w-auto"
            />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-3 xs:gap-4 mb-6">
        <div>
          <h2 className="text-xl xs:text-2xl font-bold text-gray-800">
            Your Donations
          </h2>
          <p className="text-sm xs:text-base text-gray-600 mt-1">
            Total donations: {donations.length}
          </p>
        </div>
        <Link href="/donate" className="w-full xs:w-auto">
          <PrimaryButton
            text="Make Another Donation"
            icon={Heart}
            className="bg-[#09b29d] hover:bg-[#09b29d]/90 text-sm xs:text-base px-4 xs:px-6 py-2 xs:py-3 w-full xs:w-auto whitespace-nowrap"
          />
        </Link>
      </div>

      {/* Donations Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden -mx-2 xs:mx-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#09b29d] text-white">
              <tr>
                <th className="px-3 xs:px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] xs:text-xs font-semibold uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 xs:px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] xs:text-xs font-semibold uppercase tracking-wider">
                  Projects
                </th>
                <th className="px-3 xs:px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] xs:text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">
                  Type
                </th>
                <th className="px-3 xs:px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] xs:text-xs font-semibold uppercase tracking-wider hidden md:table-cell">
                  Frequency
                </th>
                <th className="px-3 xs:px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] xs:text-xs font-semibold uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-3 xs:px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] xs:text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">
                  Payment Method
                </th>
                <th className="px-3 xs:px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] xs:text-xs font-semibold uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.map((donation, index) => (
                <tr
                  key={donation._id || index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 xs:px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center text-xs sm:text-sm">
                      <Calendar className="w-3 h-3 xs:w-4 xs:h-4 text-gray-400 mr-1 xs:mr-2" />
                      <span className="text-gray-900 font-medium text-[10px] xs:text-xs sm:text-sm">
                        {new Date(donation.createdAt).toLocaleDateString(
                          "en-GB",
                          { day: "2-digit", month: "2-digit", year: "2-digit" },
                        )}
                      </span>
                    </div>
                    <div className="text-[9px] xs:text-xs text-gray-500 hidden xs:block">
                      {new Date(donation.createdAt).toLocaleTimeString(
                        "en-GB",
                        { hour: "2-digit", minute: "2-digit" },
                      )}
                    </div>
                  </td>
                  <td className="px-3 xs:px-4 sm:px-6 py-3 sm:py-4">
                    <div className="text-xs sm:text-sm">
                      {donation.projects.map((project, idx) => (
                        <div key={idx} className="mb-1">
                          <span className="font-medium text-gray-900 text-[10px] xs:text-xs sm:text-sm block xs:inline">
                            {project.name}
                          </span>
                          <span className="text-gray-500 ml-0 xs:ml-2 text-[10px] xs:text-xs sm:text-sm block xs:inline">
                            {formatCurrency(project.amount, donation.currency)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 xs:px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="inline-flex items-center px-2 xs:px-3 py-1 rounded-full text-[10px] xs:text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                      {donation.donationType}
                    </span>
                  </td>
                  <td className="px-3 xs:px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 capitalize hidden md:table-cell">
                    {donation.donationFrequency}
                  </td>
                  <td className="px-3 xs:px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center text-xs sm:text-sm font-bold text-gray-900">
                      <DollarSign className="w-3 h-3 xs:w-4 xs:h-4 text-[#09b29d] mr-0.5 xs:mr-1" />
                      <span className="text-[10px] xs:text-xs sm:text-sm">
                        {formatCurrency(donation.amount, donation.currency)}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 xs:px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 capitalize hidden lg:table-cell">
                    {donation.paymentMethod || "N/A"}
                  </td>
                  <td className="px-3 xs:px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    {getStatusBadge(donation.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Card */}
      <div className="mt-6 bg-gradient-to-r from-[#09b29d] to-[#07a088] rounded-lg p-4 xs:p-5 sm:p-6 text-white -mx-2 xs:mx-0">
        <h3 className="text-base xs:text-lg font-semibold mb-3 xs:mb-4">
          Donation Summary
        </h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 xs:gap-4">
          <div>
            <p className="text-white/80 text-xs xs:text-sm">Total Donations</p>
            <p className="text-xl xs:text-2xl font-bold">{donations.length}</p>
          </div>
          <div>
            <p className="text-white/80 text-xs xs:text-sm">
              Successful Donations
            </p>
            <p className="text-xl xs:text-2xl font-bold">
              {donations.filter((d) => d.status === "succeeded").length}
            </p>
          </div>
          <div className="xs:col-span-2 md:col-span-1">
            <p className="text-white/80 text-xs xs:text-sm">
              Total Contributed
            </p>
            <p className="text-xl xs:text-2xl font-bold">
              {formatCurrency(
                donations
                  .filter((d) => d.status === "succeeded")
                  .reduce((sum, d) => sum + d.amount, 0),
                donations[0]?.currency || "GBP",
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
