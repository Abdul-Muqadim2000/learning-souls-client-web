"use client";

/**
 * ToggleButtonGroup Component
 * A reusable component for mutually exclusive button selections
 * Follows the UI styling pattern with bg-[#c8e6df] and focus ring
 */
const ToggleButtonGroup = ({
  label = "",
  options = [],
  value = "",
  onChange = () => {},
  columns = 2,
  responsiveColumns = null, // { sm: 2, md: 3, lg: 4 } for responsive layouts
  required = false,
  className = "",
}) => {
  // Label styles matching Input component
  const labelStyles = `
    block mb-3 text-sm font-semibold text-gray-700
    ${required ? "after:content-['*'] after:ml-1 after:text-red-500" : ""}
  `;

  // Generate responsive grid classes
  const getGridClasses = () => {
    if (responsiveColumns) {
      // Build responsive classes
      let classes = "grid gap-3";
      if (responsiveColumns.base)
        classes += ` grid-cols-${responsiveColumns.base}`;
      if (responsiveColumns.sm)
        classes += ` sm:grid-cols-${responsiveColumns.sm}`;
      if (responsiveColumns.md)
        classes += ` md:grid-cols-${responsiveColumns.md}`;
      if (responsiveColumns.lg)
        classes += ` lg:grid-cols-${responsiveColumns.lg}`;
      if (responsiveColumns.xl)
        classes += ` xl:grid-cols-${responsiveColumns.xl}`;
      return classes;
    }
    return "grid gap-3";
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <label className={labelStyles}>{label}</label>}

      <div
        className={getGridClasses()}
        style={
          !responsiveColumns
            ? { gridTemplateColumns: `repeat(${columns}, 1fr)` }
            : undefined
        }
      >
        {options.map((option) => {
          const optionValue = option.value || option;
          const optionLabel = option.label || option;
          const optionDescription = option.description || "";
          const isSelected = value === optionValue;

          return (
            <button
              key={optionValue}
              type="button"
              onClick={() => onChange(optionValue)}
              className={`
                px-6 py-4 rounded-full
                transition-all duration-200
                font-medium text-center
                focus:outline-none focus:ring-2 focus:ring-[#09b29d]
                ${
                  isSelected
                    ? "bg-[#c8e6df] text-gray-900 border-2 border-[#09b29d]"
                    : "bg-white border-2 border-gray-300 text-gray-700 hover:border-[#09b29d] hover:bg-gray-50"
                }
              `}
            >
              <div className="text-base font-semibold">{optionLabel}</div>
              {optionDescription && (
                <div
                  className={`text-xs mt-1 ${isSelected ? "text-gray-600" : "text-gray-500"}`}
                >
                  {optionDescription}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ToggleButtonGroup;

/**
 * Convenience components for common use cases
 */

// Binary toggle (2 options)
export const BinaryToggle = (props) => (
  <ToggleButtonGroup columns={2} {...props} />
);

// Triple toggle (3 options)
export const TripleToggle = (props) => (
  <ToggleButtonGroup columns={3} {...props} />
);

// Quad toggle (4 options)
export const QuadToggle = (props) => (
  <ToggleButtonGroup columns={4} {...props} />
);
