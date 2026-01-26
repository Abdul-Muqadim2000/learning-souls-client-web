import QuranHero from "@/components/projects/QuranHero";
import EditionsShowcase from "@/components/projects/EditionsShowcase";
import ContentSection from "@/components/projects/ContentSection";

import FeatureList from "@/components/projects/FeatureList";

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
      "This project started in 2019 with the vision of making the Word of Allah (Quran) as easy to learn as possible. Our goal is to help readers understand the meaning of the Quran so they can read it fluently with comprehension. We have created multiple editions to cater to different learning styles and age groups, ensuring that everyone can access and understand the Holy Quran in the best way suited for them.",
    editions: [
      {
        title: "Gilt Edition",
        description:
          "This premium edition features rich Arabic text with an awesome font specifically designed for western kids. It includes premium binding and cover prints with simple words and phrases that make it easy to understand for young readers.",
        image: "/images/product1.jpg",
      },
      {
        title: "Main Edition",
        description:
          "Our main edition presents Arabic and English side by side, making it suitable for all readers. It uses simple language perfect for kids while maintaining the beauty and eloquence of the original text with beautiful features and phrases.",
        image: "/images/product2.jpg",
      },
      {
        title: "Revised Edition",
        description:
          "The revised edition provides Arabic text with precise translation, making it best for kids who are learning to recite the Quran. This edition is perfect for Quran recitation practice and understanding the meanings simultaneously.",
        image: "/images/product3.jpg",
      },
      {
        title: "Advanced Learners Edition",
        description:
          "Designed for serious students, this edition features Arabic text with word-by-word meaning and advanced vocabulary support. It helps learners develop a deeper understanding of the Quranic language and its nuances.",
        image: "/images/books-bg.png",
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
      />

      {/* Editions Showcase Section */}
      <EditionsShowcase
        title={projectData.editionsShowcase.title}
        description={projectData.editionsShowcase.description}
        editions={projectData.editionsShowcase.editions}
      />

      {/* Main Content - Different Styles Section */}

      {/* Purchase Information & Features Section */}
      <ContentSection className="bg-gray-100">
        <div className="max-w-6xl mx-auto">
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
