export default function ContentSection({
  title,
  children,
  className = "",
  centered = false,
  icon = null,
}) {
  return (
    <section
      className={`py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 md:px-8 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {title && (
          <div
            className={`mb-6 sm:mb-7 md:mb-8 ${centered ? "text-center" : ""}`}
          >
            {icon && (
              <div className="mb-3 sm:mb-4 flex justify-center">{icon}</div>
            )}
            <h2
              className="font-bold text-gray-800 mb-2 leading-tight"
              style={{
                fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.5rem)",
              }}
            >
              {title}
            </h2>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
