"use client";

import { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import DownloadModal from "@/components/DownloadModal";

export default function EditionsShowcase({ title, description, editions }) {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState(null);

  const handleOpenDownloadModal = (edition) => {
    setSelectedEdition(edition);
    setShowDownloadModal(true);
  };

  const handleCloseDownloadModal = () => {
    setShowDownloadModal(false);
    setSelectedEdition(null);
  };

  return (
    <>
      <section className="py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h2
            className="font-bold mb-4 sm:mb-5 md:mb-6 text-center leading-tight"
            style={{
              color: "var(--color-secondary)",
              fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.5rem)",
            }}
          >
            {title}
          </h2>

          {/* Description */}
          <p
            className="text-gray-700 leading-relaxed mb-10 sm:mb-12 text-justify max-w-5xl mx-auto"
            style={{
              fontSize: "clamp(0.9rem, 1.5vw + 0.25rem, 1.125rem)",
              lineHeight: "1.7",
            }}
          >
            {description}
          </p>

          {/* Editions Grid - 2 columns, dynamic rows */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
            {editions.map((edition, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleOpenDownloadModal(edition)}
                className="flex flex-col sm:flex-row overflow-hidden bg-white sm:bg-gray-100 rounded-xl transition-all duration-300 min-h-[280px] text-left hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-full sm:w-2/5 shrink-0 min-h-[320px] sm:min-h-full bg-white flex items-center justify-center p-4 sm:p-0">
                  <Image
                    src={edition.image}
                    alt={edition.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 40vw, 300px"
                    style={{ objectFit: "contain" }}
                  />
                </div>

                {/* Content */}
                <div className="w-full sm:w-3/5 p-5 sm:p-6 md:p-7 flex flex-col justify-center bg-gray-100">
                  <div className="mb-3 flex items-center gap-2">
                    {edition.downloadOptions ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#bd2387]/10 px-3 py-1 text-xs font-semibold text-[#bd2387]">
                        <Download className="h-3.5 w-3.5" />
                        Formats available
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-600">
                        More formats coming soon
                      </span>
                    )}
                  </div>
                  <h3
                    className="font-bold text-gray-800 mb-2 sm:mb-3"
                    style={{
                      fontSize: "clamp(1.1rem, 2vw + 0.25rem, 1.5rem)",
                    }}
                  >
                    {edition.title}
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed"
                    style={{
                      fontSize: "clamp(0.85rem, 1.2vw + 0.15rem, 1rem)",
                    }}
                  >
                    {edition.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-[#bd2387]">
                    {edition.downloadOptions
                      ? "Click this card to explore available download formats."
                      : "This edition will add more ebook and store options soon."}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <DownloadModal
        isOpen={showDownloadModal}
        onClose={handleCloseDownloadModal}
        downloadOptions={selectedEdition?.downloadOptions}
        bookTitle={selectedEdition?.title}
      />
    </>
  );
}
