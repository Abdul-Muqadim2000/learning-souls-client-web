"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, BookOpen } from "lucide-react";
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
    if (!url) {
      return;
    }

    if (url.startsWith("http")) {
      // External link (Kindle, Apple, Google)
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      // Local file download
      const link = document.createElement("a");
      link.href = url;
      link.download = decodeURIComponent(url.split("/").pop());
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadButtons = [
    {
      type: "pdf",
      label: "Download PDF",
      icon: "/pdf.svg",
      iconAlt: "PDF",
      color: "bg-teal-600 hover:bg-teal-700",
      url: downloadOptions?.pdf,
    },
    {
      type: "ebook",
      label: "Download EPUB",
      icon: null,
      color: "bg-blue-500 hover:bg-blue-600",
      url: downloadOptions?.ebook,
    },
    {
      type: "kindle",
      label: "Get on Kindle",
      icon: "/kindle.svg",
      iconAlt: "Kindle",
      color: "bg-indigo-700 hover:bg-indigo-800",
      url: downloadOptions?.kindle,
    },
    {
      type: "apple",
      label: "Apple Books",
      icon: "/apple.svg",
      iconAlt: "Apple Books",
      color: "bg-purple-700 hover:bg-purple-800",
      url: downloadOptions?.apple,
    },
    {
      type: "google",
      label: "Google Play Books",
      icon: "/play-store.svg",
      iconAlt: "Google Play Books",
      color: "bg-green-600 hover:bg-green-700",
      url: downloadOptions?.google,
    },
  ];

  const footerText = downloadOptions?.pdf
    ? "Available formats open now. Coming soon options are shown in gray."
    : "Formats in gray are coming soon. Available downloads will open immediately.";

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
          {downloadButtons.map((button) => {
            const isAvailable = Boolean(button.url);
            const buttonClasses = isAvailable
              ? `${button.color} text-white hover:shadow-lg transform hover:scale-[1.02] active:scale-95`
              : "bg-gray-100 text-gray-500 border border-dashed border-gray-300 cursor-not-allowed opacity-80";

            return (
              <button
                key={button.type}
                onClick={() => isAvailable && handleDownload(button.url, button.type)}
                disabled={!isAvailable}
                className={`w-full rounded-lg px-6 py-4 font-semibold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-md ${buttonClasses}`}
              >
                <span className={`shrink-0 ${isAvailable ? "" : "opacity-60"}`}>
                  {button.icon ? (
                    <Image
                      src={button.icon}
                      alt={button.iconAlt || button.label}
                      width={24}
                      height={24}
                      className={`h-6 w-6 ${isAvailable ? "brightness-0 invert" : ""}`}
                    />
                  ) : (
                    <BookOpen size={24} className={isAvailable ? "text-white" : "text-gray-400"} />
                  )}
                </span>
                <span>{isAvailable ? button.label : `${button.label} - Coming soon`}</span>
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <p className="text-xs text-center text-gray-500 mt-6 leading-relaxed">
          {footerText}
        </p>
      </div>
    </div>,
    document.body,
  );
};

export default DownloadModal;
