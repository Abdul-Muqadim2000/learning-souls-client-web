import QuranHero from "@/components/projects/QuranHero";
import EditionsShowcase from "@/components/projects/EditionsShowcase";
import ContentSection from "@/components/projects/ContentSection";

import FeatureList from "@/components/projects/FeatureList";
import Image from "next/image";

// Metadata for SEO
export const metadata = {
  title: "Quran Translation for All - Learning Souls",
  description:
    "Making Quran translation accessible to everyone with easy-to-understand editions for all ages and learning levels.",
  keywords: [
    "Quran",
    "Translation",
    "Islamic Education",
    "Holy Quran",
    "Learning",
  ],
  openGraph: {
    title: "Quran Translation for All - Learning Souls",
    description: "Making Quran translation accessible to everyone",
    type: "website",
  },
};

// Project Data - Centralized for maintainability
const projectData = {
  hero: {
    title: "Quran Translation For All",
  },
  banner: {
    title: "Translation of the Holy Quran",
    subtitle: "Easy To Understand For All",
    logoAlt: "Al-Mustafa Translation",
  },
  introduction: {
    text: `This project started in 2019 with the vision of making the Word of Allah (Quran) as easy to learn as possible. Our goal is to help readers understand the meaning of the Quran so they can read it fluently with comprehension. Initially, we translated some ayahs of the Quran in language suitable for 7-8 year old kids to help them understand the Kind Words of the Quran. This work involved years of translation, review, and a thorough verification process. We hope it will open the hearts of many Muslims and help people learn more about Islam, the Quran, and the Prophet who brought it to humankind.`,
  },
  editions: [
    {
      id: 1,
      title: "Gilt Edition",
      features: [
        "With rich Arabic text",
        "Awesome font for western kids",
        "Premium binding and cover prints",
        "Simple words and phrases",
      ],
      pattern: "gold",
    },
    {
      id: 2,
      title: "Main Edition",
      features: [
        "Arabic and English side by side",
        "Suitable for all readers",
        "Simple language for Kids",
        "Beautiful features and phrases",
      ],
      pattern: "blue",
    },
    {
      id: 3,
      title: "Revised Edition",
      features: [
        "Arabic text with translation",
        "Best for Kids who are learning",
        "Perfect for Quran recitation",
      ],
      pattern: "floral",
    },
    {
      id: 4,
      title: "Advanced Learners Edition",
      features: [
        "Arabic text with word by word meaning",
        "Advanced vocabulary support",
      ],
      pattern: "geometric",
    },
  ],
  purchaseInfo: {
    text: `Quran E Books will be available on this web site on all major platform Kindle, apple books and google books free of cost. We hope to get Paper Prints of all editions sponsored and subsidized to keep their purchase price to minimum. Any profits from this process will be used to support learning souls charity. We also aim to make a free for all  Al Mustafa Quran App with out any advertisements with following features:`,
  },
  features: [
    "Arabic Quran in both Arab and Indo-Pak fonts,",
    "Arabic Colour Tajweed as well as black.",
    "Option of word by word meaning",
    "Fluent English and Urdu translation in Active vice format",
    "Recitations of Renowned Qaris",
    "Recitation of children",
    "Tajweed / recitation help",
    "Renowned tafaseer to promote deeper understanding",
  ],

  editionsShowcase: {
    title: "Different Styles Of The Presentation For Different Type Of Readers",
    description:
      "This project started in 2013 with the intention that everyone can learn the meaning of the Quran as soon as they start to read Quran Ayah by Ayah. Initially we translated some Ayahs of the Quran in the language of  7-11 years old to help them understand the initial lessons of the Tajweed and later it extended to the complete Quran. We are not making people Alim through this translation but knowledgeable. Quran Translations has taken over 10 years and is in the final editing and verification process.  We hope it will open the hearts of many Muslims as well as non Muslims to learn more about Islam, Quran and the one who brought it to human kind.",
    editions: [
      {
        title: "God Edition",
        description:
          "With out Arabic. Suitable for western non Muslim readers. Names and places are in English",
        image: "/images/ucb1.webp",
      },
      {
        title: "Allah Edition",
        description:
          "Arabic and English in two columns Ayah by Ayah. Names and places are Arabic",
        image: "/images/ucb2.webp",
      },
      {
        title: "Tajweed Edition",
        description:
          "Allah Edition with Arabic in Colour tajweed Best for Kids who are learning to recite Quran",
        image: "/images/ucb4.webp",
      },
      {
        title: "Advanced Learners Edition",
        description:
          "Allah edition with word by word meaning in the Arabic section",
        image: "/images/ucb5.webp",
      },
    ],
  },
};

export default function QuranTranslationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Combined Hero + Banner */}
      <QuranHero
        title={projectData.hero.title}
        bannerTitle={projectData.banner.title}
        bannerSubtitle={projectData.banner.subtitle}
        heroImage="/images/quran-translationn.webp"
      />

      {/* Editions Showcase Section */}
      <EditionsShowcase
        title={projectData.editionsShowcase.title}
        description={projectData.editionsShowcase.description}
        editions={projectData.editionsShowcase.editions}
      />

      {/* Main Content - Different Styles Section */}

      {/* Purchase Information & Features Section */}
      <ContentSection className="relative bg-gray-100">
        <Image
          src="/images/white-bg1.jpg"
          alt="Background"
          fill
          priority
          className="object-cover "
        />

        <div className="absolute inset-0 bg-white/50"></div>
        <div className="relative max-w-6xl mx-auto">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
            {projectData.purchaseInfo.text}
          </p>

          {/* App Features List */}
          <FeatureList features={projectData.features} />

          <p className="text-gray-700 text-base mt-8 italic">
            If you would like to know more, email us a message through our
            contact form.
          </p>
        </div>
      </ContentSection>

      {/* Support Section - Donation Area */}
    </div>
  );
}
