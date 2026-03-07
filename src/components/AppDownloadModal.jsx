"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Smartphone } from "lucide-react";
import Image from "next/image";

const AppDownloadModal = ({ isOpen, onClose, appName }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Using timeout to avoid cascading renders
    const timer = setTimeout(() => setMounted(true), 0);
    return () => {
      clearTimeout(timer);
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const handleDownload = (platform) => {
    const links = {
      apple: "https://apps.apple.com/us/app/khushii-dua/id6499438620",
      google:
        "https://play.google.com/store/apps/details?id=com.khushiidua.app&pcampaignid=web_share",
    };
    window.open(links[platform], "_blank", "noopener,noreferrer");
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/70 z-9999 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X size={24} className="text-gray-700" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-linear-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Smartphone size={32} className="text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Download App
          </h2>
          {appName && <p className="text-sm text-gray-600 px-4">{appName}</p>}
        </div>

        {/* Download Options */}
        <div className="space-y-4">
          {/* Apple Store Button */}
          <button
            onClick={() => handleDownload("apple")}
            className="w-full bg-black text-white rounded-lg px-6 py-4 font-semibold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-95 hover:bg-gray-900"
          >
            <Image
              src="/images/app-store.webp"
              alt="Download on the App Store"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
          </button>

          {/* Google Play Button */}
          <button
            onClick={() => handleDownload("google")}
            className="w-full bg-black text-white rounded-lg px-6 py-4 font-semibold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-95 hover:bg-gray-900"
          >
            <Image
              src="/images/google-play.webp"
              alt="Get it on Google Play"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-center text-gray-500 mt-6 leading-relaxed">
          Choose your platform to download the app
        </p>
      </div>
    </div>,
    document.body,
  );
};

export default AppDownloadModal;
