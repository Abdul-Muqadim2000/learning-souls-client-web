"use client";

import { ChevronDown, Search, X } from "lucide-react";
import { useState, useRef, useEffect, useId } from "react";

/**
 * Searchable Select Component
 * A dropdown with search functionality - similar to currency dropdown
 */
const SearchableSelect = ({
  label = "",
  placeholder = "Select an option",
  value = "",
  onChange = () => {},
  name = "",
  id = "",
  required = false,
  disabled = false,
  error = "",
  className = "",
  options = [], // Array of strings or objects with {value, label}
  searchPlaceholder = "Search...",
  noResultsText = "No results found",
  ...rest
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const generatedId = useId();
  const inputId = id || name || `searchable-select-${generatedId}`;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isDropdownOpen]);

  // Filter options based on search query
  const filteredOptions = options.filter((option) => {
    const optionLabel = (option.label || option).toString().toLowerCase();
    const optionValue = (option.value || option).toString().toLowerCase();
    const query = searchQuery.toLowerCase();
    return optionLabel.includes(query) || optionValue.includes(query);
  });

  // Get selected option
  const selectedOption = options.find((opt) => (opt.value || opt) === value);
  const displayValue = selectedOption
    ? selectedOption.label || selectedOption
    : placeholder;

  // Base input styles
  const regularInputStyles = `
    w-full px-6 py-4 rounded-full
    bg-[#c8e6df] 
    text-gray-900
    font-semibold
    placeholder-gray-500
    border-2
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

  // Label styles
  const labelStyles = `
    block mb-2 text-sm font-semibold text-gray-700
    ${required ? "after:content-['*'] after:ml-1 after:text-red-500" : ""}
  `;

  // Error message styles
  const errorStyles = "mt-1 text-sm text-red-500";

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className={labelStyles}>
          {label}
        </label>
      )}

      <div className="relative inline-block w-full" ref={dropdownRef}>
        {/* Custom Select Button */}
        <button
          type="button"
          id={inputId}
          onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
          disabled={disabled}
          className={`${regularInputStyles} appearance-none pr-14 text-left ${!selectedOption && placeholder ? "text-gray-500" : ""}`}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
        >
          {displayValue}
          {/* Chevron Icon */}
          <span
            className="pointer-events-none absolute right-8 top-1/2 transition-transform duration-200"
            style={{
              transform: `translateY(-50%) ${isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)"}`,
            }}
          >
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </span>
        </button>

        {/* Custom Dropdown Menu with Search */}
        {isDropdownOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-300 rounded-3xl shadow-xl overflow-hidden">
            {/* Search Bar */}
            <div className="sticky top-0 bg-white p-3 border-b-2 border-gray-200 z-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full pl-10 pr-8 py-2 rounded-full border-2 border-gray-300 focus:border-[#09b29d] focus:outline-none focus:ring-2 focus:ring-[#09b29d] transition-all text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery("");
                      searchInputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-64 sm:max-h-72 md:max-h-80 overflow-y-auto custom-scrollbar py-2">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => {
                  const optionValue = option.value || option;
                  const optionLabel = option.label || option;
                  const isSelected = optionValue === value;

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        onChange({ target: { name, value: optionValue } });
                        setIsDropdownOpen(false);
                        setSearchQuery("");
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
                })
              ) : (
                <div className="px-6 py-8 text-center text-gray-500 text-sm">
                  {noResultsText}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hidden input for form submission */}
        <input type="hidden" name={name} value={value} required={required} />
      </div>

      {error && <p className={errorStyles}>{error}</p>}
    </div>
  );
};

export default SearchableSelect;
