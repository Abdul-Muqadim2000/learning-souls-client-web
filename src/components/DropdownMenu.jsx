"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

function DropdownMenu({ label, items, href }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={href}
        className="
          flex items-center gap-1
          text-lg font-medium text-[#09b29d]
          hover:text-[#bd2387]
          transition-colors duration-200
        "
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Link>

      {isOpen && (
        <div
          className="
            absolute top-full left-0 mt-2
            min-w-[200px]
            bg-white
            border border-[#09b29d]/20
            rounded-lg
            shadow-lg
            overflow-hidden
            z-50
          "
        >
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="
                block px-4 py-3
                text-base font-medium text-[#09b29d]
                hover:text-[#bd2387]
                hover:bg-[#09b29d]/5
                transition-colors duration-200
                border-b border-[#09b29d]/10
                last:border-b-0
              "
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// Mobile Dropdown Menu Component
function MobileDropdownMenu({ label, items, onItemClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = () => {
    setIsOpen(false);
    if (onItemClick) onItemClick();
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full flex items-center justify-between
          px-4 py-3
          text-lg font-medium text-[#09b29d]
          hover:text-[#bd2387]
          transition-colors duration-200
        "
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="bg-[#09b29d]/5">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={handleItemClick}
              className="
                block px-8 py-3
                text-base font-medium text-[#09b29d]
                hover:text-[#bd2387]
                hover:bg-[#09b29d]/5
                transition-colors duration-200
              "
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export { DropdownMenu, MobileDropdownMenu };
export default DropdownMenu;
