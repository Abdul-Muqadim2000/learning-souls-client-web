"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TeamCarousel = ({ teamMembers = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [memberOpacity, setMemberOpacity] = useState(1);

  const defaultMembers = [
    {
      name: "Emily Kim",
      role: "Founder",
      image: "/images/dummy-person.webp",
    },
    {
      name: "Michael Steward",
      role: "Creative Director",
      image: "/images/dummy-person.webp",
    },
    {
      name: "Emma Rodriguez",
      role: "Lead Developer",
      image: "/images/dummy-person.webp",
    },
    {
      name: "Julia Gimmel",
      role: "UX Designer",
      image: "/images/dummy-person.webp",
    },
    {
      name: "Lisa Anderson",
      role: "Marketing Manager",
      image: "/images/dummy-person.webp",
    },
    {
      name: "James Wilson",
      role: "Product Manager",
      image: "/images/dummy-person.webp",
    },
  ];

  const members = teamMembers.length > 0 ? teamMembers : defaultMembers;

  const updateCarousel = (newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const normalizedIndex = (newIndex + members.length) % members.length;

    setMemberOpacity(0);

    setTimeout(() => {
      setCurrentIndex(normalizedIndex);
      setMemberOpacity(1);
    }, 300);

    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const getCardClass = (index) => {
    const offset = (index - currentIndex + members.length) % members.length;

    const baseClasses =
      "absolute w-[280px] h-[380px] bg-white rounded-[20px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] cursor-pointer";

    if (offset === 0) {
      return `${baseClasses} z-10 scale-110`;
    }
    if (offset === 1) {
      return `${baseClasses} z-[5] translate-x-[200px] scale-90 opacity-90`;
    }
    if (offset === 2) {
      return `${baseClasses} z-[1] translate-x-[400px] scale-[0.8] opacity-70`;
    }
    if (offset === members.length - 1) {
      return `${baseClasses} z-[5] -translate-x-[200px] scale-90 opacity-90`;
    }
    if (offset === members.length - 2) {
      return `${baseClasses} z-[1] -translate-x-[400px] scale-[0.8] opacity-70`;
    }
    return `${baseClasses} opacity-0 pointer-events-none`;
  };

  const getImageClass = (index) => {
    const offset = (index - currentIndex + members.length) % members.length;

    if (offset === 0) {
      return "transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]";
    }
    return "transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] grayscale";
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        updateCarousel(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        updateCarousel(currentIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const swipeThreshold = 50;

    if (Math.abs(distance) > swipeThreshold) {
      if (distance > 0) {
        updateCarousel(currentIndex + 1);
      } else {
        updateCarousel(currentIndex - 1);
      }
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] overflow-hidden py-10 px-5">
      {/* Title with gradient effect */}
      <h1
        className="text-[4.5rem] font-black uppercase tracking-[-0.02em] mb-8 pointer-events-none whitespace-nowrap"
        style={{
          background:
            "linear-gradient(to bottom, #bd2387 0%, #d946a1 50%, #bd2387 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
        }}
      >
        OUR TEAM
      </h1>

      <div
        className="w-full max-w-[1200px] h-[450px] relative mt-2    "
        style={{ perspective: "1000px" }}
      >
        <button
          className="absolute left-5 top-1/2 -translate-y-1/2 bg-[var(--color-secondary)] text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-20 transition-all duration-300 text-2xl border-none outline-none  pr-[3px]  hover:scale-110"
          onClick={() => updateCarousel(currentIndex - 1)}
          aria-label="Previous"
        >
          <ChevronLeft size={48} />
        </button>

        <div
          className="w-full h-full flex justify-center items-center relative transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          style={{ transformStyle: "preserve-3d" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {members.map((member, index) => (
            <div
              key={index}
              className={getCardClass(index)}
              onClick={() => updateCarousel(index)}
              style={{
                transform: (() => {
                  const offset =
                    (index - currentIndex + members.length) % members.length;
                  if (offset === 0) return "scale(1.1) translateZ(0)";
                  if (offset === 1)
                    return "translateX(200px) scale(0.9) translateZ(-100px)";
                  if (offset === 2)
                    return "translateX(400px) scale(0.8) translateZ(-300px)";
                  if (offset === members.length - 1)
                    return "translateX(-200px) scale(0.9) translateZ(-100px)";
                  if (offset === members.length - 2)
                    return "translateX(-400px) scale(0.8) translateZ(-300px)";
                  return "";
                })(),
              }}
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                className={getImageClass(index)}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        <button
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-[var(--color-secondary)] text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-20 transition-all duration-300 text-2xl border-none outline-none pl-[3px] hover:scale-110"
          onClick={() => updateCarousel(currentIndex + 1)}
          aria-label="Next"
        >
          <ChevronRight size={38} />
        </button>
      </div>

      <div className="text-center mt-10 transition-all duration-500">
        <h2
          className="text-[var(--color-secondary)] text-[2.5rem] font-bold mb-2.5 relative inline-block transition-opacity duration-300"
          style={{ opacity: memberOpacity }}
        >
          <span className="relative">
            {members[currentIndex].name}
            <span className="absolute top-full left-[-120px] w-[100px] h-[2px] bg-[var(--color-secondary)]"></span>
            <span className="absolute top-full right-[-120px] w-[100px] h-[2px] bg-[var(--color-secondary)]"></span>
          </span>
        </h2>
        <p
          className="text-[#848696] text-2xl font-medium opacity-80 uppercase tracking-[0.1em] py-2.5 -mt-[15px] relative transition-opacity duration-300"
          style={{ opacity: memberOpacity }}
        >
          {members[currentIndex].role}
        </p>
      </div>

      <div className="flex justify-center gap-2.5 mt-[60px]">
        {members.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex
                ? "bg-[var(--color-secondary)] scale-[1.2]"
                : "bg-[rgba(8,42,123,0.2)] hover:bg-[rgba(8,42,123,0.4)]"
            }`}
            onClick={() => updateCarousel(index)}
          />
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 4.5rem !important;
          }

          .w-\\[280px\\] {
            width: 200px !important;
          }

          .h-\\[380px\\] {
            height: 280px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TeamCarousel;
