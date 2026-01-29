"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmailInput } from "@/components/ui/Input";
import { requestPasswordSetup } from "@/lib/api";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function RequestPasswordSetupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await requestPasswordSetup(email);
      setSuccess(true);
    } catch (err) {
      // Check if user already has a password
      if (err.message.includes("already has a password")) {
        setError(
          "This account already has a password. Use 'Forgot Password' to reset it.",
        );
        setTimeout(() => {
          router.push("/login/reset-password");
        }, 3000);
      } else {
        setError(
          err.message || "Failed to send setup email. Please try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center bg-gray-100 py-22 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Check Your Email
            </h1>
            <p className="text-gray-600 mb-6">
              We've sent password setup instructions to <strong>{email}</strong>
              . Please check your inbox and follow the link to set up your
              password.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> The link will expire in 1 hour for
                security reasons.
              </p>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[#09b29d] hover:text-[#09b29d]/80 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 py-22 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#09b29d] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Set Up Your Password
          </h1>
          <p className="text-gray-600">
            Enter your email address to receive instructions for setting up your
            password. This is for newly registered users.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <EmailInput
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#09b29d] text-white rounded-full font-semibold hover:bg-[#09b29d]/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "SENDING..." : "SEND SETUP INSTRUCTIONS"}
          </button>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>New to Learning Souls?</strong> If you haven't donated
              yet, you can{" "}
              <Link
                href="/donate"
                className="font-semibold underline hover:text-blue-900"
              >
                make a donation
              </Link>{" "}
              to create an account.
            </p>
          </div>

          <p className="text-center text-gray-600 text-sm">
            Already have a password?{" "}
            <Link
              href="/login"
              className="text-[#09b29d] font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
