"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

function DropdownMenu({ label, items, href, isOpen, onOpen, onClose }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    onOpen();
    // Set first item as default
    if (!hoveredItem && items.length > 0) {
      setHoveredItem(items[0]);
    }
  };

  const handleMouseLeave = () => {
    onClose();
  };

  return (
    <>
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
      </div>

      {/* Dropdown menu covering nav links width */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          absolute top-full mt-2
          bg-white
          border border-[#09b29d]/20
          rounded-lg
          shadow-lg
          z-50
          transition-all duration-200 ease-out
          min-w-[700px]
          origin-top
          ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"}
        `}
        style={{ left: "-100px" }}
      >
        <div className="flex">
          {/* Left Column - Options List */}
          <div className="w-1/2 p-4 border-r border-[#09b29d]/20">
            <div className="space-y-2">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item)}
                  className={`
                    block px-4 py-3
                    text-base font-medium
                    rounded-lg
                    transition-all duration-200
                    border border-transparent
                    ${
                      hoveredItem?.href === item.href
                        ? "text-[#bd2387] bg-[#09b29d]/10 border-[#09b29d]/20"
                        : "text-[#09b29d] hover:text-[#bd2387] hover:bg-[#09b29d]/5 hover:border-[#09b29d]/20"
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column - Dynamic Content Panel */}
          <div className="w-1/2 p-6 flex flex-col justify-between">
            {hoveredItem && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#09b29d]">
                  {hoveredItem.label}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {hoveredItem.description}
                </p>
                <Link
                  href={hoveredItem.href}
                  className="
                    inline-block px-6 py-2
                    text-sm font-medium
                    text-white bg-[#bd2387]
                    hover:bg-[#9e1e6f]
                    rounded-lg
                    transition-colors duration-200
                  "
                >
                  Learn More
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Mobile Dropdown Menu Component
function MobileDropdownMenu({ label, items, onItemClick, href }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = () => {
    setIsOpen(false);
    if (onItemClick) onItemClick();
  };

  const handleParentClick = () => {
    if (onItemClick) onItemClick();
  };

  return (
    <div className="w-full">
      <div className="flex items-center">
        <Link
          href={href}
          onClick={handleParentClick}
          className="
            flex-1 px-4 py-3
            text-lg font-medium text-[#09b29d]
            hover:text-[#bd2387]
            transition-colors duration-200
          "
        >
          {label}
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            px-4 py-3
            text-lg font-medium text-[#09b29d]
            hover:text-[#bd2387]
            transition-colors duration-200
          "
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

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
