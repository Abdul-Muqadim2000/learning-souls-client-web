"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import NavItem from "./NavItem";
import { DropdownMenu, MobileDropdownMenu } from "./DropdownMenu";
import SecondaryButton, { PrimaryButton } from "./ui/Button";
import Image from "next/image";
import {
  Menu,
  X,
  User,
  LogOut,
  MailIcon,
  HandCoinsIcon,
  LogIn,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { user, logout, isAuthenticated } = useAuth();
  const closeTimeoutRef = useRef(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleDropdownOpen = (label) => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleDropdownClose = () => {
    // Use a short delay to allow moving between dropdowns
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

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
      href: "#",
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
      href: "#",
      label: "About",
      isDropdown: true,
      items: [
        {
          href: "/join-us",
          label: "Join Us",
          description:
            "Become part of our mission to spread Islamic knowledge and contribute to our various projects.",
        },
        {
          href: "/contact-us",
          label: "Contact Us",
          description:
            "Get in touch with us for queries, suggestions, or to learn more about our organization.",
        },
        {
          href: "/about-us",
          label: "About Us",
          description:
            "Learn more about our organization's mission, vision, and the team behind our Islamic projects.",
        },
      ],
    },
  ];

  return (
    <nav
      className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-100 shadow-sm"
      style={{ "--navbar-height": "5rem" }}
    >
      <div className="max-w-8xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <div className="flex-shrink-0 z-10">
            <Image
              src="/images/logo.webp"
              alt="Learning Souls Logo"
              width={80}
              height={80}
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
              priority
            />
          </div>

          {/* Desktop Navigation Links - Centered to viewport */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-14 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link, index) =>
              link.isDropdown ? (
                <DropdownMenu
                  key={index}
                  label={link.label}
                  href={link.href}
                  items={link.items}
                  isOpen={openDropdown === link.label}
                  onOpen={() => handleDropdownOpen(link.label)}
                  onClose={handleDropdownClose}
                />
              ) : (
                <NavItem key={link.href} href={link.href} label={link.label} />
              ),
            )}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-4 z-10">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <PrimaryButton
                    text="Dashboard"
                    className="px-6 xl:px-8"
                    icon={User}
                  />
                </Link>
                <PrimaryButton
                  text="Logout"
                  className="px-6 xl:px-8 bg-red-600 hover:bg-red-500"
                  onClick={logout}
                  icon={LogOut}
                />
              </>
            ) : (
              <>
                <Link href="/login">
                  <SecondaryButton
                    text="Login"
                    className="px-6 xl:px-8"
                    icon={LogIn}
                  />
                </Link>
                <Link href="/donate">
                  <PrimaryButton
                    text="Donate Now"
                    className="px-6 xl:px-8"
                    icon={HandCoinsIcon}
                  />
                </Link>
              </>
            )}
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
        <div className="px-8 pt-2 pb-4 space-y-3 bg-white border-t">
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
          <div className="pt-2 space-y-4 sm:space-y-5 md:space-y-6">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" onClick={closeMobileMenu}>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white bg-[#09b29d] hover:bg-[#09b29d]/90 rounded-full transition-colors font-semibold">
                    <User size={20} />
                    <span>Dashboard</span>
                  </button>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white bg-red-600 hover:bg-red-500 rounded-full transition-colors font-semibold"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={closeMobileMenu}>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 rounded-full transition-colors font-semibold">
                    <LogIn size={20} />
                    <span>Login</span>
                  </button>
                </Link>
                <Link href="/donate" onClick={closeMobileMenu}>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white bg-[#09b29d] hover:bg-[#09b29d]/90 rounded-full transition-colors font-semibold">
                    <HandCoinsIcon size={20} />
                    <span>Donate Now</span>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
