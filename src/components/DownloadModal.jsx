"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, FileText, BookOpen, ShoppingBag, Apple } from "lucide-react";
import Image from "next/image";

const DownloadModal = ({ isOpen, onClose, downloadOptions, bookTitle }) => {
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

  const handleDownload = (url, type) => {
    if (url.startsWith("http")) {
      // External link (Kindle, Apple, Google)
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      // Local file download
      const link = document.createElement("a");
      link.href = url;
      link.download = url.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadButtons = [
    {
      type: "pdf",
      label: "Download PDF",
      icon: <FileText size={24} />,
      color: "bg-red-500 hover:bg-red-600",
      url: downloadOptions?.pdf,
    },
    {
      type: "ebook",
      label: "Download EPUB",
      icon: <BookOpen size={24} />,
      color: "bg-blue-500 hover:bg-blue-600",
      url: downloadOptions?.ebook,
    },
    {
      type: "kindle",
      label: "Get on Kindle",
      icon: <ShoppingBag size={24} />,
      color: "bg-orange-500 hover:bg-orange-600",
      url: downloadOptions?.kindle,
    },
    {
      type: "apple",
      label: "Apple Books",
      icon: <Apple size={24} />,
      color: "bg-gray-800 hover:bg-gray-900",
      url: downloadOptions?.apple,
    },
    {
      type: "google",
      label: "Google Play Books",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 6v12l8 4.5 8-4.5V6L12 1.5 4 6zm8 13.5l-6-3.375V7.875L12 11.25v8.25zm6-3.375l-6 3.375V11.25l6-3.375v8.25z" />
        </svg>
      ),
      color: "bg-green-600 hover:bg-green-700",
      url: downloadOptions?.google,
    },
  ];

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
            <BookOpen size={32} className="text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Download Book
          </h2>
          {bookTitle && (
            <p className="text-sm text-gray-600 px-4">{bookTitle}</p>
          )}
        </div>

        {/* Download Options */}
        <div className="space-y-3">
          {downloadButtons.map((button) => (
            <button
              key={button.type}
              onClick={() => handleDownload(button.url, button.type)}
              className={`w-full ${button.color} text-white rounded-lg px-6 py-4 font-semibold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-95`}
            >
              <span className="shrink-0">{button.icon}</span>
              <span>{button.label}</span>
            </button>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-xs text-center text-gray-500 mt-6 leading-relaxed">
          Choose your preferred format to download and read offline
        </p>
      </div>
    </div>,
    document.body,
  );
};

export default DownloadModal;
