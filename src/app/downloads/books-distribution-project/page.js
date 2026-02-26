"use client";
import Image from "next/image";
import Link from "next/link";
import ProductList from "@/components/ProductList";
import {
  BookOpen,
  Heart,
  Download,
  Sparkles,
  Award,
  Target,
} from "lucide-react";

export default function BooksDistributionProject() {
  return (
    <>
      {/* Premium Hero Section */}
      <section className="relative w-full min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Premium Background with Parallax */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Asset-1.webp"
            alt="Books Distribution Project"
            fill
            className="object-cover object-center opacity-30"
            priority
            quality={100}
          />
          {/* Premium Multi-layer Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#09b29d]/97 via-[#08a089]/95 to-[#07907b]/97"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          {/* Animated Decorative Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.07]">
            <div
              className="absolute inset-0 animate-pulse"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h20v20h-20zM40 40h20v20h-20zM70 10h20v20h-20zM10 70h20v20h-20z' fill='white' opacity='0.4'/%3E%3C/svg%3E")`,
                backgroundSize: "100px 100px",
              }}
            />
          </div>

          {/* Floating Light Orbs */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-300/15 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Premium Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center space-y-8">
            {/* Premium Badge with Animation */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-white/25 to-white/15 backdrop-blur-lg px-6 py-3 rounded-full border-2 border-white/40 shadow-2xl animate-fade-in-up">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span className="text-white font-bold text-sm uppercase tracking-widest">
                Free Islamic Knowledge
              </span>
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>

            {/* Premium Main Title with Glow Effect */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight">
                <span className="block animate-fade-in-up">Spreading the</span>
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl mt-2 animate-fade-in-up delay-100">
                  Light of Knowledge
                </span>
              </h1>

              <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto rounded-full animate-fade-in-up delay-200"></div>
            </div>

            {/* Premium Subtitle */}
            <p className="text-xl sm:text-2xl md:text-3xl text-white/95 max-w-5xl mx-auto leading-relaxed font-medium px-4 animate-fade-in-up delay-300">
              Empowering hearts and minds with authentic Islamic resources.
              <br className="hidden sm:block" />
              <span className="text-yellow-200 font-semibold">
                Free. Forever. For Everyone.
              </span>
            </p>

            {/* Premium Impact Stats - Glass Morphism Cards */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto pt-8 animate-fade-in-up delay-400">
              <div className="group bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-2xl hover:bg-white/20 hover:scale-105 transition-all duration-500 hover:shadow-yellow-500/20">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-7 h-7 text-gray-900" />
                  </div>
                </div>
                <div className="text-4xl font-black text-white mb-2 group-hover:text-yellow-300 transition-colors">
                  1000+
                </div>
                <div className="text-sm text-white/90 font-semibold uppercase tracking-wide">
                  Books Shared
                </div>
              </div>

              <div className="group bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-2xl hover:bg-white/20 hover:scale-105 transition-all duration-500 hover:shadow-yellow-500/20">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Download className="w-7 h-7 text-gray-900" />
                  </div>
                </div>
                <div className="text-4xl font-black text-white mb-2 group-hover:text-yellow-300 transition-colors">
                  5000+
                </div>
                <div className="text-sm text-white/90 font-semibold uppercase tracking-wide">
                  Downloads
                </div>
              </div>

              <div className="group bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-2xl hover:bg-white/20 hover:scale-105 transition-all duration-500 hover:shadow-yellow-500/20">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-7 h-7 text-gray-900" />
                  </div>
                </div>
                <div className="text-4xl font-black text-white mb-2 group-hover:text-yellow-300 transition-colors">
                  24/7
                </div>
                <div className="text-sm text-white/90 font-semibold uppercase tracking-wide">
                  Free Access
                </div>
              </div>

              <div className="group bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-2xl hover:bg-white/20 hover:scale-105 transition-all duration-500 hover:shadow-yellow-500/20">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-7 h-7 text-gray-900" />
                  </div>
                </div>
                <div className="text-4xl font-black text-white mb-2 group-hover:text-yellow-300 transition-colors">
                  Global
                </div>
                <div className="text-sm text-white/90 font-semibold uppercase tracking-wide">
                  Impact
                </div>
              </div>
            </div> */}

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8 animate-fade-in-up delay-500">
              <a
                href="#downloads"
                className="group relative inline-flex items-center gap-3 bg-white text-[#09b29d] px-10 py-5 rounded-full font-black text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <BookOpen className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">Explore Library</span>
              </a>

              <Link
                href="/donate"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-10 py-5 rounded-full font-black text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Heart className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10">Support Mission</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Premium Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            className="w-full h-20 md:h-32 text-gray-50"
            preserveAspectRatio="none"
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* Downloads Section with Smooth Scroll */}
      <div id="downloads" className="scroll-mt-20 bg-gray-50">
        <ProductList title={"FREE BOOK DOWNLOADS"} />
      </div>

      {/* Premium Sadaqah Jariyah Section */}
      <section className="relative bg-gradient-to-br from-[#b01e7e] via-[#bd2387] to-[#c82890] py-12 md:py-16 overflow-hidden">
        {/* Premium Decorative Elements */}
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='60' cy='60' r='4' fill='white'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center mb-0">
            {/* Premium Left Content */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-lg px-5 py-3 rounded-full border border-white/40 shadow-xl">
                <Heart className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-bold text-sm uppercase tracking-wide">
                  Endless Rewards
                </span>
              </div>

              {/* Title */}
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight">
                Be a Part of
                <br />
                <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  Sadaqah Jāriyah
                </span>
              </h2>

              {/* Description */}
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed font-medium">
                Transform lives through the gift of knowledge. Your contribution
                creates a ripple effect of continuous blessings.
              </p>

              {/* Premium Benefits List */}
              <div className="space-y-4">
                {[
                  { icon: Target, text: "Continuous rewards that never cease" },
                  {
                    icon: Heart,
                    text: "Touch countless hearts with Islamic wisdom",
                  },
                  {
                    icon: Sparkles,
                    text: "Build your legacy of beneficial knowledge",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-2.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                      <item.icon className="w-5 h-5 text-gray-900" />
                    </div>
                    <p className="text-white/95 text-lg font-semibold leading-relaxed pt-1">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Premium CTA Button */}
              <Link
                href="/donate"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-12 py-6 rounded-full font-black text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Heart className="w-7 h-7 relative z-10 group-hover:scale-125 transition-transform duration-300" />
                <span className="relative z-10">Donate Now</span>
              </Link>
            </div>

            {/* Premium Right Image Card */}
            <div className="relative">
              {/* Main Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 transform hover:scale-105 transition-transform duration-700 group">
                <Image
                  src="/images/Asset-1.webp"
                  alt="Sadaqah Jariyah - Continuous Charity"
                  width={700}
                  height={700}
                  className="w-full h-auto"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent group-hover:from-purple-900/70 transition-all duration-500"></div>

                {/* Enhanced Overlay Card with Hadith - Centered */}
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 text-white">
                  {/* Decorative Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='2' fill='white'/%3E%3C/svg%3E")`,
                        backgroundSize: "40px 40px",
                      }}
                    />
                  </div>

                  <div className="relative bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-white/40 shadow-2xl space-y-3 sm:space-y-4 max-w-xl w-full">
                    {/* Header with Icon */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 p-2 sm:p-2.5 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-base sm:text-lg md:text-xl font-black text-white truncate">
                          Join Our Mission
                        </p>
                        <p className="text-[11px] sm:text-xs text-white/80 truncate">
                          Together, illuminating the world
                        </p>
                      </div>
                    </div>

                    {/* Hadith Quote */}
                    <div className="space-y-2 sm:space-y-2 pl-2 sm:pl-3 border-l-2 sm:border-l-4 border-yellow-300/50">
                      {/* Quote Mark */}
                      <div className="text-yellow-300 text-2xl sm:text-3xl font-serif leading-none opacity-60">
                        &ldquo;
                      </div>

                      {/* Hadith Text */}
                      <p className="text-white/95 text-xs sm:text-sm md:text-base font-semibold leading-relaxed -mt-2 sm:-mt-4 italic">
                        When a person dies, all their deeds end except three: a
                        continuing charity, beneficial knowledge, and a
                        righteous child who prays for them.
                      </p>

                      {/* Attribution */}
                      <div className="flex items-center gap-2 pt-1">
                        <div className="w-8 sm:w-10 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent flex-shrink-0"></div>
                        <p className="text-yellow-300 font-black text-[11px] sm:text-xs tracking-wide">
                          Prophet Muhammad ﷺ
                        </p>
                      </div>

                      {/* Source */}
                      <p className="text-white/50 text-[11px] sm:text-xs italic">
                        Sahih Muslim
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400/30 rounded-full blur-2xl animate-pulse hidden lg:block"></div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl animate-pulse delay-500 hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
}
