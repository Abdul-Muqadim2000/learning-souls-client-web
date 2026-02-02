import Image from "next/image";

export default function QuranHero({
  title,
  bannerTitle,
  bannerSubtitle,
  heroImage,
}) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* First Row - Hero with Background Image */}
      <div
        className="relative py-16 px-4 sm:py-24 md:py-36 md:px-8 overflow-hidden"
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
            />
            {/* Dark overlay for better text readability */}
            {/* <div className="absolute inset-0 bg-black opacity-40"></div> */}
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
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            {title}
          </h1>
        </div>
      </div>

      {/* Second Row - Two Column Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto overflow-hidden shadow-lg">
        {/* First Column - Image Section with Dark Teal Background */}
        <div
          className="p-6 md:p-12 lg:p-16 flex items-center justify-center"
          style={{ backgroundColor: "#054A48" }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/project2.webp"
              alt="Al-Mustafa Translation"
              width={400}
              height={400}
              className="object-contain w-[200px] sm:w-[280px] md:w-[350px] lg:w-[400px] h-auto"
            />
          </div>
        </div>

        {/* Second Column - Text Section with Tertiary Color */}
        <div
          className="p-6 md:p-12 lg:p-16 flex items-center justify-center"
          style={{ backgroundColor: "var(--color-tertiary)" }}
        >
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {bannerTitle}
            </h2>
            <p className="text-xl md:text-2xl font-light">{bannerSubtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
