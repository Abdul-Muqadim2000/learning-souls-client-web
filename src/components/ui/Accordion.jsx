"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const AccordionItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 px-6 text-left transition-all duration-200 hover:bg-gray-50 group"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-[var(--color-tertiary)] transition-colors duration-200">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[var(--color-secondary)] transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-5 pt-2">
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ items = [], allowMultiple = false, className = "" }) => {
  const [openItems, setOpenItems] = useState([]);

  const handleToggle = (index) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index)
          ? prev.filter((item) => item !== index)
          : [...prev, index],
      );
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div
      className={`w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 ${className}`}
    >
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openItems.includes(index)}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

// FAQ-specific wrapper component
export const FAQAccordion = ({ faqs = [], className = "" }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="mb-8 text-center">
        <h2
          className="text-3xl sm:text-6xl font-bold mb-3"
          style={{ color: "var(--color-tertiary)" }}
        >
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Find answers to common questions about our services
        </p>
      </div>
      <Accordion items={faqs} allowMultiple={false} />
    </div>
  );
};

export default Accordion;
