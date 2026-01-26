import Image from "next/image";

export default function ProjectHero({
  title,
  backgroundImage,
  lanterns = true,
}) {
  return (
    <div className="relative bg-gradient-to-r from-teal-400 to-teal-500 py-16 px-8 overflow-hidden max-w-7xl">
      {/* Background Pattern */}
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

      {/* Title */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
          {title}
        </h1>
      </div>
    </div>
  );
}
