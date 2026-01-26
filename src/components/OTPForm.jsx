"use client";

import { useState } from "react";
import Input from "./ui/Input";
import { PrimaryButton } from "./ui/Button";

const OTPForm = ({ challengeId, onSubmit = () => {}, onResend = null }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    // Only allow digits and limit to 6 characters
    if (/^\d{0,6}$/.test(value)) {
      setCode(value);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code) {
      setError("Please enter the verification code");
      return;
    }

    if (code.length < 6) {
      setError("Code must be 6 digits");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ challengeId, code });
    } catch (error) {
      console.error("OTP verification error:", error);
      setError(error.message || "Verification failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Verify Your Identity
        </h2>
        <p className="text-gray-600">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <div className="bg-[var(--color-primary)] rounded-2xl shadow-md p-8 border-2 border-gray-100">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input */}
          <Input
            label="Verification Code"
            name="code"
            placeholder="000000"
            value={code}
            onChange={handleChange}
            error={error}
            required
            maxLength={6}
            className="text-center text-2xl tracking-widest font-mono"
            autoComplete="one-time-code"
            inputMode="numeric"
          />

          {/* Submit Button */}
          <PrimaryButton
            type="submit"
            text={isSubmitting ? "Verifying..." : "Verify Code"}
            className="w-full"
            disabled={isSubmitting}
          />

          {/* Resend Code Link */}
          {onResend && (
            <div className="text-center">
              <button
                type="button"
                onClick={onResend}
                className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-tertiary)] transition-colors"
              >
                Didn&apos;t receive the code? Resend
              </button>
            </div>
          )}
        </form>

        {/* Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            For your security, this code will expire in 10 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPForm;
