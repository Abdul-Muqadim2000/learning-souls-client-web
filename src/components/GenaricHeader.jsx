import React from "react";

const GenaricHeader = ({ title, image }) => {
  return (
    <section
      className="w-full h-[200px] sm:h-[250px] lg:h-[300px] flex items-center justify-center"
      style={{
        backgroundImage: image ? `url(${image})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: image ? "transparent" : "#bd2387",
      }}
    >
      <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
        {title}
      </h1>
    </section>
  );
};

export default GenaricHeader;
