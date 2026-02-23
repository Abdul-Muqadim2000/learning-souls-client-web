import Image from "next/image";

export default function QuranHero({
  title,
  bannerTitle,
  bannerSubtitle,
  heroImage,
  bannerImage,
}) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* First Row - Hero with Background Image */}
      <div
        className="relative py-12 px-4 sm:py-16 md:py-20 lg:py-28 xl:py-36 md:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundColor: heroImage ? "transparent" : "var(--color-secondary)",
        }}
      >
        {/* Background Image */}
        {heroImage && (
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt="Background"
              fill
              className="object-cover"
              priority
            />
            {/* Subtle overlay for better text contrast on all screens */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10"></div>
          </div>
        )}

        {/* Background Pattern if no image */}
        {!heroImage && (
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M30 30 L40 20 L50 30 L40 40 Z" fill="white" opacity="0.3"/%3E%3C/svg%3E")',
                backgroundSize: "60px 60px",
              }}
            />
          </div>
        )}

        {/* Title */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-2">
          <h1
            className="font-bold text-white drop-shadow-2xl leading-tight animate-fadeIn"
            style={{
              fontSize: "clamp(2rem, 5vw + 0.5rem, 4rem)",
              textShadow:
                "0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {title}
          </h1>
        </div>
      </div>

      {/* Second Row - Two Column Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto overflow-hidden shadow-2xl">
        {/* First Column - Image Section */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-full min-h-[300px] lg:min-h-[400px] flex items-center justify-center">
          <Image
            src={bannerImage}
            alt="Al-Mustafa Translation"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Second Column - Text Section with Tertiary Color */}
        <div
          className="p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 flex items-center justify-center"
          style={{ backgroundColor: "var(--color-tertiary)" }}
        >
          <div className="text-center text-white max-w-md">
            <h2
              className="font-bold mb-3 sm:mb-4 leading-tight"
              style={{
                fontSize: "clamp(1.5rem, 3vw + 0.5rem, 2.25rem)",
                lineHeight: "1.2",
              }}
            >
              {bannerTitle}
            </h2>
            {bannerSubtitle && (
              <p
                className="font-light mt-2"
                style={{
                  fontSize: "clamp(1rem, 2vw + 0.25rem, 1.5rem)",
                }}
              >
                {bannerSubtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
