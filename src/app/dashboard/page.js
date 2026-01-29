"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { PrimaryButton } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ProtectedRoute from "@/components/ProtectedRoute";
import { updateProfile } from "@/lib/api";
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
} from "lucide-react";

export default function DashboardPage() {
  const { user, logout, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
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
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                  Dashboard
                </h1>
                <p className="text-gray-600">
                  Welcome, {user?.username || user?.email || "User"}!
                </p>
              </div>
              {/* Donate Now Button */}
              <Link href="/donate">
                <PrimaryButton
                  text="Donate Now"
                  icon={Heart}
                  className="bg-[#09b29d] hover:bg-[#09b29d]/90 text-white px-8 py-3 text-lg"
                />
              </Link>
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
                            ? "border-[#09b29d] text-[#09b29d]"
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
                              ? "text-[#09b29d]"
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
    fullname: user?.fullname || "",
    email: user?.email || "",
    countryCode: user?.countryCode || "+1",
    phone: user?.phone || "",
    addressLine: user?.addressLine || "",
    city: user?.city || "",
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
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="w-40 px-4 py-3 bg-[#c8e6df] text-gray-900 font-semibold border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#09b29d] focus:border-[#09b29d]"
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

            {/* Country */}
            <div>
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
