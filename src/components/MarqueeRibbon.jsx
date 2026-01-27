"use client";

import React, { useState, useEffect } from "react";

const MarqueeRibbon = ({
  text = "Your text here",
  speed = 50, // Speed in seconds for one complete scroll
  bgColor = "var(--color-primary)",
  textColor = "var(--color-tertiary)",
  fontSize = "1.5rem",
  fontWeight = "bold",
  padding = "1rem 0",
  gap = "4rem", // Gap between repeated text
  separator = "•", // Separator between text items
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        backgroundColor: bgColor,
        padding: padding,
        opacity: isMounted ? 1 : 0,
        transition: "opacity 0.3s ease-in",
      }}
    >
      <div className="marquee-container">
        <div
          className="marquee-content"
          style={{
            animation: `marquee ${speed}s linear infinite`,
            animationPlayState: isMounted ? "running" : "paused",
          }}
        >
          {/* Repeat the content multiple times for seamless loop */}
          {[...Array(3)].map((_, index) => (
            <span
              key={index}
              style={{
                color: textColor,
                fontSize: fontSize,
                fontWeight: fontWeight,
                whiteSpace: "nowrap",
                marginRight: gap,
                display: "inline-flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {/* Al-Quran Badge */}
              <span className="bg-white px-4 py-1 rounded shadow-sm inline-block">
                <span className="text-[#09b29d] font-semibold text-sm">
                  Al-Quran
                </span>
              </span>
              
              {text}
              {separator && (
                <span style={{ marginLeft: gap }}>{separator}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          display: flex;
          width: 100%;
          overflow: hidden;
        }

        .marquee-content {
          display: flex;
          align-items: center;
          animation: marquee ${speed}s linear infinite;
          will-change: transform;
          flex-shrink: 0;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default MarqueeRibbon;
