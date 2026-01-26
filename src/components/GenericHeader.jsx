import React from "react";
import { PrimaryButton } from "./ui/Button";
import { HandCoins } from "lucide-react";

const heightClasses = {
  xs: "h-[40px] sm:h-[60px] lg:h-[80px]",
  sm: "h-[80px] sm:h-[100px] lg:h-[120px]",
  md: "h-[100px] sm:h-[120px] lg:h-[150px]",
  lg: "h-[140px] sm:h-[160px] lg:h-[200px]",
  xl: "h-[180px] sm:h-[220px] lg:h-[260px]",
  xxl: "h-[260px] sm:h-[300px] lg:h-[340px]",
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
}) => {
  return (
    <section
      className={`w-full flex items-center justify-center ${
        heightClasses[height]
      }`}
      style={{
        backgroundImage: image ? `url(${image})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: image ? "transparent" : bgColor || "",
      }}
    >
      <div className="flex flex-col items-center justify-center max-w-6xl mt-4 mb-8">
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
            className="mt-4 text-center px-4 text-sm sm:text-base lg:text-lg"
            style={{ color: textColor || "var(--color-secondary)" }}
          >
            {subtitle}
          </p>
        )}
        {buttonText && buttonLink && (
          <PrimaryButton
            as="a"
            href={buttonLink}
            className="mt-4 px-6 xl:px-8"
            text={buttonText}
            icon={HandCoins}
          />
        )}
      </div>
    </section>
  );
};

export default GenericHeader;
