export default function ContentSection({
  title,
  children,
  className = "",
  centered = false,
  icon = null,
}) {
  return (
    <section className={`py-12 md:py-16 px-6 md:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {title && (
          <div className={`mb-8 ${centered ? "text-center" : ""}`}>
            {icon && <div className="mb-4 flex justify-center">{icon}</div>}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {title}
            </h2>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
