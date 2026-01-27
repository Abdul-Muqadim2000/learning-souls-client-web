"use client";

import { useState } from "react";
import GenericHeader from "@/components/GenericHeader";
import Input, { EmailInput, TextArea, Select } from "@/components/ui/Input";
import { PrimaryButton } from "@/components/ui/Button";
import { Users, Heart, Sparkles, Send } from "lucide-react";

export default function JoinUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    volunteerWork: "",
    emailAddress: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const volunteerOptions = [
    { value: "", label: "Select Volunteer Work" },
    { value: "quran-translation", label: "Help in Quran Translation" },
    { value: "financial", label: "Financial" },
    { value: "expertise", label: "Expertise" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (!formData.volunteerWork) {
      newErrors.volunteerWork = "Please select a volunteer work type";
    }

    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please leave a message";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setSubmitSuccess(true);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        volunteerWork: "",
        emailAddress: "",
        message: "",
      });
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="w-full">
      {/* Section 1: Generic Header */}
      <GenericHeader
        image="/images/join-us.jpg"
        textColor="white"
        height="xxl"
        // overlay={true}
      />

      {/* Section 2: Content Section */}
      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          {/* Decorative elements */}
          <div className="flex justify-center mb-6">
            <div className="flex gap-4 items-center">
              <Sparkles className="w-8 h-8 text-[#09b29d] animate-pulse" />
              <Heart className="w-10 h-10 text-[#bd2387] animate-bounce" />
              <Sparkles className="w-8 h-8 text-[#09b29d] animate-pulse" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#09b29d] mb-8 leading-tight">
            Learning Soul Wants YOU!
          </h2>

          {/* Description */}
          <div className="space-y-6 text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">
            <p className="font-bold text-2xl md:text-3xl text-[#bd2387] leading-relaxed">
              Give hope, uplift hearts, and light the world with compassion.
            </p>

            <p className="leading-relaxed">
              At Learning Soul, we&apos;re on a mission to create lasting change
              through knowledge, kindness, and action. We&apos;re calling on
              passionate individuals like you to join our volunteer family, a
              community driven by purpose and fueled by compassion.
            </p>

            <p className="leading-relaxed">
              This is your moment to be the reason someone believes in goodness
              again. Whether it&apos;s helping to spread awareness, supporting
              our donation drives, or contributing your time and skills,
              there&apos;s a place for you here.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Join Us Form */}
      <section className="w-full py-10 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {/* Form Container */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-[#09b29d]/30">
            {/* Form Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-[#09b29d] mb-3">
                Join Us Today
              </h2>
              <p className="text-lg text-gray-600 font-medium">
                Register now and become a part of the Learning Soul family
                today!
              </p>
            </div>

            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-100 border-2 border-green-400 rounded-lg text-green-700 text-center font-semibold animate-bounce">
                🎉 Thank you for joining us! We&apos;ll be in touch soon!
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  label="First Name"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  required
                  className="border-[#09b29d]/30 focus:border-[#09b29d] focus:ring-[#09b29d]/20"
                />
                <Input
                  type="text"
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  required
                  className="border-[#09b29d]/30 focus:border-[#09b29d] focus:ring-[#09b29d]/20"
                />
              </div>

              {/* Phone Number */}
              <Input
                type="tel"
                label="Phone Number"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
                required
                className="border-[#09b29d]/30 focus:border-[#09b29d] focus:ring-[#09b29d]/20"
              />

              {/* Volunteer Work */}
              <Select
                label="Volunteer Work"
                name="volunteerWork"
                value={formData.volunteerWork}
                onChange={handleChange}
                options={volunteerOptions}
                error={errors.volunteerWork}
                required
                className="border-[#09b29d]/30 focus:border-[#09b29d] focus:ring-[#09b29d]/20"
              />

              {/* Email Address */}
              <EmailInput
                label="Email Address"
                name="emailAddress"
                placeholder="Enter your email address"
                value={formData.emailAddress}
                onChange={handleChange}
                error={errors.emailAddress}
                required
                className="border-[#09b29d]/30 focus:border-[#09b29d] focus:ring-[#09b29d]/20"
              />

              {/* Leave Your Message */}
              <TextArea
                label="Leave Your Message"
                name="message"
                placeholder="Tell us why you want to join and how you can help..."
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                rows={5}
                required
                className="border-[#09b29d]/30 focus:border-[#09b29d] focus:ring-[#09b29d]/20"
              />

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 bg-[#09b29d] hover:bg-[#09b29d]/90 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      Join Us
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
