"use client";
import QuranHero from "@/components/projects/QuranHero";
import ContentSection from "@/components/projects/ContentSection";
import FeatureList from "@/components/projects/FeatureList";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import the donation page to reuse its form
const DonatePage = dynamic(() => import("@/app/donate/page"), { ssr: false });
// Metadata for SEO
// export const metadata = {
//   title: "Translation of Hadith - Learning Souls",
//   description:
//     "Authentic Hadith translations made accessible and easy to understand for Muslims worldwide.",
//   keywords: [
//     "Hadith",
//     "Translation",
//     "Islamic Education",
//     "Sunnah",
//     "Learning",
//   ],
//   openGraph: {
//     title: "Translation of Hadith - Learning Souls",
//     description: "Authentic Hadith translations for all",
//     type: "website",
//   },
// };

// Project Data
const projectData = {
  hero: {
    title: "Translation of Hadith",
    bannerTitle:
      "Translations & Publication of 1.34 million Hadith of the Prophet PBUH in English and Urdu",
    // bannerSubtitle: "Authentic Translation for All",
  },
  whatWeDo: {
    title: "What we are doing?",
    paragraphs: [
      "Project initiated in 2016 with collection of Books of Hadith from original sources.",
      "We collected 60 books when by the grace of Almighty Allah, we learned about the collection of Parent books of Hadith in Arabic by University of Madinah Al Munawarah known as Maktabah Shamilah. 328 or so Parent books of hadith that make the basis of All hadith book source. Allah provided us with those books in 2018 in Arabic and we have compiled all these books in a data base to make the foundation of this project. Total number of hadith in all these books is approximately 1.34 million. There are repetitions with minor differences and same hadith have been narrated through multiple sources. Lots of Ahdith has been checked and graded. Original books writers and later scholars worked on the authenticity of these ahdith. Some are Authentic or sahih, Reliable or Hassan, some are Weak or Zaeef and Fabricated or Maudu (موضوع).",
    ],
    image: "/images/books-bg.webp",
  },
  translation: {
    title:
      "Translations & Publication of 1.34 million Hadith of the Prophet PBUH in English and Urdu",
    paragraphs: [
      "We are compiling this encyclopaedia for every level students and learner. Supported with a search engine anyone will be able to search Hadith on all major and minor topics. We want to publish all parents book of Hadith as encyclopaedia, available Free of cost to the humankind, translated in Urdu and English languages initially and later to extend this all languages. We aim to provide it in the web as well as an app in the coming years.",
      "To best of our knowledge only 282,000 hadith has been translated and published in Urdu. As for the other languages, less than 50,000 Ahdith has been translated and published in English and there is similar number of translated Ahdith in few other languages. Our team of Ulma has translated another 150,000 hadith in Urdu so far since the start of this project. We are hoping to publish them online as soon as possible. We would like to start English translation as well, but the project is expansive, and we are limited by resources.",
      "Through our campaigns we aim to raise funds to finish Urdu and English translations as phase 1 as soon as possible. In second phase we will extend it to Major 20 languages and in 3rd phase all languages or at least one Major language of every country of the World in sha Allah. Come and join us and make the knowledge of Hadith available to all humankind. We would love to introduce the teachings of our beloved prophet (PBUH) to every one on earth who wants to learn about him through his hadith.",
      "If you are interested to know further details of any aspect of this project, please email us your question with your contact details and we will try our best to answer you as soon as possible.",
    ],
  },
};

export default function TranslationOfHadithPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Combined Hero + Banner */}
      <QuranHero
        heroImage="/images/translation-hadith.webp"
        bannerTitle={projectData.hero.bannerTitle}
        bannerImage="/images/translation2.webp"
      />

      {/* What We Are Doing Section - Content Left, Image Right */}
      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left - Content */}
            <div>
              <h2
                className="font-bold mb-5 sm:mb-6 leading-tight"
                style={{
                  color: "var(--color-secondary)",
                  fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.5rem)",
                }}
              >
                {projectData.whatWeDo.title}
              </h2>
              <div className="space-y-4">
                {projectData.whatWeDo.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-gray-700 leading-relaxed text-justify"
                    style={{
                      fontSize: "clamp(0.9rem, 1.5vw + 0.25rem, 1.125rem)",
                      lineHeight: "1.7",
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative h-80 sm:h-96 md:h-full md:min-h-[400px] lg:min-h-[450px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/translation2.webp"
                alt="Hadith Books Collection"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Translation & Publication Section */}
      <ContentSection className="relative bg-gray-100">
        <Image
          src="/images/white-bg1.webp"
          alt="Background"
          fill
          priority
          className="object-cover "
        />

        <div className="absolute inset-0 bg-white/50"></div>

        <div className="relative max-w-6xl mx-auto">
          <h2
            className="font-bold mb-6 sm:mb-7 md:mb-8 text-center leading-tight"
            style={{
              color: "var(--color-tertiary)",
              fontSize: "clamp(1.5rem, 2.5vw + 0.5rem, 2rem)",
            }}
          >
            {projectData.translation.title}
          </h2>

          <div className="space-y-5 sm:space-y-6">
            {projectData.translation.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-500 leading-relaxed text-justify"
                style={{
                  fontSize: "clamp(0.85rem, 1.2vw + 0.2rem, 0.95rem)",
                  lineHeight: "1.7",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* Support Section - Donation Form */}
      <section className="w-full py-10 sm:py-12 md:py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-7 md:mb-8 text-center">
            <h2
              className="font-bold text-(--color-secondary) mb-3 sm:mb-4"
              style={{
                fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.5rem)",
              }}
            >
              Support This Project
            </h2>
            <p
              className="text-(--color-secondary) max-w-2xl mx-auto px-4"
              style={{
                fontSize: "clamp(0.9rem, 1.5vw + 0.25rem, 1.125rem)",
              }}
            >
              Your generous donation helps us make the Quran accessible to
              everyone.
            </p>
          </div>

          <DonatePage />
        </div>
      </section>
    </div>
  );
}
