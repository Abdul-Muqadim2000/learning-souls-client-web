"use client";

import React from "react";

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
  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        backgroundColor: bgColor,
        padding: padding,
      }}
    >
      <div className="marquee-container">
        <div
          className="marquee-content"
          style={{
            animation: `marquee ${speed}s linear infinite`,
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
                gap: gap,
              }}
            >
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
        }

        .marquee-content {
          display: flex;
          align-items: center;
          animation: marquee ${speed}s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
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
