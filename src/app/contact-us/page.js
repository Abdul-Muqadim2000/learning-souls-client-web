"use client";

import { useState } from "react";
import GenericHeader from "@/components/GenericHeader";
import Input, { EmailInput, TextArea } from "@/components/ui/Input";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { submitContactUs } from "@/lib/api";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
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
    setSubmitError("");

    try {
      await submitContactUs(formData);
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitError(
        error.message || "Failed to submit form. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Section 1: Generic Header */}
      <GenericHeader
        title="Contact Us"
        image="/images/contact-us.webp"
        textColor="white"
        height="xxl"
        textSize="clamp(2rem, 4vw, 3.5rem)"
        imageClassName="!w-[260%] sm:!w-[180%] md:!w-full"
      />

      {/* Section 2: Form Section */}
      <section className="w-full py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Content with Leaf Shape */}
              <div className="bg-[#09b29d] text-white p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden rounded-bl-[80px] sm:rounded-bl-[120px] lg:rounded-bl-[150px] rounded-tr-[80px] sm:rounded-tr-[120px] lg:rounded-tr-[150px]">
                {/* Decorative curved shapes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <div className="space-y-6 relative z-10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                    Contact Us
                  </h2>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90">
                    Get in touch
                  </h3>
                  <div className="space-y-4 text-white/80 leading-relaxed">
                    <p>
                      We will be pleased to receive your messages, suggestions,
                      and complaints through this form. We will get in touch
                      with you as soon as possible.
                    </p>
                    <p>
                      Please note that response times may vary depending on our
                      current volume of inquiries.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="max-w-md mx-auto">
                  {/* Success Message */}
                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-green-100 border-2 border-green-400 rounded-lg text-green-700 text-center font-semibold">
                      ✓ Thank you! We&apos;ll get back to you soon.
                    </div>
                  )}

                  {/* Error Message */}
                  {submitError && (
                    <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-lg text-red-700 text-center font-semibold">
                      ✗ {submitError}
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6"
                  >
                    {/* Name Input */}
                    <Input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                    />

                    {/* Email Input */}
                    <EmailInput
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                    />

                    {/* Message Textarea */}
                    <TextArea
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                      rows={6}
                      required
                    />

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 sm:py-4 bg-[#09b29d] text-white rounded-full font-semibold hover:bg-[#09b29d]/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Map with Contact Card */}
      <section className="w-full relative">
        {/* Google Map iframe */}
        <div className="w-full h-[600px] md:h-[500px] lg:h-[600px] grayscale">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2365.5!2d-1.1!3d53.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879827e9abc0000%3A0x0!2s22%20Bahram%20Road%2C%20Doncaster%2C%20UK!5e0!3m2!1sen!2s!4v1234567890!5m2!1sen!2s&maptype=roadmap"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(100%)" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Contact Card Overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[450px] md:w-[500px] z-10">
          <div className="bg-white shadow-2xl rounded-lg p-8 md:p-10 hover:shadow-3xl transition-shadow duration-300">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center border-b-4 border-teal-500 pb-4">
              Contact Us
            </h2>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              {/* Address */}
              <div className="flex items-start gap-4 group">
                <div className="mt-1 p-3 bg-teal-50 rounded-full group-hover:bg-teal-100 transition-colors">
                  <MapPin className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700 mb-1">Address</h3>
                  <p className="text-gray-600 leading-relaxed">
                    22 Bahram Road
                    <br />
                    Doncaster, UK
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="mt-1 p-3 bg-teal-50 rounded-full group-hover:bg-teal-100 transition-colors">
                  <Phone className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700 mb-1">Phone</h3>
                  <a
                    href="tel:+447743055012"
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    +44 7743 055012
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="mt-1 p-3 bg-teal-50 rounded-full group-hover:bg-teal-100 transition-colors">
                  <Mail className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700 mb-1">Email</h3>
                  <a
                    href="mailto:admin@learningsouls.org"
                    className="text-gray-600 hover:text-teal-600 transition-colors break-all"
                  >
                    admin@learningsouls.org
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <div className="text-center">
              <a
                href="mailto:admin@learningsouls.org"
                className="inline-block w-full sm:w-auto px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
