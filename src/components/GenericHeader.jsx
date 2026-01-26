import React from "react";
import { PrimaryButton } from "./ui/Button";
import { HandCoins } from "lucide-react";
import Link from "next/link";

const heightClasses = {
  xs: "h-[40px] sm:h-[60px] lg:h-[80px]",
  sm: "h-[80px] sm:h-[100px] lg:h-[120px]",
  md: "h-[100px] sm:h-[120px] lg:h-[150px]",
  lg: "h-[140px] sm:h-[160px] lg:h-[200px]",
  xl: "h-[180px] sm:h-[220px] lg:h-[260px]",
  xxl: "h-[260px] sm:h-[300px] lg:h-[340px]",
  huge: "h-[340px] sm:h-[380px] lg:h-[420px]",
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
}) => {
  return (
    <section
      className={`w-full flex items-center justify-center relative ${
        heightClasses[height]
      }`}
      style={{
        backgroundImage: image ? `url(${image})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: image ? "transparent" : bgColor || "",
      }}
    >
      {/* Black overlay for images */}
      {image && overlay && (
        <div className="absolute inset-0 bg-black opacity-50"></div>
      )}

      <div className="flex flex-col items-center justify-center relative z-10 max-w-6xl mt-4 mb-8">
        <h1
          className="uppercase tracking-[-0.02em] pointer-events-none text-center leading-[1] font-black"
          style={{
            fontSize: textSize ?? "clamp(2.5rem, 5vw, 4.5rem)",
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
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-4 text-center max-w-4xl px-4 text-sm sm:text-base lg:text-lg"
            style={{ color: textColor || "var(--color-secondary)" }}
          >
            {subtitle}
          </p>
        )}
        {buttonText && buttonLink && (
          <Link href={buttonLink}>
            <PrimaryButton
              as="a"
              className="mt-4 px-6 xl:px-8"
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
