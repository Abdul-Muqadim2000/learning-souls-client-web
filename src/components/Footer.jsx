import Image from "next/image";
import { MapPin, Phone, Mail, MailIcon } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-(--color-secondary) text-(--color-primary) py-8 sm:py-12 lg:py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-8 lg:mb-12">
          {/* Column 1: Logo & Contact Info */}
          <div className="text-center md:text-left">
            <div className="mb-6 flex justify-center md:justify-start">
              <Image
                src="/images/logo.webp"
                alt="Learning Souls Logo"
                width={120}
                height={120}
                className="w-24 sm:w-28 lg:w-32 h-auto"
                priority
              />
            </div>

            <h3 className="text-(--color-tertiary) font-bold text-xl sm:text-2xl mb-4">
              Contact Info
            </h3>

            <ul className="space-y-3 text-sm sm:text-base">
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <MapPin
                  size={18}
                  className="text-(--color-primary) mt-1 flex-shrink-0"
                />
                <span className="text-left">22 Bahram Road, Doncaster, UK</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Phone
                  size={18}
                  className="text-(--color-primary) flex-shrink-0"
                />
                <span>+44 7743 055012</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Mail
                  size={18}
                  className="text-(--color-primary) flex-shrink-0"
                />
                <span className="break-all">admin@learningsouls.org</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Mission Statement */}
          <div className="flex items-center">
            <p className="text-sm sm:text-base leading-relaxed lg:leading-loose text-center md:text-justify md:mr-14">
              At Learning Souls, we are dedicated to spreading knowledge and
              hope through the distribution of Islamic books. Our mission is to
              provide spiritual and educational resources, offering comfort and
              inspiration to those in need. By sharing the wisdom and teachings
              of Islam, we aim to uplift hearts, nurture minds, and foster a
              sense of peace and understanding. Join us in our journey to
              enlighten and support individuals through the power of knowledge.
            </p>
          </div>

          {/* Column 3: Partners & App Links */}
          <div className="text-center">
            {/* Top Certification Logos */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
              <Image
                src="/images/footer-fundrasing.svg"
                alt="Fundraising Regulator"
                width={180}
                height={80}
                className="h-10 sm:h-12 lg:h-14 w-auto"
              />
              <Image
                src="/images/footer-charity.webp"
                alt="Charity Commission"
                width={180}
                height={80}
                className="h-10 sm:h-12 lg:h-16 w-auto"
              />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold mb-4">Our Partners</h3>

            <div className="flex justify-center mb-6">
              <Image
                src="/images/footer-kids.webp"
                alt="Khushi Kidz Partner"
                width={180}
                height={60}
                className="h-12 sm:h-16 lg:h-18 w-auto hover-pulse cursor-pointer"
              />
            </div>

            {/* App Download Links */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
              <a
                href="#"
                className="block hover:opacity-90 transition-opacity duration-200 hover-pulse"
                aria-label="Download on the App Store"
              >
                <Image
                  src="/images/app-store.webp"
                  alt="Download on the App Store"
                  width={200}
                  height={60}
                  className="w-36 sm:w-40 h-auto cursor-pointer"
                />
              </a>
              <a
                href="#"
                className="block hover:opacity-90 transition-opacity duration-200 hover-pulse"
                aria-label="Get it on Google Play"
              >
                <Image
                  src="/images/google-play.webp"
                  alt="Get it on Google Play"
                  width={200}
                  height={60}
                  className="w-36 sm:w-40 h-auto cursor-pointer"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-(--color-primary)/20 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-2 sm:gap-4">
            <p className="text-center sm:text-left">
              © {currentYear} Learning Souls <span className="ml-6">|</span>
              <a href="mailto:admin@learningsouls.org" className="ml-6">
                <MailIcon className="inline-block mr-1" size={14} />{" "}
                admin@learningsouls.org
              </a>
            </p>
            <p className="text-center sm:text-right">
              REGISTERED CHARITY NUMBER: 1211998
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
