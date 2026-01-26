"use client";

import { useState } from "react";
import Link from "next/link";
import NavItem from "./NavItem";
import { DropdownMenu, MobileDropdownMenu } from "./DropdownMenu";
import { PrimaryButton } from "./ui/Button";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { href: "/", label: "Home" },
    {
      href: "/projects",
      label: "Our Projects",
      isDropdown: true,
      items: [
        {
          href: "/projects/quran-translation-for-all",
          label: "Quran Translation For All",
          description:
            "Making the Quran accessible to everyone through comprehensive translations in multiple languages.",
        },
        {
          href: "/projects/distributing-quran-and-seerah",
          label: "Distributing Quran and Seerah",
          description:
            "Distributing the Holy Quran and Seerah books to communities worldwide to spread Islamic knowledge.",
        },
        {
          href: "/projects/translation-of-hadith",
          label: "Translation of Hadith",
          description:
            "Translating authentic Hadith collections into multiple languages for better understanding of the Prophet's teachings.",
        },
      ],
    },
    {
      href: "/downloads",
      label: "Downloads",
      isDropdown: true,
      items: [
        {
          href: "/downloads/books-distribution-project",
          label: "Books Distribution Project",
          description:
            "Download and access Islamic books that are being distributed worldwide to promote Islamic education.",
        },
        {
          href: "/downloads/al-mustafa-translation",
          label: "Al-Mustafa Translation",
          description:
            "Access the Al-Mustafa Quran translation with Tajweed, word-by-word meaning, and renowned recitations.",
        },
        {
          href: "/downloads/apps",
          label: "Apps",
          description:
            "Explore our collection of Islamic mobile applications including Jummah Khutbah, Hadith, and more.",
        },
      ],
    },
    {
      href: "/about-us",
      label: "About",
      isDropdown: true,
      items: [
        {
          href: "/downloads/join-us",
          label: "Join Us",
          description:
            "Become part of our mission to spread Islamic knowledge and contribute to our various projects.",
        },
        {
          href: "/downloads/contact-us",
          label: "Contact Us",
          description:
            "Get in touch with us for queries, suggestions, or to learn more about our organization.",
        },
      ],
    },
  ];

  return (
    <nav
      className="w-full bg-white sticky top-0 z-50 shadow-sm"
      style={{ "--navbar-height": "5rem" }}
    >
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
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 relative">
            {navLinks.map((link, index) =>
              link.isDropdown ? (
                <DropdownMenu
                  key={index}
                  label={link.label}
                  href={link.href}
                  items={link.items}
                />
              ) : (
                <NavItem key={link.href} href={link.href} label={link.label} />
              ),
            )}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link href="/register">
              <PrimaryButton text="Donate Now" className="px-6 xl:px-8" />
            </Link>
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
        className={`lg:hidden mb-4 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-3 bg-white border-t">
          {navLinks.map((link, index) =>
            link.isDropdown ? (
              <MobileDropdownMenu
                key={index}
                label={link.label}
                href={link.href}
                items={link.items}
                onItemClick={closeMobileMenu}
              />
            ) : (
              <div key={link.href} onClick={closeMobileMenu}>
                <NavItem href={link.href} label={link.label} />
              </div>
            ),
          )}
          <div className="pt-2">
            <Link href="/register">
              <PrimaryButton
                text="Get Started"
                className="w-full justify-center"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
