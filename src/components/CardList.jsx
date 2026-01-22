import React from "react";
import Link from "next/link";
import { SecondaryButton } from "./ui/Button";

const CardList = ({ cards = [], title }) => {
  if (!cards || cards.length === 0) return null;

  return (
    <section className="bg-(--color-primary) py-16 sm:py-20 lg:py-24">
      {/* Section Title */}
      {title && (
        <h2 className="text-5xl sm:text-5xl font-bold text-(--color-secondary) text-center mb-12">
          {title}
        </h2>
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => (
            /* Shadow Wrapper */
            <div
              key={card.id}
              className="transition-transform duration-300 hover:scale-105"
            >
              {/* Card */}
              <div
                className={`relative rounded-xl overflow-hidden
                    border border-transparent
                    hover:border-[var(--color-secondary)]
                    h-[360px] sm:h-[380px] lg:h-[420px]
                    shadow-xl hover:shadow-2xl bg-gradient-to-b
                    ${card.gradientValue || ""}
                `}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${card.bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/45" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between text-center text-(--color-primary) p-6 sm:p-8">
                  {/* Title (Top) */}
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold pt-7">
                    {card.title}
                  </h3>

                  {/* Description (Center) */}
                  <p className="text-sm sm:text-base leading-relaxed mx-auto max-w-[90%]">
                    {card.description}
                  </p>

                  {/* Button (Bottom) */}
                  <div>
                    <Link href={card.buttonLink}>
                      <SecondaryButton
                        text={card.buttonText}
                        className="bg-(--color-secondary) text-(--color-secondary) hover:opacity-90"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardList;
