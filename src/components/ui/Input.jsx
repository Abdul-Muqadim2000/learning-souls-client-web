"use client";

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

/**
 * Reusable Input Component
 * Supports text, password, email, number, tel, url, textarea, and select (dropdown)
 */
const Input = ({
  type = "text",
  label = "",
  placeholder = "",
  value = "",
  onChange = () => {},
  name = "",
  id = "",
  required = false,
  disabled = false,
  error = "",
  className = "",
  options = [], // For dropdown/select
  rows = 4, // For textarea
  showPasswordToggle = false, // Show/hide password toggle
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputId =
    id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Base input styles using CSS variables
  const baseInputStyles = `
    w-full px-4 sm:px-6 py-3 sm:py-4 
    bg-[#c8e6df] 
    text-gray-900
    text-sm sm:text-base
    font-semibold
    placeholder-gray-500
    border-2
    hover:border-(--color-secondary)
    focus:outline-none 
    focus:ring-2 
    focus:ring-[#09b29d]
    transition-all duration-200
    disabled:bg-gray-100 
    disabled:cursor-not-allowed
    disabled:text-gray-500
    ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-300 focus:border-[#09b29d]"}
    ${className}
  `;

  // Specific styles for textarea (rounded corners instead of full)
  const textareaStyles = `
    w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg
    bg-[#c8e6df] 
    text-gray-900
    text-sm sm:text-base
    placeholder-gray-500
    border-2
    focus:outline-none 
    focus:ring-2 
    focus:ring-[#09b29d]
    transition-all duration-200
    disabled:bg-gray-100 
    disabled:cursor-not-allowed
    disabled:text-gray-500
    resize-y
    ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-300 focus:border-[#09b29d]"}
    ${className}
  `;

  // Regular input styles (rounded-full)
  const regularInputStyles = `
    ${baseInputStyles} rounded-full
  `;

  // Label styles
  const labelStyles = `
    block mb-2 text-sm font-semibold text-gray-700
    ${required ? "after:content-['*'] after:ml-1 after:text-red-500" : ""}
  `;

  // Error message styles
  const errorStyles = "mt-1 text-sm text-red-500";

  // Render different input types
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={rows}
            className={textareaStyles}
            {...rest}
          />
        );

      case "select":
      case "dropdown":
        const selectedOption = options.find(
          (opt) => (opt.value || opt) === value,
        );
        const displayValue = selectedOption
          ? selectedOption.label || selectedOption
          : placeholder || "Select an option";

        return (
          <div className="relative inline-block w-full" ref={dropdownRef}>
            {/* Custom Select Button */}
            <button
              type="button"
              id={inputId}
              onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
              disabled={disabled}
              className={`${regularInputStyles} appearance-none pr-8 text-left ${!selectedOption && placeholder ? "text-gray-500" : ""}`}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              {displayValue}
            </button>

            {/* Chevron Icon */}
            <span
              className="pointer-events-none absolute right-1.5 top-1/2 transition-transform duration-200"
              style={{
                transform: `translateY(-50%) ${isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)"}`,
              }}
            >
              <ChevronDown className="w-4 h-4" />
            </span>

            {/* Custom Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-300 rounded-3xl shadow-xl max-h-64 sm:max-h-72 md:max-h-80 overflow-y-auto custom-scrollbar py-2">
                {options.map((option, index) => {
                  const optionValue = option.value || option;
                  const optionLabel = option.label || option;
                  const isSelected = optionValue === value;

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        onChange({ target: { name, value: optionValue } });
                        setIsDropdownOpen(false);
                      }}
                      className={`px-4 sm:px-6 py-3 sm:py-4 mx-2 rounded-2xl cursor-pointer transition-all duration-200 font-semibold text-sm sm:text-base ${
                        isSelected
                          ? "bg-[#bd2387] text-white"
                          : "text-gray-900 hover:bg-[#09b29d] hover:text-white"
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      {optionLabel}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Hidden input for form submission */}
            <input
              type="hidden"
              name={name}
              value={value}
              required={required}
            />
          </div>
        );

      case "password":
        return (
          <div className="relative">
            <input
              type={showPasswordToggle && showPassword ? "text" : "password"}
              id={inputId}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              className={regularInputStyles}
              {...rest}
            />
            {showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#09b29d] transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        );

      default:
        // text, email, number, tel, url, date, time, etc.
        return (
          <input
            type={type}
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={regularInputStyles}
            {...rest}
          />
        );
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className={labelStyles}>
          {label}
        </label>
      )}
      {renderInput()}
      {error && <p className={errorStyles}>{error}</p>}
    </div>
  );
};

export default Input;

// Export common input type variations for convenience
export const TextInput = (props) => <Input type="text" {...props} />;
export const PasswordInput = (props) => (
  <Input type="password" showPasswordToggle {...props} />
);
export const EmailInput = (props) => <Input type="email" {...props} />;
export const NumberInput = (props) => <Input type="number" {...props} />;
export const TextArea = (props) => <Input type="textarea" {...props} />;
export const Select = (props) => <Input type="select" {...props} />;
