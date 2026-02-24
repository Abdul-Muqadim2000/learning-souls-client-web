"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import SecondaryButton, { PrimaryButton } from "@/components/ui/Button";
import Input, { NumberInput, EmailInput, Select } from "@/components/ui/Input";
import SearchableSelect from "@/components/ui/SearchableSelect";
import ToggleButtonGroup from "@/components/ui/ToggleButtonGroup";
import countries from "@/lib/countries";
import countryCodes from "@/lib/countryCodes";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Mail,
  RefreshCcwIcon,
} from "lucide-react";

export default function DonatePage() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const formContainerRef = useRef(null);
  const progressBarRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    // Step 1: Donation Details
    donationFrequency: "one-time", // 'one-time' or 'monthly'
    projects: [], // Array of {name, amount} objects
    donationType: "Lillah", // 'Lillah', 'Khairat', 'Kafarah', 'Zakat'
    amount: 50,
    currency: "GBP", // Default currency
    // Step 2: User Details
    fullname: "",
    email: "",
    countryCode: "+1",
    phone: "",
    addressLine: "",
    city: "",
    postalCode: "",
    country: "",
    // Step 3: Gift Aid
    giftAid: false,
    // Step 4: Payment Method
    paymentMethod: "", // 'paypal', 'stripe', 'bank-transfer'
  });

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedFormData = localStorage.getItem("donateFormData");
    const savedStep = localStorage.getItem("donateCurrentStep");

    if (savedFormData) {
      try {
        const parsed = JSON.parse(savedFormData);
        setFormData(parsed);
      } catch (error) {
        console.error("Error loading saved form data:", error);
      }
    }

    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("donateFormData", JSON.stringify(formData));
  }, [formData]);

  // Save current step to localStorage
  useEffect(() => {
    localStorage.setItem("donateCurrentStep", currentStep.toString());
  }, [currentStep]);

  // Reset loading state when user returns to page (e.g., browser back from payment)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setIsLoading(false);
        // Clear any redirect flag when page becomes visible
        const wasRedirecting = sessionStorage.getItem("donateRedirecting");
        if (wasRedirecting) {
          sessionStorage.removeItem("donateRedirecting");
          // Optionally show a message that payment was cancelled
          setErrorMessage(
            "Payment was cancelled. You can modify your donation and try again.",
          );
        }
      }
    };

    // Reset loading state on mount (when user navigates back)
    setIsLoading(false);
    // Check if user came back from a redirect
    const wasRedirecting = sessionStorage.getItem("donateRedirecting");
    if (wasRedirecting) {
      sessionStorage.removeItem("donateRedirecting");
      setErrorMessage(
        "Payment was cancelled. You can modify your donation and try again.",
      );
    }

    // Listen for page visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Auto-detect country code based on user location
  useEffect(() => {
    const detectCountryCode = async () => {
      try {
        // Use ipapi.co for geolocation (free tier available)
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        // Map country codes to phone codes
        const countryToPhoneCode = {
          US: "+1",
          CA: "+1",
          GB: "+44",
          IN: "+91",
          PK: "+92",
          AE: "+971",
          SA: "+966",
          EG: "+20",
          BD: "+880",
        };

        const detectedCode = countryToPhoneCode[data.country_code] || "+1";

        // Store detected location and ask for permission
        setDetectedLocation({
          countryCode: detectedCode,
          country: data.country_name,
        });
      } catch (error) {
        console.log("Could not detect country code:", error);
        // Keep default +1 if detection fails
      }
    };

    // Only detect if not authenticated (authenticated users have their saved country code)
    if (!isAuthenticated && !formData.phone && !detectedLocation) {
      detectCountryCode();
    }
  }, [isAuthenticated, detectedLocation]);

  // Auto-apply detected location without popup
  useEffect(() => {
    if (detectedLocation && !formData.phone) {
      // Automatically use detected location (no popup)
      setFormData((prev) => ({
        ...prev,
        countryCode: detectedLocation.countryCode,
        country: detectedLocation.country,
      }));

      // Clear detected location after handling
      setDetectedLocation(null);
    }
  }, [detectedLocation]);

  // Pre-fill user data when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        fullname: user.fullname || prev.fullname,
        email: user.email || prev.email,
        countryCode: user.countryCode || prev.countryCode,
        phone: user.phone || prev.phone,
        addressLine: user.addressLine || prev.addressLine,
        city: user.city || prev.city,
        postalCode: user.postalCode || prev.postalCode,
        country: user.country || prev.country,
      }));
    }
  }, [isAuthenticated, user]);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Scroll to top of form (progress bar) when page loads or step changes
  useEffect(() => {
    if (
      (pathname === "/donate" || pathname?.startsWith("/projects/")) &&
      progressBarRef.current
    ) {
      progressBarRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentStep, pathname]);

  // Scroll to top on initial page load
  useEffect(() => {
    if (
      (pathname === "/donate" || pathname?.startsWith("/projects/")) &&
      progressBarRef.current
    ) {
      // Scroll to top immediately when component mounts
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  const handleNext = () => {
    // Clear previous error messages
    setErrorMessage("");
    setSuccessMessage("");

    // Validate step 1: At least one project must be selected
    if (currentStep === 1) {
      if (!formData.projects || formData.projects.length === 0) {
        setErrorMessage(
          "Please select at least one project to donate to before proceeding.",
        );
        return;
      }
    }

    // Validate step 2: Required fields must be filled
    if (currentStep === 2) {
      if (!formData.fullname || !formData.email || !formData.phone) {
        setErrorMessage(
          "Please fill in all required fields (Full Name, Email, and Phone Number) before proceeding.",
        );
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    // Clear error messages when going back
    setErrorMessage("");
    setSuccessMessage("");
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    // Clear localStorage
    localStorage.removeItem("donateFormData");
    localStorage.removeItem("donateCurrentStep");

    // Reset form data to initial state
    setFormData({
      donationFrequency: "one-time",
      projects: [],
      donationType: "Lillah",
      amount: 50,
      currency: "GBP",
      fullname: "",
      email: "",
      countryCode: "+1",
      phone: "",
      addressLine: "",
      city: "",
      postalCode: "",
      country: "",
      giftAid: false,
      paymentMethod: "",
    });

    // Clear messages
    setErrorMessage("");
    setSuccessMessage("");

    // Go back to step 1
    setCurrentStep(1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/public/donate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Donation failed");
      }

      console.log("Response data:", data);

      // Handle Stripe/PayPal redirect
      if (data.data?.redirectUrl) {
        // Don't clear form data yet - only clear it after successful payment confirmation
        // This allows users to return and retry if they cancel the payment
        // Mark that we're redirecting so we can reset state if user comes back
        sessionStorage.setItem("donateRedirecting", "true");
        window.location.href = data.data.redirectUrl;
        return;
      }

      // Handle other payment methods (bank transfer, etc.)
      // Clear form data only for bank transfer since it's immediately complete
      if (formData.paymentMethod === "bank-transfer") {
        localStorage.removeItem("donateFormData");
        localStorage.removeItem("donateCurrentStep");
      }

      // Removed alert popup - success is shown on the success page
      setIsLoading(false);
      window.location.href = "/donate/success";
    } catch (error) {
      console.error("Error submitting donation:", error);
      setErrorMessage(
        error.message || "Failed to process donation. Please try again.",
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 xs:py-8 sm:py-12 px-2 xs:px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Indicator */}
        <div ref={progressBarRef} className="mb-6 xs:mb-8">
          <div className="flex items-center w-full">
            {[1, 2, 3, 4].map((step, index) => (
              <>
                <div
                  key={step}
                  className={`flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 rounded-full border-2 transition shrink-0 text-sm xs:text-base ${
                    currentStep >= step
                      ? "border-(--color-secondary) bg-(--color-secondary) text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {step}
                </div>
                {index < 3 && (
                  <div
                    className={`flex-1 h-0.5 xs:h-1 mx-1 xs:mx-2 transition ${
                      currentStep > step
                        ? "bg-(--color-secondary)"
                        : "bg-gray-300"
                    }`}
                  />
                )}
              </>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] xs:text-xs font-medium text-gray-600">
              Donation
            </span>
            <span className="text-[10px] xs:text-xs font-medium text-gray-600 -ml-2 xs:ml-0 lg:mr-14">
              Information
            </span>
            <span className="text-[10px] xs:text-xs font-medium text-gray-600 lg:mr-18">
              Gift Aid
            </span>
            <span className="text-[10px] xs:text-xs font-medium text-gray-600">
              Payment
            </span>
          </div>
        </div>

        {/* Step Content */}
        <div
          ref={formContainerRef}
          className="bg-white rounded-lg shadow-lg p-3 xs:p-4 sm:p-6 lg:p-8"
        >
          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Error</p>
                  <p className="text-sm mt-1">{errorMessage}</p>
                </div>
                <button
                  onClick={() => setErrorMessage("")}
                  className="ml-4 text-red-500 hover:text-red-700"
                  aria-label="Close"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Success</p>
                  <p className="text-sm mt-1">{successMessage}</p>
                </div>
                <button
                  onClick={() => setSuccessMessage("")}
                  className="ml-4 text-green-500 hover:text-green-700"
                  aria-label="Close"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <Step1 formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 2 && (
            <Step2
              formData={formData}
              updateFormData={updateFormData}
              handleReset={handleReset}
            />
          )}
          {currentStep === 3 && (
            <Step3 formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 4 && (
            <Step4 formData={formData} updateFormData={updateFormData} />
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6">
            {currentStep > 0 && (
              <SecondaryButton
                onClick={handleBack}
                text="Back"
                icon={ChevronLeft}
                disabled={currentStep === 1}
                className="hover:text-white text-sm sm:text-base w-full sm:w-auto"
              />
            )}
            {currentStep < 4 ? (
              <PrimaryButton
                onClick={handleNext}
                text="Next"
                icon={ChevronRight}
                disabled={
                  (currentStep === 1 &&
                    (!formData.projects || formData.projects.length === 0)) ||
                  (currentStep === 2 &&
                    (!formData.fullname || !formData.email || !formData.phone))
                }
                className="text-sm sm:text-base w-full sm:w-auto"
              />
            ) : (
              <PrimaryButton
                onClick={handleSubmit}
                text={
                  isLoading
                    ? "Processing..."
                    : formData.paymentMethod === "stripe"
                      ? "Proceed to Payment"
                      : formData.paymentMethod === "paypal"
                        ? "Proceed to Payment"
                        : "Get Bank Details"
                }
                icon={isLoading ? Loader2 : CheckCircle}
                className={`ml-auto text-xs sm:text-sm md:text-base w-full sm:w-auto ${
                  formData.paymentMethod === "stripe"
                    ? "!bg-[#635BFF] hover:!bg-[#5349e6]"
                    : formData.paymentMethod === "paypal"
                      ? "!bg-[#2790C3] hover:!bg-[#1f7ba8]"
                      : "!bg-green-600 hover:!bg-green-700"
                }`}
                iconClassName={isLoading ? "animate-spin" : ""}
                disabled={isLoading || !formData.paymentMethod}
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
  // Helper function to get currency symbol
  const getCurrencySymbol = (currency) => {
    const symbols = {
      GBP: "£",
      USD: "$",
      EUR: "€",
      AED: "د.إ",
      SAR: "ر.س",
      PKR: "₨",
      INR: "₹",
    };
    return symbols[currency] || "$";
  };

  const projects = [
    {
      name: "Distributing Quran Seerah",
      description:
        "Distributing Quran Translations and Seerah Books to Multi-Faith Rooms in NHS Hospitals and HM Prisons Services.",
      image: "/images/ucb1.webp",
    },
    {
      name: "Quran Translations",
      description:
        "Publishing & Distributing Quran Translations for Children through Electronic and Paper Media.",
      image: "/images/ucb2.webp",
    },
    {
      name: "Encyclopedia of Hadith",
      description:
        "Developing a Free, Multi-Language Encyclopedia of Hadith of Prophet Muhammad (PBUH).",
      image: "/images/ucb3.webp",
    },
  ];

  const quickAmounts = [25, 50, 100];

  const toggleProject = (projectName) => {
    const currentProjects = formData.projects || [];
    const existingProject = currentProjects.find((p) => p.name === projectName);

    if (existingProject) {
      // Remove project if already selected
      updateFormData(
        "projects",
        currentProjects.filter((p) => p.name !== projectName),
      );
    } else {
      // Add project to the list with current amount
      updateFormData("projects", [
        ...currentProjects,
        { name: projectName, amount: formData.amount || 50 },
      ]);
    }
  };

  const updateProjectAmount = (projectName, amount) => {
    const currentProjects = formData.projects || [];
    // Allow empty string, otherwise parse to number
    const parsedAmount = amount === "" ? "" : parseFloat(amount) || 0;
    updateFormData(
      "projects",
      currentProjects.map((p) =>
        p.name === projectName ? { ...p, amount: parsedAmount } : p,
      ),
    );

    // If only one project, sync the amount to formData.amount
    if (currentProjects.length === 1) {
      updateFormData("amount", parsedAmount);
    }
  };

  // Get available projects (not selected)
  const selectedProjectNames = formData.projects.map((p) => p.name);
  const availableProjects = projects.filter(
    (project) => !selectedProjectNames.includes(project.name),
  );

  return (
    <div className="space-y-4 xs:space-y-6">
      <div>
        <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-1 xs:mb-2">
          Support our Projects
        </h2>
        <p className="text-sm xs:text-base text-gray-600">
          Choose your donation preferences
        </p>
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

      {/* Currency Selection */}
      <Select
        label="Currency"
        value={formData.currency}
        onChange={(e) => updateFormData("currency", e.target.value)}
        options={[
          { value: "GBP", label: "£ British Pound (GBP)" },
          { value: "USD", label: "$ US Dollar (USD)" },
          { value: "EUR", label: "€ Euro (EUR)" },
          { value: "AED", label: "د.إ UAE Dirham (AED)" },
          { value: "SAR", label: "ر.س Saudi Riyal (SAR)" },
          { value: "PKR", label: "₨ Pakistani Rupee (PKR)" },
          { value: "INR", label: "₹ Indian Rupee (INR)" },
        ]}
        required
      />

      {/* Project Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Select Project(s) to Donate To
        </label>

        {/* Display selected projects with amount inputs */}
        {formData.projects && formData.projects.length > 0 && (
          <div className="mb-4 space-y-3">
            {formData.projects.map((project) => (
              <div
                key={project.name}
                className="bg-[#c8e6df] border border-green-300 rounded-lg p-3 xs:p-4"
              >
                <div className="flex flex-col xs:flex-row xs:items-center gap-3 xs:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm xs:text-base">
                      {project.name}
                    </div>
                    <div className="text-xs xs:text-sm text-gray-600 mt-1 line-clamp-2 xs:line-clamp-none">
                      {
                        projects.find((p) => p.name === project.name)
                          ?.description
                      }
                    </div>
                  </div>
                  <div className="flex items-center gap-2 xs:gap-2 justify-between xs:justify-end">
                    {/* Show amount input only when more than 1 project is selected */}
                    {formData.projects.length > 1 && (
                      <div className="relative flex-1 xs:flex-initial">
                        <span className="absolute left-2 xs:left-3 top-1/2 -translate-y-1/2 text-gray-600 font-medium text-sm xs:text-base">
                          {getCurrencySymbol(formData.currency)}
                        </span>
                        <NumberInput
                          value={project.amount}
                          onChange={(e) =>
                            updateProjectAmount(project.name, e.target.value)
                          }
                          min="1"
                          step="1"
                          placeholder="Amount"
                          className="pl-6 xs:pl-7 pr-2 w-full xs:w-28 sm:w-32 text-sm xs:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    )}
                    <button
                      onClick={() => toggleProject(project.name)}
                      className="text-gray-600 hover:text-red-600 transition p-1.5 xs:p-2 hover:bg-red-50 rounded flex-shrink-0"
                      aria-label="Remove project"
                    >
                      <svg
                        className="w-4 h-4 xs:w-5 xs:h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Show total when multiple projects selected */}
            {formData.projects.length > 1 && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-base xs:text-lg font-semibold text-gray-900">
                    Total Donation:
                  </span>
                  <span className="text-xl xs:text-2xl font-bold text-green-700">
                    {getCurrencySymbol(formData.currency)}
                    {formData.projects
                      .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0)
                      .toFixed(2)}{" "}
                    {formData.currency}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Show dropdown only if there are available projects */}
        {availableProjects.length > 0 && (
          <Select
            value=""
            onChange={(e) => {
              if (e.target.value) {
                toggleProject(e.target.value);
              }
            }}
            placeholder="Choose a project..."
            options={availableProjects.map((p) => p.name)}
            className="pr-16"
          />
        )}
      </div>

      {/* Suggested Projects - Show only unselected projects when at least one project is selected */}
      {formData.projects &&
        formData.projects.length > 0 &&
        availableProjects.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5">
            <h3 className="text-base font-semibold text-blue-900 mb-4">
              Other Projects You Might Like
            </h3>
            <div
              className={`grid grid-cols-1 gap-4 ${
                availableProjects.length === 1
                  ? "sm:grid-cols-1"
                  : "sm:grid-cols-2"
              }`}
            >
              {availableProjects.map((project) => (
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
                      backgroundColor: "#6366f1", // Fallback color
                    }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 transition-all duration-200 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/20" />

                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end text-left">
                    <h4 className="font-bold text-white mb-2 leading-tight drop-shadow-lg">
                      {project.name}
                    </h4>
                    <p className="text-sm text-gray-200 drop-shadow">
                      {project.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

      {/* Donation Type */}
      <ToggleButtonGroup
        label="Donation Type"
        options={[
          { value: "Lillah", label: "Lillah" },
          { value: "Khairat", label: "Khairat" },
          {
            value: "Kafarah",
            label: "Kafarah",
            description: "NOT APPLICABLE",
            disabled: true,
          },
          {
            value: "Zakat",
            label: "Zakat",
            description: "NOT APPLICABLE",
            disabled: true,
          },
        ]}
        value={formData.donationType}
        onChange={(value) => updateFormData("donationType", value)}
        responsiveColumns={{ base: 2, sm: 2, md: 4, lg: 4 }}
      />

      {/* Show Quick Amount and Custom Amount when no projects selected OR exactly 1 project selected */}
      {(!formData.projects ||
        formData.projects.length === 0 ||
        formData.projects.length === 1) && (
        <>
          {/* Quick Amount Selection */}
          <ToggleButtonGroup
            label="Quick Selection"
            options={quickAmounts.map((amount) => ({
              value: amount,
              label: `${getCurrencySymbol(formData.currency)}${amount}`,
            }))}
            value={formData.amount}
            onChange={(value) => {
              updateFormData("amount", value);

              // If only one project is selected, also update that project's amount
              if (formData.projects && formData.projects.length === 1) {
                const currentProjects = formData.projects;
                updateFormData(
                  "projects",
                  currentProjects.map((p) => ({
                    ...p,
                    amount: value,
                  })),
                );
              }
            }}
            columns={3}
          />

          {/* Custom Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OR Enter Custom Amount ({formData.currency})
            </label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-lg z-10">
                {getCurrencySymbol(formData.currency)}
              </span>
              <NumberInput
                value={formData.amount}
                onChange={(e) => {
                  const value = e.target.value;
                  const parsedAmount =
                    value === "" ? "" : parseFloat(value) || "";

                  // Update the main amount
                  updateFormData("amount", parsedAmount);

                  // If only one project is selected, also update that project's amount
                  if (formData.projects && formData.projects.length === 1) {
                    const currentProjects = formData.projects;
                    updateFormData(
                      "projects",
                      currentProjects.map((p) => ({
                        ...p,
                        amount: parsedAmount,
                      })),
                    );
                  }
                }}
                min="1"
                step="1"
                placeholder="Enter custom amount"
                className="pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Step 2: User Details
function Step2({ formData, updateFormData, handleReset }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Information
          </h2>
          <p className="text-gray-600">
            We need these details to process your donation
          </p>
        </div>
        <PrimaryButton
          text="Reset Form"
          icon={RefreshCcwIcon}
          onClick={handleReset}
          className="!bg-red-600 hover:!bg-red-700 !border-red-600 hover:!border-red-700 !text-xs !px-2 !py-1.5 sm:!text-sm sm:!px-4 sm:!py-2 md:!text-base whitespace-nowrap shrink-0"
        />
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
        <div className="flex flex-col sm:flex-row gap-2">
          <SearchableSelect
            value={formData.countryCode}
            onChange={(e) => updateFormData("countryCode", e.target.value)}
            placeholder="Select code"
            searchPlaceholder="Search country or code..."
            noResultsText="No country code found"
            options={countryCodes.map((item) => ({
              value: item.code,
              label: `${item.code} (${item.country})`,
            }))}
            className="w-full sm:w-52 md:w-56 lg:w-60 xl:w-64"
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
      {/* Country */}
      <SearchableSelect
        label="Country"
        value={formData.country}
        onChange={(e) => updateFormData("country", e.target.value)}
        placeholder="Select your country"
        searchPlaceholder="Search for a country..."
        noResultsText="No country found"
        options={countries}
      />

      {/* Address Line */}
      <Input
        type="text"
        label="Address Line"
        value={formData.addressLine}
        onChange={(e) => updateFormData("addressLine", e.target.value)}
        placeholder="Street address, P.O. box, etc."
      />

      {/* City, Postal Code, and Country */}
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
          label="Postal Code"
          value={formData.postalCode}
          onChange={(e) => updateFormData("postalCode", e.target.value)}
          placeholder="Postal code / ZIP code"
        />
      </div>
    </div>
  );
}

// Step 3: Gift Aid
function Step3({ formData, updateFormData }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Reclaim Gift Aid
        </h2>
        <p className="text-gray-600 mb-6">
          Add 25% more to your donation at no cost to you. A Gift Aid
          declaration allows Learning Souls: Books of Light to claim tax back on
          eligible donations. It means that for every £1 you donate to Learning
          Souls: Books of Light we can claim back 25p, at no extra cost to you.
        </p>
      </div>

      {/* Gift Aid Checkbox */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
        <label className="flex items-start gap-4 cursor-pointer group">
          <div className="relative flex items-center justify-center mt-1">
            <input
              type="checkbox"
              checked={formData.giftAid}
              onChange={(e) => updateFormData("giftAid", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-6 h-6 border-2 border-gray-400 rounded bg-white transition-all peer-checked:bg-[#09b29d] peer-checked:border-[#09b29d] peer-focus:ring-2 peer-focus:ring-[#09b29d] peer-focus:ring-offset-2 flex items-center justify-center">
              {formData.giftAid && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="flex-1">
            <span className="text-base font-semibold text-gray-900 group-hover:text-green-700 transition">
              Yes, I would like to claim Gift Aid (optional)
            </span>
            <p className="text-sm text-gray-700 mt-3 leading-relaxed">
              By ticking the &quot;Yes&quot; box, I agree I would like Learning
              Souls: Books of Light to reclaim the tax on all qualifying
              donations I have made, as well as any future donations, until I
              notify them otherwise. I understand that if I pay less Income Tax
              and/or Capital Gains Tax than the amount of Gift Aid claimed on
              all my donations in that tax year I may be asked to pay any
              difference. I understand that Learning Souls: Books of Light will
              reclaim 25p of tax on every £1 that I give.
            </p>
          </div>
        </label>
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h3 className="font-semibold text-blue-900 mb-2">Please Note:</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>You must be a UK taxpayer</li>
          <li>You must have paid at least as much tax as we will reclaim</li>
          <li>You can cancel your Gift Aid declaration at any time</li>
        </ul>
      </div>
    </div>
  );
}

// Step 4: Payment
function Step4({ formData, updateFormData }) {
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
              {formData.projects && formData.projects.length > 0 ? (
                <div className="space-y-2 mt-2">
                  {formData.projects.map((project) => (
                    <div
                      key={project.name}
                      className="flex justify-between items-center bg-white rounded px-3 py-2"
                    >
                      <span className="text-gray-800">{project.name}</span>
                      <span className="font-semibold text-green-700  ">
                        {formData.currency === "GBP"
                          ? "£"
                          : formData.currency === "EUR"
                            ? "€"
                            : formData.currency === "AED"
                              ? "د.إ"
                              : formData.currency === "SAR"
                                ? "ر.س"
                                : formData.currency === "PKR"
                                  ? "₨"
                                  : formData.currency === "INR"
                                    ? "₹"
                                    : "$"}
                        {project.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                "General Fund"
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Type:</span>
            <span className="font-medium text-gray-900">
              {formData.donationType}
            </span>
          </div>
          <div className="flex justify-between pt-3 border-t border-green-300">
            <span className="text-gray-700 font-semibold">Total Amount:</span>
            <span className="font-bold text-green-700 text-xl">
              {formData.currency === "GBP"
                ? "£"
                : formData.currency === "EUR"
                  ? "€"
                  : formData.currency === "AED"
                    ? "د.إ"
                    : formData.currency === "SAR"
                      ? "ر.س"
                      : formData.currency === "PKR"
                        ? "₨"
                        : formData.currency === "INR"
                          ? "₹"
                          : "$"}
              {formData.projects && formData.projects.length > 0
                ? formData.projects
                    .reduce((sum, p) => sum + (p.amount || 0), 0)
                    .toFixed(2)
                : formData.amount.toFixed(2)}{" "}
              {formData.currency}
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
              {formData.addressLine}
              {formData.city && `, ${formData.city}`}
              {formData.postalCode && `, ${formData.postalCode}`}
              {formData.country && `, ${formData.country}`}
            </span>
          </div>
        </div>
      </div>
      <ToggleButtonGroup
        label="Select Payment Method"
        options={[
          {
            value: "stripe",
            label: "Card Payment",
            description: "Pay with Debit/Credit Card",
            // badge: "Stripe",
            textColor: "#ffffff",
            badgeImage: "/images/stripe-logo.svg",
            bgColor: "#635BFF",
          },
          {
            value: "paypal",
            label: "PayPal",
            description: "Pay with PayPal",
            // badge: "PayPal",
            textColor: "#ffffff",
            badgeImage: "/images/paypal-logo.svg",
            bgColor: "#2790C3",
          },
          {
            value: "bank-transfer",
            label: "Bank Transfer",
            description: "Manual transfer",
            badge: <Mail size={16} strokeWidth={3} />,
            bgColor: "#f0f9ff",
          },
        ]}
        value={formData.paymentMethod}
        onChange={(value) => updateFormData("paymentMethod", value)}
        columns={3}
        responsiveColumns={{ sm: 1, md: 3, lg: 3 }}
      />
      <p className="text-xs mb-4 italic text-end">
        {formData.paymentMethod === "stripe" &&
          "You'll be redirected to Stripe's secure payment page"}
        {formData.paymentMethod === "paypal" &&
          `PayPal invoice will be sent to ${formData.email}`}
        {formData.paymentMethod === "bank-transfer" &&
          "Bank transfer details will be sent to your email"}
      </p>

      {/* Payment Method Info */}
      {/* <div className="bg-blue-50 border-2 border-blue-300 border-dashed rounded-lg p-8 text-center">
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
          {formData.paymentMethod === "stripe" &&
            "Card Payment - Integration Coming Soon"}
          {formData.paymentMethod === "paypal" &&
            "PayPal - Integration Coming Soon"}
          {formData.paymentMethod === "bank-transfer" &&
            "Bank Transfer Details Will Be Sent"}
        </h3>
        <p className="text-blue-700 mb-4">
          {formData.paymentMethod === "stripe" &&
            "You'll be redirected to Stripe's secure payment page"}
          {formData.paymentMethod === "paypal" &&
            "You'll be redirected to PayPal's secure payment page"}
          {formData.paymentMethod === "bank-transfer" &&
            "Bank transfer details will be sent to your email"}
        </p>
        <div className="text-sm text-blue-600">
          <p>✓ Secure payment processing</p>
          <p>✓ Multiple payment methods</p>
          <p>✓ Instant receipt via email</p>
        </div>
      </div> */}
    </div>
  );
}
