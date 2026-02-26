"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GenericHeader from "./GenericHeader";

const CarouselSlider = ({
  items = [],
  intervalTime = 4000,
  autoPlay = true,
  title,
  bgColor,
  bgImage,
  textColor,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const [itemsPerView, setItemsPerView] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, items.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swiped left
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      // Swiped right
      handlePrev();
    }
  };

  useEffect(() => {
    if (autoPlay && items.length > itemsPerView) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= maxIndex) return 0;
          return prev + 1;
        });
      }, intervalTime);
      return () => clearInterval(intervalRef.current);
    }
  }, [
    currentIndex,
    autoPlay,
    items.length,
    itemsPerView,
    maxIndex,
    intervalTime,
  ]);

  if (items.length === 0) return null;

  const slideWidth = 100 / itemsPerView;

  return (
    <section
      className="w-full py-12 sm:py-16 lg:py-20 relative"
      style={{
        backgroundColor: bgColor || "transparent",
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {title && (
        <GenericHeader title={title} height={"lg"} textColor={textColor} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="hidden xl:flex absolute -left-6 sm:-left-10 md:-left-14 lg:-left-16 xl:-left-20 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 items-center justify-center"
              aria-label="Previous"
            >
              <ChevronLeft
                className="w-6 h-6 sm:w-8 sm:h-8"
                style={{ color: "var(--color-tertiary)" }}
              />
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={handleNext}
              className="hidden xl:flex absolute -right-6 sm:-right-10 md:-right-14 lg:-right-16 xl:-right-20 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 items-center justify-center"
              aria-label="Next"
            >
              <ChevronRight
                className="w-6 h-6 sm:w-8 sm:h-8"
                style={{ color: "var(--color-tertiary)" }}
              />
            </button>
          )}

          {/* Carousel Wrapper */}
          <div 
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * slideWidth}%)`,
              }}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2 sm:px-3 flex justify-center"
                  style={{ width: `${slideWidth}%` }}
                >
                  <div className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full w-full max-w-[280px] sm:max-w-none">
                    {/* Image Only */}
                    {item.image && !item.heading && !item.description && (
                      <div className="relative w-full aspect-[2/3] sm:aspect-[3/4]">
                        <Image
                          src={item.image}
                          alt={`Slide ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes={`(max-width: 640px) 280px, (max-width: 1024px) 50vw, 33vw`}
                        />
                      </div>
                    )}

                    {/* Image with Content */}
                    {item.image && (item.heading || item.description) && (
                      <>
                        <div className="relative w-full aspect-[2/3] sm:aspect-[3/4]">
                          <Image
                            src={item.image}
                            alt={item.heading || `Slide ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes={`(max-width: 640px) 280px, (max-width: 1024px) 50vw, 33vw`}
                          />
                        </div>
                        <div className="p-3 sm:p-4 md:p-5 text-center">
                          {item.heading && (
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
                              {item.heading}
                            </h3>
                          )}
                          {item.description && (
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </>
                    )}

                    {/* Fallback */}
                    {!item.image && (
                      <div className="w-full aspect-[2/3] sm:aspect-[3/4] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <span className="text-3xl sm:text-4xl font-bold text-gray-400">
                          {index + 1}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {items.length > itemsPerView && (
            <div className="flex items-center justify-center gap-2 mt-10 sm:mt-12">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="transition-all duration-300"
                  style={{
                    width: currentIndex === index ? "2rem" : "0.5rem",
                    height: "0.5rem",
                    borderRadius: "0.25rem",
                    backgroundColor:
                      currentIndex === index
                        ? textColor || "var(--color-secondary)"
                        : textColor
                          ? `${textColor}40`
                          : "rgba(156, 163, 175, 0.5)",
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CarouselSlider;
