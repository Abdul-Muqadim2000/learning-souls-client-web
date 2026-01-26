import Image from "next/image";

export default function ProjectBanner({
  logo,
  title,
  subtitle,
  logoAlt = "Project Logo",
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto overflow-hidden shadow-lg">
      {/* Logo Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-12 md:p-16 flex items-center justify-center">
        <div className="text-center">
          {logo && (
            <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-4">
              <Image src={logo} alt={logoAlt} fill className="object-contain" />
            </div>
          )}
          {!logo && (
            <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-4">
              {/* Decorative Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 border-4 border-white rounded-full opacity-20"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-4 border-white rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      className="w-16 h-16 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2L2 7l8 5 8-5-8-5zM2 17l8 5 8-5M2 12l8 5 8-5"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 text-white text-xl font-bold">
                AL-MUSTAFA
                <br />
                <span className="text-sm font-normal">TRANSLATION</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Text Section */}
      <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-12 md:p-16 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {title || "Translation of the Holy Quran"}
          </h2>
          <p className="text-xl md:text-2xl font-light">
            {subtitle || "Easy To Understand For All"}
          </p>
        </div>
      </div>
    </div>
  );
}
