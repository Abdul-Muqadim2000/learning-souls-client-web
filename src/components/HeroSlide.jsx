import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TertiaryButton } from "./ui/Button";
/**
 * HeroSlide - A reusable slide component for the hero carousel
 *
 * @param {string} backgroundImage - URL/path to the background image
 * @param {string} title - Main heading text for the slide
 * @param {string} description - Description text for the slide
 * @param {Object} primaryButton - Primary button config {text, href}
 * @param {Object} secondaryButton - Secondary button config {text, href}
 */
export default function HeroSlide({
  backgroundImage,
  title,
  description,
  primaryButton,
  secondaryButton,
}) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden w-full min-h-[400px] h-[500px] sm:h-[600px] md:h-[650px] lg:h-[calc(100vh-96px)] xl:h-[calc(100vh-96px)] 2xl:h-[750px] hero-slide-bg"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundColor: "#14b8a6", // Fallback teal color matching the hero image
      }}
    >
      {/* Only show title and buttons if they exist */}
      {(title || primaryButton || secondaryButton) && (
        <div className="w-full h-full relative z-10 flex items-center">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-full sm:max-w-[600px] lg:max-w-[900px]">
              {/* Main Heading */}
              {title && (
                <h1 className="font-bold text-white mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight lg:leading-[1.2]">
                  {title}
                </h1>
              )}

              {/* CTA Buttons */}
              {(primaryButton || secondaryButton) && (
                <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-9">
                  {primaryButton && (
                    <TertiaryButton
                      text={primaryButton.text}
                      icon={ArrowRight}
                      href={primaryButton.href}
                      className="px-6 sm:px-8 py-3 sm:py-3.5"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
