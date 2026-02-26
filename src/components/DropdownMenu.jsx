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
            text-base lg:text-base xl:text-lg font-medium text-[#09b29d]
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
          w-[600px] xl:w-[750px]
          origin-top
          left-1/2 -translate-x-1/2
          ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"}
        `}
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
                    block px-4 py-6
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
          <div className="w-1/2 p-6 flex flex-col justify-center ">
            {hoveredItem && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-[#09b29d]">
                  {hoveredItem.label}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {hoveredItem.description}
                </p>
                <Link
                  href={hoveredItem.href}
                  className="
                    inline-block px-6 py-3
                    text-sm font-medium
                    text-white bg-[#bd2387]
                    hover:bg-[#9e1e6f]
                    transition-colors duration-200
                    rounded-full
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
function MobileDropdownMenu({ label, items, onItemClick, href, isOpen, onToggle }) {
  const handleItemClick = () => {
    if (onItemClick) onItemClick();
  };

  return (
    <div className="w-full">
      <button
        onClick={onToggle}
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
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
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
                hover:bg-[#09b29d]/10
                transition-colors duration-200
              "
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export { DropdownMenu, MobileDropdownMenu };
export default DropdownMenu;
