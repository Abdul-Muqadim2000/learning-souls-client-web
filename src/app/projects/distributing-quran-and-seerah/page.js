"use client";
import GenericHeader from "@/components/GenericHeader";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

// Metadata for SEO
import dynamic from "next/dynamic";

// Dynamically import the donation page to reuse its form
const DonatePage = dynamic(() => import("@/app/donate/page"), { ssr: false });

// QR Modal Component
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
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
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

// Project Data
const projectData = {
  hero: {
    title: "Distributing Quran And Seerah",
    subtitle: "At NHS Hospitals and HM prisons",
    image: "/images/project1.webp",
  },
  content: {
    title:
      "This project was rolled out in 2023 from one NHS hospital. A colourful book shelf was placed in the common area of the Faith centre to distribute Quraan & Seerah Books as free gift for visitors of every faith.",
    paragraphs: [
      "Alhamdulillah, we have now extended our project to 8 more hospitals and two of HM prisons. Average 30 copies of the Quran translation are taken away by people of all ages and faiths. Seerah books are taken away within a day.",
      "As the word is going out more and more chaplaincies are joining in. The hospitals where Muslim chaplains are appointed, they will then engage the Muslim worshippers to buy the Quran translations and Seerah books at discounted rates from our website and be delivered into their hospital. This process is already working successfully in the hospitals where we are working at the moment. By engaging local Muslim worshippers, we can make this process long term and sustainable.",
    ],
  },
  books: [
    {
      imageUrl: "/images/product1.webp",
      imageAltText: "MUHAMMAD - His Life Based on the Earliest Sources",
      title: "MUHAMMAD - His Life Based on the Earliest Sources",
      description:
        "A detailed account of the Prophet's life based on authentic historical sources.",
      primaryButtonText: "Download",
      primaryButtonHref: "https://archive.org/details/B-001-000-904",
      secondaryButtonText: "QR Code",
      qrCodeImage: "/images/wise-quran-qr.jpg",
    },
    {
      imageUrl: "/images/product2.webp",
      imageAltText: "MUHAMMAD - A Prophet for Our Time",
      title: "MUHAMMAD - A Prophet for Our Time",
      description:
        "An insightful biography exploring the life and teachings of Prophet Muhammad ﷺ.",
      primaryButtonText: "Download",
      primaryButtonHref: "https://archive.org/details/B-001-000-904",
      secondaryButtonText: "QR Code",
      qrCodeImage: "/images/wise-quran-qr.jpg",
    },
    {
      imageUrl: "/images/product3.webp",
      imageAltText: "The Meaning of THE WISE QURAN",
      title: "The Meaning of THE WISE QURAN",
      description:
        "A comprehensive translation of the Holy Quran with easy-to-understand language for all readers.",
      primaryButtonText: "Download",
      primaryButtonHref: "https://www.mustaqim.co.uk/TheWiseQuran.pdf",
      secondaryButtonText: "QR Code",
      qrCodeImage: "/images/wise-quran-qr.jpg",
    },
  ],
};

