"use client";
import Link from "next/link";
import CarouselSlider from "@/components/CarouselSlider";
import FullscreenHeader from "@/components/FullscreenHeader";
import { FAQAccordion } from "@/components/ui/Accordion";
import { BookOpen, Sparkles, Globe } from "lucide-react";

const faqData = [
  {
    question: "IS THIS A RELIGIOUS BOOK?",
    answer:
      "YES, BUT THIS TRANSLATION AVOIDS RELIGIOUS PERSUASION. IT LETS YOU EXPLORE THE QURAN ON YOUR OWN TERMS.",
  },
  {
    question: "IS THIS BASED ON A SPECIFIC SCHOOL OF THOUGHT?",
    answer:
      "NO. THIS VERSION DOES NOT FOLLOW SECTARIAN VIEWS. IT'S DESIGNED TO BE UNIVERSAL.",
  },
  {
    question: "CAN I SHARE THIS WITH OTHERS?",
    answer: "YES. YOU CAN DOWNLOAD, SHARE, PRINT — WITHOUT ASKING PERMISSION.",
  },
];
const upcomingBooksItems = [
  {
    image: "/images/ucb1.png",
    heading: "Coming Soon",
  },
  {
    image: "/images/ucb2.png",
    heading: "Coming Soon",
  },
  {
    image: "/images/ucb3.png",
    heading: "Coming Soon",
  },
  {
    image: "/images/ucb4.png",
    heading: "Coming Soon",
  },
  {
    image: "/images/ucb5.png",
    heading: "Coming Soon",
  },
  {
    image: "/images/ucb6.png",
    heading: "Coming Soon",
  },
  {
    image: "/images/ucb7.png",
    heading: "Coming Soon",
  },
];
export default function AlMustafaTranslation() {
  return (
    <>
      {/* Premium Hero Section */}
      <section className="relative w-full min-h-[50vh] md:min-h-[55vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Premium Background with Parallax */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/al-mustafa-hero.jpg')] bg-cover bg-center opacity-30"></div>

          {/* Premium Multi-layer Gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-[#09b29d]/97 via-[#08a089]/95 to-[#07907b]/97"></div>
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>

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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center space-y-6">
            {/* Premium Badge with Animation */}
            <div className="inline-flex items-center gap-3 bg-linear-to-r from-white/25 to-white/15 backdrop-blur-lg px-6 py-3 rounded-full border-2 border-white/40 shadow-2xl animate-fade-in-up">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span className="text-white font-bold text-sm uppercase tracking-widest">
                Universal Translation
              </span>
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>

            {/* Premium Main Title with Glow Effect */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight">
                <span className="block animate-fade-in-up">THE QURAN FOR</span>
                <span className="block bg-linear-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl mt-2 animate-fade-in-up delay-100">
                  EVERYONE
                </span>
              </h1>

              <div className="w-24 h-1.5 bg-linear-to-r from-transparent via-yellow-400 to-transparent mx-auto rounded-full animate-fade-in-up delay-200"></div>
            </div>

            {/* Premium Subtitle */}
            <p className="text-2xl sm:text-3xl md:text-4xl text-yellow-300 font-bold max-w-5xl mx-auto leading-relaxed px-4 animate-fade-in-up delay-300">
              Al-Mustafa Translation Series
            </p>

            {/* Description */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed font-medium px-4 animate-fade-in-up delay-400">
              A groundbreaking translation designed for universal understanding.
              <br className="hidden sm:block" />
              <span className="text-yellow-200">
                Clear, accessible, and faithful to the original meaning
              </span>
              —crafted for both Muslims and seekers of truth.
            </p>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 animate-fade-in-up delay-500">
              <Link
                href="#editions"
                className="group relative px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105 overflow-hidden min-w-50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Explore Editions
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                href="#faqs"
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-lg border-2 border-white/40 text-white font-bold text-lg rounded-full shadow-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 min-w-50"
              >
                <span className="flex items-center justify-center gap-2">
                  <Globe className="w-5 h-5" />
                  Learn More
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="editions">
        <FullscreenHeader
          headerText={"AL MUSTAFA QURAN TRANSLATION"}
          headerTextColor={"yellow"}
          subheaderText={"AL-MUSTAFA QURAN TRANSLATION - GOD EDITION"}
          listItems={[
            "Plain English Text. Names and places are in English.",
            "Easiest translation to understand in one read.",
            "Easy to read for both Muslim and non-Muslim readers",
          ]}
          textColor="var(--color-primary)"
          secondaryButtonText={"Coming Soon"}
          secondaryButtonLink={"#"}
          textAlign="text-left"
          // backgroundImage={"/images/al-mustafa1.webp"}
          helperImage={"/images/ucb3.png"}
        />
        <FullscreenHeader
          subheaderText={"AL-MUSTAFA QURAN TRANSLATION - ALLAH EDITION"}
          listItems={[
            "Arabic and English, side by side",
            "Names and places are in Arabic",
            "Suitable for all readers, universally accessible",
            "Designed to be understood in just one read",
          ]}
          listItemsColor="var(--color-tertiary)"
          listItemsFontSize="clamp(1rem, 2vw, 1.25rem)"
          listItemsBold={true}
          textColor="var(--color-secondary)"
          bgColor="var(--color-primary)"
          primaryButtonText={"Coming Soon"}
          primaryButtonLink={"#"}
          textAlign="text-left"
          backgroundImage={"/images/Asset-1.webp"}
          helperImage={"/images/ucb4.png"}
        />
        <FullscreenHeader
          subheaderText={"AL-MUSTAFA QURAN TRANSLATION - TAJWEED EDITION"}
          listItems={[
            "Arabic text with Colour Tajweed",
            "Designed with children in mind",
            "Arabic and English, side by side",
            "Easiest edition for learners and reciters",
            "Ideal for those who are learning to recite the Quran",
          ]}
          textColor="var(--color-primary)"
          bgColor="var(--color-secondary)"
          secondaryButtonText={"Coming Soon"}
          secondaryButtonLink={"#"}
          textAlign="text-left"
          helperImage={"/images/ucb2.png"}
        />
        <FullscreenHeader
          subheaderText={
            "AL-MUSTAFA QURAN TRANSLATION - ADVANCED LEARNERS EDITION"
          }
          listItems={[
            "Arabic and English, side by side",
            "Names and places are in Arabic.",
            "Arabic text with word-by-word translations.",
            "Designed for readers seeking a deeper translation of the Quran",
          ]}
          listItemsColor="var(--color-tertiary)"
          listItemsFontSize="clamp(1rem, 2vw, 1.25rem)"
          listItemsBold={true}
          textColor="var(--color-secondary)"
          bgColor="var(--color-primary)"
          primaryButtonText={"Coming Soon"}
          primaryButtonLink={"#"}
          textAlign="text-left"
          backgroundImage={"/images/Asset-1.webp"}
          helperImage={"/images/ucb6.png"}
        />
        <FullscreenHeader
          subheaderText={"AL-MUSTAFA QURAN TRANSLATION - EASY URDU TRANSLATION"}
          listItems={[
            "Urdu and Arabic, line by line",
            "Active voice Urdu sentences",
            "Word by word and full Ayah translations",
            "Easiest translation for Urdu readers",
          ]}
          helperImage={"/images/ucb1.png"}
          bgColor="var(--color-secondary)"
          secondaryButtonText={"Coming Soon"}
          secondaryButtonLink={"#"}
          textAlign="text-left"
          // backgroundImage={"/images/Asset-1.webp"}
        />
        <FullscreenHeader
          subheaderText={"Advanced Learner Edition (Indo Pak Style Arabic)"}
          listItems={[
            "Indo-Pak style Arabic script",
            "Word-by-word meanings in the Arabic section",
            "Names and places are in Arabic",
            "Designed for readers familiar with Indo-Pak Quranic script",
            "Enhanced learning features for deeper understanding",
          ]}
          listItemsColor="var(--color-tertiary)"
          listItemsFontSize="clamp(1rem, 2vw, 1.25rem)"
          listItemsBold={true}
          textColor="var(--color-secondary)"
          helperImage={"/images/ucb7.png"}
          bgColor="var(--color-primary)"
          secondaryButtonText={"Coming Soon"}
          secondaryButtonLink={"#"}
          textAlign="text-left"
          backgroundImage={"/images/Asset-1.webp"}
        />
        <FullscreenHeader
          subheaderText={"Allah Edition (Indo Pak style Arabic)"}
          listItems={[
            "Indo-Pak style Arabic script",
            "Arabic and English in two columns, Ayah by Ayah",
            "Names and places are in Arabic",
            "Familiar script style for South Asian readers",
            "Clear and accessible translation",
          ]}
          textColor="var(--color-primary)"
          helperImage={"/images/ucb5.png"}
          bgColor="var(--color-secondary)"
          secondaryButtonText={"Coming Soon"}
          secondaryButtonLink={"#"}
          textAlign="text-left"
          // backgroundImage={"/images/Asset-1.webp"}
        />
      </section>

      <CarouselSlider
        items={upcomingBooksItems}
        title="EACH EDITION BRINGS A DIFFERENT LENS (COMING SOON)"
        bgColor="var(--color-tertiary)"
        bgImage="/images/books-bg.webp"
        textColor="white"
      />
      {/* FAQ Section */}
      <section
        id="faqs"
        className="w-full py-8 px-4 sm:py-12 md:py-16 bg-gray-50 overflow-x-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <FAQAccordion faqs={faqData} />
        </div>
      </section>
    </>
  );
}
