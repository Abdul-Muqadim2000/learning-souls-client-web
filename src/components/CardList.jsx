import Link from "next/link";
import { SecondaryButton } from "./ui/Button";
import GenericHeader from "./GenericHeader";
import Image from "next/image";

const CardList = ({ cards = [], showTitle = true }) => {
  if (!cards || cards.length === 0) return null;

  return (
    <section className="bg-(--color-primary) py-1 sm:py-20 lg:py-20">
      {showTitle && (
        <GenericHeader
          title="OUR PROJECTS"
          textColor={"var(--color-secondary)"}
          height="md"
        />
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

                {/* Dark Overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />

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
                      <SecondaryButton text={card.buttonText} />
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
