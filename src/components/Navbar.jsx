"use client";

import { useState } from "react";
import NavItem from "./NavItem";
import { PrimaryButton } from "./ui/Button";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/our-projects", label: "Our Projects" },
    { href: "/downloads", label: "Downloads" },
    { href: "/links", label: "Links" },
  ];

  return (
    <nav className="w-full bg-(--color-primary) border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Learning Souls Logo"
              width={80}
              height={80}
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
              priority
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <NavItem key={link.href} href={link.href} label={link.label} />
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <PrimaryButton text="Get Started" className="px-6 xl:px-8" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-3 bg-(--color-primary) border-t">
          {navLinks.map((link) => (
            <div key={link.href} onClick={closeMobileMenu}>
              <NavItem href={link.href} label={link.label} />
            </div>
          ))}
          <div className="pt-2">
            <PrimaryButton
              text="Get Started"
              className="w-full justify-center"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
