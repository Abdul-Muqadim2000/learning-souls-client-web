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
  helperImage1,
  helperImage2,
  imageSize = "scale-90 lg:scale-100",
  showShapes = false,
  bgColor = "var(--color-tertiary)",
  textColor = "var(--color-primary)",
  height = "100vh",
}) => {
  return (
    <section
      className="w-full flex items-center justify-center py-16 lg:px-24"
      style={{
        height: height || "100vh",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: bgColor,
      }}
    >
      <div
        className="max-w-8xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        style={{ minHeight: height || "100vh" }}
      >
        {/* Left Column - Content */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Header Text */}
          {headerText && (
            <h1
              className="uppercase tracking-[-0.02em] font-black leading-[1]"
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
                  className="px-8 py-2 bg-white border-2 border-(--color-secondary) text-(--color-secondary) rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                  text={secondaryButtonText}
                  icon={secondaryButtonIcon}
                />
              )}
            </div>
          )}
        </div>

        {/* Right Column - Helper Image */}
        {/* Right Column - Helper Image with Abstract SVG Shapes */}
        {helperImage && (
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl aspect-square">
              {/* Abstract Shapes - Only render if showShapes is true */}
              {showShapes && (
                <>
                  {/* Abstract Shape 1 */}
                  <svg
                    className="absolute top-0 left-0 w-[100%] h-[100%] rotate-[18deg] z-0 blur-3xl"
                    viewBox="0 0 400 400"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0"
                      y="40"
                      width="300"
                      height="300"
                      rx="90"
                      fill="var(--color-tertiary)"
                      opacity="0.7"
                    />
                  </svg>

                  {/* Abstract Shape 2 */}
                  <svg
                    className="absolute bottom-0 right-0 w-[100%] h-[100%] rotate-[-12deg] z-0 blur-3xl"
                    viewBox="0 0 400 400"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="40"
                      y="20"
                      width="300"
                      height="300"
                      rx="110"
                      fill="var(--color-secondary)"
                    />
                  </svg>
                </>
              )}

              {/* Image Stack */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Back Left Image */}
                {helperImage1 && (
                  <div className="absolute -left-12 top-1/2 -translate-y-1/2 scale-50 z-10 opacity-80">
                    <Image
                      src={helperImage1}
                      alt="Helper illustration left"
                      width={500}
                      height={500}
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Back Right Image */}
                {helperImage2 && (
                  <div className="absolute -right-12 top-1/2 -translate-y-1/2 scale-50 z-10 opacity-80">
                    <Image
                      src={helperImage2}
                      alt="Helper illustration right"
                      width={500}
                      height={500}
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Front Image */}
                <div className={`relative ${imageSize} z-20`}>
                  <Image
                    src={helperImage}
                    alt="Helper illustration main"
                    width={600}
                    height={600}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FullscreenHeader;
