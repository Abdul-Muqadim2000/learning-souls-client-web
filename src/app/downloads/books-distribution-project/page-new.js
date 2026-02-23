"use client";
import Image from "next/image";
import Link from "next/link";
import ProductList from "@/components/ProductList";
import { BookOpen, Heart } from "lucide-react";

export default function BooksDistributionProject() {
  return (
    <>
      {/* Modern Hero Section with Background Image */}
      <section className="relative w-full min-h-[55vh] md:min-h-[65vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Asset-1.webp"
            alt="Books Distribution"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Modern Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#09b29d]/95 via-[#09b29d]/85 to-teal-600/90"></div>

          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20h8v8h-8zM40 40h8v8h-8zM60 20h8v8h-8z' fill='white' opacity='0.3'/%3E%3C/svg%3E")`,
                backgroundSize: "80px 80px",
              }}
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            {/* Decorative Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
              <BookOpen className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-semibold text-sm uppercase tracking-wide">
                Free Islamic Resources
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Spreading the Light of
              <br />
              <span className="text-yellow-300 drop-shadow-lg">
                Islamic Knowledge
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-4xl mx-auto mb-10 leading-relaxed font-medium">
              At Learning Soul, we aim to make authentic Islamic knowledge
              accessible to all. Explore, learn, and share these free resources
              to benefit yourself and others.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col xs:flex-row gap-4 justify-center items-center">
              <a
                href="#downloads"
                className="group inline-flex items-center gap-2 bg-white text-[#09b29d] px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Browse Downloads
              </a>
              <Link
                href="/donate"
                className="group inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Support Our Mission
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            className="w-full h-16 md:h-24 text-gray-50"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* Free Book Downloads Section */}
      <div id="downloads" className="scroll-mt-20">
        <ProductList title={"FREE BOOK DOWNLOADS"} />
      </div>

      {/* Sadaqah Jariyah Section - Modern Design */}
      <section className="relative bg-gradient-to-br from-[#bd2387] via-[#bd2387] to-purple-700 py-20 md:py-28 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='3' fill='white'/%3E%3C/svg%3E")`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
                <Heart className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-semibold text-sm uppercase tracking-wide">
                  Support Our Cause
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                Be a Part of
                <br />
                <span className="text-yellow-300">Sadaqah Jāriyah</span>
              </h2>

              <p className="text-lg md:text-xl text-white/95 mb-8 leading-relaxed">
                Sharing Islamic knowledge is a noble act and a means of
                continuous reward. Support our efforts to distribute free
                Islamic books by donating, volunteering, or spreading the word.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-300 rounded-full p-1.5 mt-1">
                    <svg
                      className="w-4 h-4 text-gray-900"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-white/90 text-lg">
                    Continuous rewards even after you pass away
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-300 rounded-full p-1.5 mt-1">
                    <svg
                      className="w-4 h-4 text-gray-900"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-white/90 text-lg">
                    Reach more hearts with the message of Islam
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-300 rounded-full p-1.5 mt-1">
                    <svg
                      className="w-4 h-4 text-gray-900"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-white/90 text-lg">
                    Make knowledge accessible to everyone
                  </p>
                </div>
              </div>

              <Link
                href="/donate"
                className="group inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              >
                <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Donate Now
              </Link>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/images/Asset-1.webp"
                  alt="Sadaqah Jariyah"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
              </div>

              {/* Floating Quote Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl max-w-sm hidden md:block">
                <p className="text-gray-800 font-semibold text-sm mb-2">
                  &quot;When a person dies, all their deeds end except three: a
                  continuing charity, beneficial knowledge, and a child who
                  prays for them.&quot;
                </p>
                <p className="text-[#09b29d] font-bold text-xs">
                  - Prophet Muhammad ﷺ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
