import React from "react";
import { PrimaryButton } from "./ui/Button";
import { HandCoins } from "lucide-react";
import Link from "next/link";

const heightClasses = {
  xs: "min-h-[60px] h-[60px] sm:h-[80px] md:h-[90px] lg:h-[100px]",
  sm: "min-h-[100px] h-[100px] sm:h-[120px] md:h-[140px] lg:h-[160px]",
  md: "min-h-[120px] h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px]",
  lg: "min-h-[160px] h-[160px] sm:h-[200px] md:h-[240px] lg:h-[280px]",
  xl: "min-h-[220px] h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px]",
  xxl: "min-h-[280px] h-[280px] sm:h-[340px] md:h-[400px] lg:h-[460px]",
  huge: "min-h-[360px] h-[360px] sm:h-[420px] md:h-[480px] lg:h-[540px]",
};

const GenericHeader = ({
  title,
  subtitle,
  textSize,
  image,
  bgColor,
  textColor,
  height = "md",
  buttonText,
  buttonLink,
  overlay = false,
  backgroundSize = "cover", // New prop: 'cover' or 'contain'
}) => {
  return (
    <section
      className={`w-full flex items-center justify-center relative ${
        heightClasses[height]
      } ${backgroundSize === "contain" ? "generic-header-bg" : ""}`}
      style={{
        backgroundImage: image ? `url(${image})` : "none",
        backgroundSize:
          backgroundSize === "contain" ? "contain" : backgroundSize,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: bgColor || (image ? "transparent" : ""),
      }}
    >
      {/* Enhanced overlay for better text visibility */}
      {image && overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
      )}

      <div className="flex flex-col items-center justify-center relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1
          className="uppercase tracking-[-0.02em] pointer-events-none text-center font-black px-2 drop-shadow-2xl"
          style={{
            fontSize: textSize ?? "clamp(2rem, 4vw + 0.5rem, 4rem)",
            lineHeight: "1.1",
            background:
              "linear-gradient(to bottom, #bd2387 0%, #d946a1 50%, #bd2387 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
            color: textColor || "var(--color-secondary)",
            textShadow:
              image && overlay ? "0 4px 12px rgba(0,0,0,0.4)" : "none",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-3 sm:mt-4 md:mt-5 text-center max-w-4xl px-4 leading-relaxed"
            style={{
              color: textColor || "var(--color-secondary)",
              fontSize: "clamp(0.875rem, 1.5vw + 0.25rem, 1.125rem)",
              textShadow:
                image && overlay ? "0 2px 8px rgba(0,0,0,0.3)" : "none",
            }}
          >
            {subtitle}
          </p>
        )}
        {buttonText && buttonLink && (
          <Link href={buttonLink}>
            <PrimaryButton
              as="a"
              className="mt-4 sm:mt-5 md:mt-6 px-6 sm:px-7 md:px-8 text-sm sm:text-base"
              text={buttonText}
              icon={HandCoins}
            />
          </Link>
        )}
      </div>
    </section>
  );
};

export default GenericHeader;
