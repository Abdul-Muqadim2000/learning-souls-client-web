export default function FeatureList({ features = [], title = "Features" }) {
  return (
    <div className="max-w-6xl mx-auto">
      {title && (
        <h3
          className="font-bold text-gray-800 mb-5 sm:mb-6"
          style={{
            fontSize: "clamp(1.5rem, 2.5vw + 0.5rem, 2rem)",
          }}
        >
          {title}
        </h3>
      )}
      <ul className="space-y-2.5 sm:space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500 mr-2.5 sm:mr-3 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span
              className="text-gray-700 leading-relaxed"
              style={{
                fontSize: "clamp(0.9rem, 1.5vw + 0.25rem, 1rem)",
              }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
