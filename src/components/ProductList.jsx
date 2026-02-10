"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Download, DownloadIcon, QrCode, X } from "lucide-react";
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

        <div className="flex gap-4">
          <Link
            href={primaryButtonHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-2 bg-[#bd2387] text-white rounded-full text-sm font-semibold hover:bg-[#a01d72] transition-all duration-300 flex items-center gap-2"
          >
            <DownloadIcon size={16} />
            {primaryButtonText}
          </Link>
          <button
            onClick={() => setShowQRModal(true)}
            className="px-8 py-2 bg-white border-2 border-gray-700 text-gray-700 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors"
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
    </>
  );
};

const ProductList = ({ products = [] }) => {
  const defaultProducts = [
    {
      imageUrl: "/images/product3.webp",
      imageAltText: "The Meaning of THE WISE QURAN",
      primaryButtonHref: "https://www.mustaqim.co.uk/TheWiseQuran.pdf",
    },
    {
      imageUrl: "/images/product2.webp",
      imageAltText: "MUHAMMAD - A Prophet for Our Time",
      primaryButtonHref: "https://archive.org/details/B-001-000-904",
    },
    {
      imageUrl: "/images/product1.webp",
      imageAltText: "MUHAMMAD - His Life Based on the Earliest Sources",
      primaryButtonHref: "https://archive.org/details/B-001-000-904",
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
