"use client";

import { useState } from "react";

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
  const inputId =
    id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

  // Base input styles using CSS variables
  const baseInputStyles = `
    w-full px-4 py-3 rounded-lg border-2 
    bg-[var(--color-primary)] 
    text-gray-800
    border-gray-300
    focus:border-[var(--color-secondary)] 
    focus:outline-none 
    focus:ring-2 
    focus:ring-[var(--color-secondary)]/20
    transition-all duration-200
    disabled:bg-gray-100 
    disabled:cursor-not-allowed
    disabled:text-gray-500
    ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
    ${className}
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
            className={baseInputStyles}
            {...rest}
          />
        );

      case "select":
      case "dropdown":
        return (
          <select
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={baseInputStyles}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option, index) => (
              <option key={index} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
          </select>
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
              className={baseInputStyles}
              {...rest}
            />
            {showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--color-secondary)] transition-colors"
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
            className={baseInputStyles}
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
