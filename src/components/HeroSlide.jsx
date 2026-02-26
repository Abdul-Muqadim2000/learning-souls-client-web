import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TertiaryButton } from "./ui/Button";
/**
 * HeroSlide - A reusable slide component for the hero carousel
 *
 * @param {string} backgroundImage - URL/path to the background image
 * @param {string} mobileBackgroundImage - URL/path to the mobile background image (optional)
 * @param {string} title - Main heading text for the slide
 * @param {string} description - Description text for the slide
 * @param {Object} primaryButton - Primary button config {text, href}
 * @param {Object} secondaryButton - Secondary button config {text, href}
 */
export default function HeroSlide({
  backgroundImage,
  mobileBackgroundImage,
  title,
  description,
  primaryButton,
  secondaryButton,
}) {
  return (
    <div className="relative w-full bg-[#14b8a6]">
      <div className="relative w-full flex items-center justify-center">
        {/* Background Image - Desktop (md and above) */}
        <img
          src={backgroundImage}
          alt="Hero background"
          className={`w-full h-auto max-w-full ${mobileBackgroundImage ? 'hidden md:block' : 'block'}`}
        />
        {/* Background Image - Mobile (sm and below) */}
        {mobileBackgroundImage && (
          <img
            src={mobileBackgroundImage}
            alt="Hero background mobile"
            className="w-full h-auto block md:hidden object-cover"
          />
        )}
        {/* Only show title and buttons if they exist */}
        {(title || primaryButton || secondaryButton) && (
          <div className="absolute inset-0 z-10 flex items-center">
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
    </div>
  );
}
