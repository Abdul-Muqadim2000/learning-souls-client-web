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
      let classes = "grid gap-2 xs:gap-3";
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
    return "grid gap-2 xs:gap-3";
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
          const optionColor = option.color || option;
          const optionLabel = option.label || option;
          const optionDescription = option.description || "";
          const optionBadge = option.badge; // Badge text to display
          const optionBadgeImage = option.badgeImage; // Badge image/icon URL
          const optionBgColor = option.bgColor; // Custom background color
          const optionTextColor = option.textColor; // Custom text color
          const optionDisabled = option.disabled || false; // Disabled state
          const isSelected = value === optionValue;

          return (
            <button
              key={optionValue}
              type="button"
              onClick={() => !optionDisabled && onChange(optionValue)}
              disabled={optionDisabled}
              style={{
                ...(optionBgColor && isSelected
                  ? { backgroundColor: optionBgColor }
                  : optionBgColor && !isSelected
                    ? { backgroundColor: optionBgColor, opacity: 0.7 }
                    : {}),
                ...(optionTextColor ? { color: optionTextColor } : {}),
              }}
              className={`
                relative px-3 py-3 xs:px-4 xs:py-3.5 sm:px-6 sm:py-4 rounded-full
                transition-all duration-200
                font-medium text-center
                focus:outline-none
                overflow-visible
                ${
                  optionDisabled
                    ? "cursor-not-allowed opacity-50 bg-red-100 border-2 border-red-300 text-red-400"
                    : "cursor-pointer"
                }
                ${
                  !optionDisabled && optionBgColor
                    ? isSelected
                      ? `${!optionTextColor ? "text-gray-900" : ""} border-0 shadow-lg scale-105 focus:shadow-xl`
                      : `${!optionTextColor ? "text-gray-700" : ""} border-0 shadow hover:shadow-lg hover:scale-102 focus:shadow-lg focus:scale-100`
                    : !optionDisabled && isSelected
                      ? `bg-[#c8e6df] ${!optionTextColor ? "text-gray-900" : ""} border-2 border-[#09b29d] focus:ring-2 focus:ring-[#09b29d]`
                      : !optionDisabled
                        ? `bg-white border-2 border-gray-300 ${!optionTextColor ? "text-gray-700" : ""} hover:border-[#09b29d] hover:bg-gray-50 focus:ring-2 focus:ring-[#09b29d]`
                        : ""
                }
              `}
            >
              {/* Tilted Badge in corner */}
              {(optionBadge || optionBadgeImage) && (
                <div className="absolute -top-2 -right-2 z-20">
                  <span
                    className={`
                      inline-flex items-center gap-1.5
                      px-2.5 py-1  rounded-md text-xs font-bold
                      shadow-md border transform rotate-15
                      transition-all duration-200
                      ${
                        isSelected
                          ? "bg-white border-white scale-110"
                          : "bg-white text-gray-700 border-gray-300"
                      }
                    `}
                  >
                    {optionBadgeImage && (
                      <img
                        src={optionBadgeImage}
                        alt=""
                        className="w-6 h-6 object-contain"
                      />
                    )}
                    {optionBadge && <span>{optionBadge}</span>}
                  </span>
                </div>
              )}

              <div className="text-sm xs:text-base font-semibold relative z-10 leading-tight">
                {optionLabel}
              </div>
              {optionDescription && (
                <div
                  className={`text-[10px] xs:text-xs mt-0.5 xs:mt-1 relative z-10`}
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
