import Image from "next/image";

export default function EditionsShowcase({ title, description, editions }) {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
          style={{ color: "var(--color-secondary)" }}
        >
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-12 text-justify max-w-5xl mx-auto">
          {description}
        </p>

        {/* Editions Grid - 2 columns, dynamic rows */}
        <div className="grid md:grid-cols-2 gap-8">
          {editions.map((edition, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row overflow-hidden bg-gray-100 rounded-lg hover:shadow-lg transition-shadow min-h-[280px]"
            >
              {/* Image */}
              <div className="relative w-full md:w-2/5 shrink-0 min-h-[200px] md:min-h-full">
                <Image
                  src={edition.image}
                  alt={edition.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="w-full md:w-3/5 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {edition.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {edition.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
