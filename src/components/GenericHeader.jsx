import React from "react";

const heightClasses = {
  xs: "h-[60px] sm:h-[100px] lg:h-[140px]",
  sm: "h-[160px] sm:h-[200px] lg:h-[240px]",
  md: "h-[200px] sm:h-[250px] lg:h-[300px]",
  lg: "h-[260px] sm:h-[320px] lg:h-[380px]",
  xl: "h-[320px] sm:h-[400px] lg:h-[480px]",
};

const GenericHeader = ({ title, image, bgColor, textColor, height = "md" }) => {
  return (
    <section
      className={`w-full flex items-center justify-center ${
        heightClasses[height]
      }`}
      style={{
        backgroundImage: image ? `url(${image})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: image
          ? "transparent"
          : bgColor || "var(--color-primary)",
      }}
    >
      <h1
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center uppercase"
        style={{ color: textColor || "var(--color-secondary)" }}
      >
        {title}
      </h1>
    </section>
  );
};

export default GenericHeader;