export default function DistributingQuranSeerahPage() {
  const [activeQRModal, setActiveQRModal] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <GenericHeader
        title={projectData.hero.title}
        subtitle={projectData.hero.subtitle}
        image={projectData.hero.image}
        textColor="white"
        height="xxl"
        overlay={true}
      />

      {/* Content Section */}
      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Horizontal Rule in Tertiary Color */}
          <div
            className="h-1 w-24 sm:w-32 mx-auto mb-6 sm:mb-7 md:mb-8 rounded-full"
            style={{ backgroundColor: "var(--color-tertiary)" }}
          ></div>

          {/* Title */}
          <h2
            className="font-bold mb-6 sm:mb-7 md:mb-8 text-center leading-relaxed px-2"
            style={{
              color: "var(--color-tertiary)",
              fontSize: "clamp(1.5rem, 2.5vw + 0.5rem, 2rem)",
              lineHeight: "1.4",
            }}
          >
            {projectData.content.title}
          </h2>

          {/* Description Paragraphs */}
          <div className="space-y-5 sm:space-y-6">
            {projectData.content.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-700 leading-relaxed text-justify"
                style={{
                  fontSize: "clamp(0.9rem, 1.5vw + 0.25rem, 1.125rem)",
                  lineHeight: "1.7",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Books Section - Modified ProductList */}
      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Custom Title for this page */}
          <GenericHeader title="Books we use" />
          <p
            className="text-gray-600 text-center mb-10 sm:mb-12 max-w-3xl mx-auto px-4"
            style={{
              fontSize: "clamp(0.9rem, 1.2vw + 0.2rem, 1rem)",
            }}
          >
            These carefully selected books are distributed free of charge at NHS
            hospitals and HM prisons to spread knowledge and understanding.
          </p>

          {/* Books Grid with Titles and Descriptions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 justify-items-center">
            {projectData.books.map((book, index) => (
              <div
                key={index}
                className="flex flex-col w-full max-w-sm hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Book Image */}
                <div className="relative w-full aspect-[3/4] rounded-xl shadow-2xl overflow-hidden mb-5 sm:mb-6">
                  <Image
                    src={book.imageUrl}
                    alt={book.imageAltText}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Book Title */}
                <h3
                  className="font-bold text-gray-800 mb-2 sm:mb-3 text-center min-h-[3rem] sm:min-h-[3.5rem] flex items-center justify-center px-2"
                  style={{
                    fontSize: "clamp(1.1rem, 2vw + 0.2rem, 1.35rem)",
                    lineHeight: "1.3",
                  }}
                >
                  {book.title}
                </h3>

                {/* Book Description */}
                <p
                  className="text-gray-600 leading-relaxed text-center mb-5 sm:mb-6 px-3 sm:px-4 flex-grow"
                  style={{
                    fontSize: "clamp(0.85rem, 1.2vw + 0.1rem, 0.95rem)",
                  }}
                >
                  {book.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                  <a
                    href={book.primaryButtonHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 sm:px-8 py-2.5 sm:py-2 bg-[#bd2387] text-white rounded-full text-sm font-semibold hover:bg-[#a01d72] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {book.primaryButtonText}
                  </a>
                  <button
                    onClick={() => setActiveQRModal(book.qrCodeImage)}
                    className="px-6 sm:px-8 py-2.5 sm:py-2 bg-white border-2 border-[#09b29d] text-[#09b29d] rounded-full text-sm font-semibold hover:bg-[#09b29d] hover:text-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z"
                        clipRule="evenodd"
                      />
                      <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H8a1 1 0 110-2h1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v1a1 1 0 11-2 0v-1a1 1 0 01-1-1zM7 16a1 1 0 100-2 1 1 0 000 2zM17 11a1 1 0 10-2 0v1a1 1 0 002 0v-1zM16 17a1 1 0 100-2 1 1 0 000 2zM13 15a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" />
                    </svg>
                    {book.secondaryButtonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QR Code Modal */}
      <QRModal
        isOpen={activeQRModal !== null}
        onClose={() => setActiveQRModal(null)}
        qrCodeImage={activeQRModal || ""}
      />

      {/* Support Section - Donation Form */}
      <section className="w-full py-10 sm:py-12 md:py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-7 md:mb-8 text-center">
            <h2
              className="font-bold text-(--color-secondary) mb-3 sm:mb-4"
              style={{
                fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.5rem)",
              }}
            >
              Support This Project
            </h2>
            <p
              className="text-(--color-secondary) max-w-2xl mx-auto px-4"
              style={{
                fontSize: "clamp(0.9rem, 1.5vw + 0.25rem, 1.125rem)",
              }}
            >
              Your generous donation helps us make the Quran accessible to
              everyone.
            </p>
          </div>

          <DonatePage />
        </div>
      </section>
    </div>
  );
}
