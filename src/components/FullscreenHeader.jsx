import React from "react";
import Image from "next/image";
import { PrimaryButton, SecondaryButton } from "./ui/Button";

const FullscreenHeader = ({
  headerText,
  headerTextSize,
  headerTextColor,
  subheaderText,
  helperText,
  listItems,
  listItemsColor,
  listItemsFontSize,
  listItemsBold = false,
  primaryButtonText,
  primaryButtonLink,
  primaryButtonIcon,
  secondaryButtonText,
  secondaryButtonLink,
  secondaryButtonIcon,
  backgroundImage,
  helperImage,
  bgColor = "var(--color-tertiary)",
  textColor = "var(--color-primary)",
}) => {
  return (
    <section
      className="w-full min-h-screen flex items-center justify-center py-16 lg:px-24"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: bgColor,
      }}
    >
      <div className="max-w-8xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Column - Content */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Header Text */}
          {headerText && (
            <h1
              className="uppercase tracking-[-0.02em] font-black leading-[1.1]"
              style={{
                fontSize: headerTextSize || "clamp(2.5rem, 5vw, 4.5rem)",
                background:
                  "linear-gradient(to bottom, #bd2387 0%, #d946a1 50%, #bd2387 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                color: headerTextColor || textColor,
              }}
            >
              {headerText}
            </h1>
          )}

          {/* Subheader Text */}
          {subheaderText && (
            <p
              className="text-lg sm:text-xl lg:text-4xl font-bold"
              style={{ color: textColor }}
            >
              {subheaderText}
            </p>
          )}

          {/* Helper Text */}
          {helperText && (
            <p
              className="text-sm sm:text-base lg:text-lg"
              style={{ color: textColor }}
            >
              {helperText}
            </p>
          )}

          {/* List Items */}
          {listItems && listItems.length > 0 && (
            <ul
              className={`space-y-2 text-sm sm:text-base lg:text-lg ${listItemsBold ? "font-bold" : ""}`}
              style={{
                color: listItemsColor || textColor,
                fontSize: listItemsFontSize || undefined,
              }}
            >
              {listItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Buttons - Inline */}
          {(primaryButtonText || secondaryButtonText) && (
            <div className="flex flex-wrap gap-4 items-center">
              {primaryButtonText && primaryButtonLink && (
                <PrimaryButton
                  as="a"
                  href={primaryButtonLink}
                  className="px-6 xl:px-8"
                  text={primaryButtonText}
                  icon={primaryButtonIcon}
                />
              )}
              {secondaryButtonText && secondaryButtonLink && (
                <SecondaryButton
                  as="a"
                  href={secondaryButtonLink}
                  className="px-6 xl:px-8 bg-(--color-tertiary) text-(--color-primary) hover:bg-(--color-tertiary)-700 border-0"
                  text={secondaryButtonText}
                  icon={secondaryButtonIcon}
                />
              )}
            </div>
          )}
        </div>

        {/* Right Column - Helper Image */}
        {helperImage && (
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl aspect-square">
              <Image
                src={helperImage}
                alt="Helper illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FullscreenHeader;
