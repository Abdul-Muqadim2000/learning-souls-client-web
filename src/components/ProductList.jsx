"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Download, DownloadIcon, QrCode, X, ExternalLink } from "lucide-react";
import GenericHeader from "./GenericHeader";
import Link from "next/link";

const QRModal = ({ isOpen, onClose, qrCodeImage }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
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

  return createPortal(
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
      style={{ position: "fixed", inset: 0 }}
    >
      <div
        className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X size={24} className="text-gray-700" />
        </button>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Scan QR Code
        </h3>

        <div className="relative w-full aspect-square mb-4">
          <Image
            src={qrCodeImage}
            alt="QR Code"
            fill
            className="object-contain"
          />
        </div>

        <p className="text-gray-600 text-center text-sm">
          Scan this code with your mobile device to access the content
        </p>
      </div>
    </div>,
    document.body,
  );
};

const ExternalRedirectModal = ({ isOpen, onClose, onConfirm, url }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
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

  return createPortal(
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
      style={{ position: "fixed", inset: 0 }}
    >
      <div
        className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X size={24} className="text-gray-700" />
        </button>

        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <ExternalLink size={32} className="text-blue-600" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
          External Content Notice
        </h3>

        <p className="text-gray-600 text-center mb-4 leading-relaxed">
          You are being redirected to an external source. Please note that this
          content is not owned by us and is provided by a third party for
          educational purposes.
        </p>

        <div className="bg-gray-50 rounded-lg p-3 mb-5">
          <p className="text-xs text-gray-500 text-center break-all">{url}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-[#bd2387] text-white rounded-lg text-sm font-semibold hover:bg-[#a01d72] transition-colors flex items-center justify-center gap-2"
          >
            Continue
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

const ProductListItem = ({
  imageUrl,
  imageAltText = "Product Image",
  primaryButtonText = "Download",
  primaryButtonHref = "#",
  secondaryButtonText = "QR Code",
  secondaryButtonHref = "#",
  qrCodeImage = "/images/wise-quran-qr.jpg",
}) => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [showExternalRedirectModal, setShowExternalRedirectModal] =
    useState(false);

  const handleDownloadClick = (e) => {
    e.preventDefault();
    setShowExternalRedirectModal(true);
  };

  const handleConfirmRedirect = () => {
    setShowExternalRedirectModal(false);
    window.open(primaryButtonHref, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <div className="w-[290px] h-[400px] rounded-lg shadow-2xl overflow-hidden mb-6">
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={imageAltText}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex gap-2 md:gap-3 xl:gap-4">
          <button
            onClick={handleDownloadClick}
            className="px-4 md:px-5 lg:px-6 xl:px-8 py-2 bg-[#bd2387] text-white rounded-full text-sm font-semibold hover:bg-[#a01d72] transition-all duration-300 flex items-center gap-2"
          >
            <DownloadIcon size={16} />
            {primaryButtonText}
          </button>
          <button
            onClick={() => setShowQRModal(true)}
            className="px-4 md:px-5 lg:px-6 xl:px-8 py-2 bg-white border-2 border-gray-700 text-gray-700 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <QrCode size={16} />
            {secondaryButtonText}
          </button>
        </div>
      </div>

      <QRModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        qrCodeImage={qrCodeImage}
      />

      <ExternalRedirectModal
        isOpen={showExternalRedirectModal}
        onClose={() => setShowExternalRedirectModal(false)}
        onConfirm={handleConfirmRedirect}
        url={primaryButtonHref}
      />
    </>
  );
};

const ProductList = ({ products = [] }) => {
  const defaultProducts = [
    {
      imageUrl: "/images/product3.webp",
      imageAltText: "The Meaning of THE WISE QURAN",
      primaryButtonHref: "https://www.mustaqim.co.uk/TheWiseQuran.pdf",
      qrCodeImage: "/images/wise-quran-qr.png",
    },
    {
      imageUrl: "/images/product2.webp",
      imageAltText: "MUHAMMAD - A Prophet for Our Time",
      primaryButtonHref: "https://archive.org/details/muhammad_1997/mode/2up",
      qrCodeImage: "/images/muhammad-prophet-for-our-time-qr.png",
    },
    {
      imageUrl: "/images/product1.webp",
      imageAltText: "MUHAMMAD - His Life Based on the Earliest Sources",
      primaryButtonHref: "https://archive.org/details/B-001-000-904",
      qrCodeImage: "/images/muhammad-earliest-sources-qr.png",
    },
  ];

  const displayProducts = products.length > 0 ? products : defaultProducts;

  return (
    <div className="w-full bg-(--color-secondary) py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <GenericHeader
          title={"FREE BOOK DOWNLOADS"}
          subtitle={
            "Scan the QR codes below to access and download our collection of free educational and religious books. Enhance your knowledge and understanding with just a click."
          }
          textColor={"white"}
          height="md"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 justify-items-center">
          {displayProducts.map((product, index) => (
            <ProductListItem key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
