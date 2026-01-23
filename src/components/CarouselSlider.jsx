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
}) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 275, height: 300 });
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Initialize - start from middle item
  useEffect(() => {
    if (items.length > 0) {
      setCurrIndex(Math.floor(items.length / 2));
    }
  }, [items.length]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const width = Math.max(window.innerWidth * 0.25, 275);
      const height = window.innerHeight * 0.5;
      setDimensions({ width, height });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      next();
    }, intervalTime);
  };

  const move = (index) => {
    let newIndex = index;
    if (newIndex < 0) newIndex = items.length - 1;
    if (newIndex >= items.length) newIndex = 0;
    setCurrIndex(newIndex);
  };

  const prev = () => {
    move(currIndex - 1);
  };

  const next = () => {
    move(currIndex + 1);
  };

  // Auto play timer
  useEffect(() => {
    if (autoPlay && items.length > 0) {
      startTimer();
      return () => clearInterval(intervalRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currIndex, autoPlay, items.length]);

  const getTransform = (index) => {
    if (index === currIndex) {
      return "perspective(1200px)";
    }
    const rotation = index < currIndex ? 40 : -40;
    return `perspective(1200px) rotateY(${rotation}deg)`;
  };

  const getSliderTransform = () => {
    if (!sliderRef.current) return "translate3d(0,0,0)";

    const itemWidth = dimensions.width;

    const container = sliderRef.current.parentElement;
    const containerWidth = container.offsetWidth;

    const containerCenter = containerWidth / 2;
    const currentItemCenter = currIndex * itemWidth + itemWidth / 2;

    return `translate3d(${containerCenter - currentItemCenter}px, 0, 0)`;
  };

  if (items.length === 0) return null;

  return (
    <section className="w-full py-20 overflow-hidden relative">
      {/* Title */}
      {title && <GenericHeader title={title} height={"xs"} />}

      <div className="relative max-w-7xl mx-auto">
        {/* Carousel Body */}
        <div className="py-8 overflow-hidden">
          <div
            ref={sliderRef}
            className="relative transition-transform duration-1000 ease-in-out"
            style={{
              transform: getSliderTransform(),
              width: `${dimensions.width * items.length}px`,
            }}
          >
            {items.map((item, index) => {
              const isActive = index === currIndex;
              return (
                <div
                  key={index}
                  className={`float-left ${isActive ? "carousel-item-active" : ""}`}
                  style={{
                    width: `${dimensions.width}px`,
                    height: `${dimensions.height}px`,
                    padding: "0 0",
                  }}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-1000 ease-in-out"
                    style={{
                      transform: getTransform(index),
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Shadow */}
                    <div
                      className="absolute bottom-0 w-full h-10 bg-black/20"
                      style={{
                        transform: "rotateX(90deg) translate3d(0, -20px, 0)",
                        boxShadow: "0 0 5px 5px rgba(0,0,0,0.2)",
                      }}
                    />

                    {/* Front Face */}
                    <div
                      className="absolute w-full h-full flex flex-col items-center justify-center text-center border-4 border-white bg-[var(--color-primary)] overflow-hidden"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {/* Image if provided */}
                      {item.image && (
                        <div className="relative w-full h-full">
                          <Image
                            src={item.image}
                            alt={item.heading || `Slide ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          {/* Overlay for text readability */}
                          {(item.heading || item.description) && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                          )}
                        </div>
                      )}

                      {/* Content Overlay */}
                      <div
                        className={`${item.image ? "absolute bottom-0 left-0 right-0" : ""} p-6 z-10`}
                      >
                        {item.heading && (
                          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                            {item.heading}
                          </h3>
                        )}
                        {item.description && (
                          <p
                            className={`text-sm md:text-base ${item.image ? "text-gray-200" : "text-gray-300"}`}
                          >
                            {item.description}
                          </p>
                        )}
                        {/* If no image, heading, or description - show number */}
                        {!item.image && !item.heading && !item.description && (
                          <h1 className="text-7xl md:text-9xl font-bold text-white">
                            {index + 1}
                          </h1>
                        )}
                      </div>
                    </div>

                    {/* Left Face */}
                    <div
                      className="absolute top-0 left-0 w-10 h-full border-l-4 border-white bg-[var(--color-secondary)]"
                      style={{
                        transform: "translate3d(1px, 0, -40px) rotateY(-90deg)",
                        transformOrigin: "0",
                        backfaceVisibility: "hidden",
                      }}
                    />

                    {/* Right Face */}
                    <div
                      className="absolute top-0 right-0 w-10 h-full border-r-4 border-white bg-[var(--color-secondary)]"
                      style={{
                        transform: "translate3d(-1px, 0, -40px) rotateY(90deg)",
                        transformOrigin: "100%",
                        backfaceVisibility: "hidden",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation Controls */}
        <div className="flex items-center justify-center gap-8 mt-8 cursor-pointer">
          <button
            onClick={prev}
            className="text-[var(--color-secondary)] hover:scale-110 transition-transform duration-300 cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft size={48} />
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => move(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currIndex
                    ? "w-3 h-3 bg-[var(--color-secondary)]"
                    : "w-2 h-2 bg-gray-400 hover:bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="text-[var(--color-secondary)] hover:scale-110 transition-transform duration-300 cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight size={48} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CarouselSlider;
