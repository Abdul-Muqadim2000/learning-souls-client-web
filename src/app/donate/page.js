"use client";

import { useState } from "react";
import SecondaryButton, { PrimaryButton } from "@/components/ui/Button";
import Input, { NumberInput, EmailInput, Select } from "@/components/ui/Input";
import ToggleButtonGroup from "@/components/ui/ToggleButtonGroup";
import { ChevronRight } from "lucide-react";

export default function DonatePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Donation Details
    donationFrequency: "one-time", // 'one-time' or 'monthly'
    projects: [], // Array of selected projects
    donationType: "Lillah", // 'Lillah', 'Khairat', 'Kafarah', 'Zakat'
    amount: 50,
    // Step 2: User Details
    fullname: "",
    email: "",
    countryCode: "+1",
    phone: "",
    addressLine: "",
    city: "",
    country: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // TODO: Server communication will be implemented here
    console.log("Final donation data:", formData);
    alert("Donation submitted! (Server integration pending)");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center w-full">
            {[1, 2, 3].map((step, index) => (
              <>
                <div
                  key={step}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition shrink-0 ${
                    currentStep >= step
                      ? "border-green-600 bg-green-600 text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {step}
                </div>
                {index < 2 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition ${
                      currentStep > step ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs font-medium text-gray-600">
              Donation Details
            </span>
            <span className="text-xs font-medium text-gray-600 mr-10">
              Your Information
            </span>
            <span className="text-xs font-medium text-gray-600">Payment</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === 1 && (
            <Step1 formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 2 && (
            <Step2 formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 3 && <Step3 formData={formData} />}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 1 && (
              <SecondaryButton
                onClick={handleBack}
                text="Back"
                className="hover:text-white"
              />
            )}
            {currentStep < 3 ? (
              <PrimaryButton
                onClick={handleNext}
                text="Next"
                icon={ChevronRight}
              />
            ) : (
              <PrimaryButton
                onClick={handleSubmit}
                text="Complete Donation"
                className="ml-auto bg-green-600 hover:bg-green-700"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 1: Donation Details
function Step1({ formData, updateFormData }) {
  const projects = [
    "Al-Mustafa Translation",
    "Distributing Quran and Seerah",
    "Quran Translation for All",
    "Translation of Hadith",
    "Books Distribution Project",
    "General Fund",
  ];

  const suggestedProjects = [
    {
      name: "Emergency Relief Fund",
      description: "Support urgent needs in crisis situations",
      image: "/images/ucb1.webp", // Placeholder - you'll provide the actual image
    },
    {
      name: "Education Scholarships",
      description: "Help students access quality education",
      image: "/images/ucb2.webp", // Placeholder - you'll provide the actual image
    },
    {
      name: "Water Wells Project",
      description: "Provide clean water to communities",
      image: "/images/ucb3.webp", // Placeholder - you'll provide the actual image
    },
  ];

  const quickAmounts = [25, 50, 100];

  const toggleProject = (projectName) => {
    const currentProjects = formData.projects || [];
    if (currentProjects.includes(projectName)) {
      // Remove project if already selected
      updateFormData(
        "projects",
        currentProjects.filter((p) => p !== projectName),
      );
    } else {
      // Add project to the list
      updateFormData("projects", [...currentProjects, projectName]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Donation Details
        </h2>
        <p className="text-gray-600">Choose your donation preferences</p>
      </div>

      {/* Donation Frequency Toggle */}
      <ToggleButtonGroup
        label="Donation Frequency"
        options={[
          {
            value: "one-time",
            label: "One-Time",
            description: "Single donation",
          },
          {
            value: "monthly",
            label: "Monthly",
            description: "Recurring donation",
          },
        ]}
        value={formData.donationFrequency}
        onChange={(value) => updateFormData("donationFrequency", value)}
        columns={2}
      />

      {/* Project Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Select Project(s) to Donate To
        </label>

        {/* Display selected projects */}
        {formData.projects && formData.projects.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {formData.projects.map((project) => (
              <div
                key={project}
                className="inline-flex items-center gap-2 bg-[#c8e6df] text-gray-900 px-4 py-2 rounded-full text-sm font-medium"
              >
                <span>{project}</span>
                <button
                  onClick={() => toggleProject(project)}
                  className="text-gray-600 hover:text-red-600 transition"
                  aria-label="Remove project"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <Select
          value=""
          onChange={(e) => {
            if (e.target.value && !formData.projects.includes(e.target.value)) {
              toggleProject(e.target.value);
            }
          }}
          placeholder="Choose a project..."
          options={projects}
          className="pr-16"
        />
      </div>

      {/* Suggested Projects - Show when at least one project is selected */}
      {formData.projects && formData.projects.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-blue-900 mb-4">
            Other Projects You Might Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {suggestedProjects.map((project) => {
              const isSelected = formData.projects.includes(project.name);
              return (
                <button
                  key={project.name}
                  onClick={() => toggleProject(project.name)}
                  className="relative h-48 rounded-lg overflow-hidden transition-all duration-200 transform hover:scale-105 group"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundColor: isSelected ? "#09b29d" : "#6366f1", // Fallback colors
                    }}
                  />

                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 transition-all duration-200 ${
                      isSelected
                        ? "bg-gradient-to-t from-green-900/90 via-green-800/70 to-green-700/50"
                        : "bg-gradient-to-t from-black/80 via-black/60 to-black/30 group-hover:from-black/70 group-hover:via-black/50 group-hover:to-black/20"
                    }`}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end text-left">
                    {isSelected && (
                      <div className="absolute top-3 right-3 bg-white rounded-full p-1">
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    <h4 className="font-bold text-white mb-2 leading-tight drop-shadow-lg">
                      {project.name}
                    </h4>
                    <p className="text-sm text-gray-200 drop-shadow">
                      {project.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Donation Type */}
      <ToggleButtonGroup
        label="Donation Type"
        options={["Lillah", "Khairat", "Kafarah", "Zakat"]}
        value={formData.donationType}
        onChange={(value) => updateFormData("donationType", value)}
        responsiveColumns={{ base: 2, sm: 2, md: 4, lg: 4 }}
      />

      {/* Quick Amount Selection */}
      <ToggleButtonGroup
        label="Quick Selection"
        options={quickAmounts.map((amount) => ({
          value: amount,
          label: `$${amount}`,
        }))}
        value={formData.amount}
        onChange={(value) => updateFormData("amount", value)}
        columns={3}
      />

      {/* Custom Amount Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          OR Enter Custom Amount (USD)
        </label>
        <div className="relative">
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-lg z-10">
            $
          </span>
          <NumberInput
            value={formData.amount}
            onChange={(e) =>
              updateFormData("amount", parseFloat(e.target.value) || 0)
            }
            min="1"
            step="0.01"
            placeholder="Enter custom amount"
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
}

// Step 2: User Details
function Step2({ formData, updateFormData }) {
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Information
        </h2>
        <p className="text-gray-600">
          We need these details to process your donation
        </p>
      </div>

      {/* Full Name */}
      <Input
        type="text"
        label="Full Name"
        value={formData.fullname}
        onChange={(e) => updateFormData("fullname", e.target.value)}
        placeholder="Enter your full name"
        required
      />

      {/* Email Address */}
      <EmailInput
        label="Email Address"
        value={formData.email}
        onChange={(e) => updateFormData("email", e.target.value)}
        placeholder="your.email@example.com"
        required
      />

      {/* Phone Number with Country Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <Select
            value={formData.countryCode}
            onChange={(e) => updateFormData("countryCode", e.target.value)}
            options={countryCodes.map((item) => ({
              value: item.code,
              label: `${item.code} (${item.country})`,
            }))}
            className="w-40"
          />
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
            placeholder="Phone number"
            required
            className="flex-1"
          />
        </div>
      </div>

      {/* Address Line */}
      <Input
        type="text"
        label="Address Line"
        value={formData.addressLine}
        onChange={(e) => updateFormData("addressLine", e.target.value)}
        placeholder="Street address, P.O. box, etc."
      />

      {/* City and Country */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="text"
          label="City"
          value={formData.city}
          onChange={(e) => updateFormData("city", e.target.value)}
          placeholder="City"
        />
        <Input
          type="text"
          label="Country"
          value={formData.country}
          onChange={(e) => updateFormData("country", e.target.value)}
          placeholder="Country"
        />
      </div>
    </div>
  );
}

// Step 3: Payment (Placeholder)
function Step3({ formData }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment</h2>
        <p className="text-gray-600">Complete your donation securely</p>
      </div>

      {/* Donation Summary */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-4">
          Donation Summary
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">Frequency:</span>
            <span className="font-medium text-gray-900">
              {formData.donationFrequency === "one-time"
                ? "One-Time"
                : "Monthly"}
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-gray-700">Project(s):</span>
            <div className="font-medium text-gray-900">
              {formData.projects && formData.projects.length > 0
                ? formData.projects.join(", ")
                : "General Fund"}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Type:</span>
            <span className="font-medium text-gray-900">
              {formData.donationType}
            </span>
          </div>
          <div className="flex justify-between pt-3 border-t border-green-300">
            <span className="text-gray-700 font-semibold">Amount:</span>
            <span className="font-bold text-green-700 text-xl">
              ${formData.amount.toFixed(2)} USD
            </span>
          </div>
        </div>
      </div>

      {/* User Details Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Your Information
        </h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-600">Name:</span>{" "}
            <span className="font-medium text-gray-900">
              {formData.fullname}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Email:</span>{" "}
            <span className="font-medium text-gray-900">{formData.email}</span>
          </div>
          <div>
            <span className="text-gray-600">Phone:</span>{" "}
            <span className="font-medium text-gray-900">
              {formData.countryCode} {formData.phone}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Address:</span>{" "}
            <span className="font-medium text-gray-900">
              {formData.addressLine}, {formData.city}, {formData.country}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Placeholder */}
      <div className="bg-blue-50 border-2 border-blue-300 border-dashed rounded-lg p-8 text-center">
        <div className="text-blue-600 mb-3">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-blue-900 mb-2">
          Payment Integration Coming Soon
        </h3>
        <p className="text-blue-700 mb-4">
          Stripe payment gateway will be integrated here
        </p>
        <div className="text-sm text-blue-600">
          <p>✓ Secure payment processing</p>
          <p>✓ Multiple payment methods</p>
          <p>✓ Instant receipt via email</p>
        </div>
      </div>
    </div>
  );
}
