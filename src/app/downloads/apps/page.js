import GenericHeader from "@/components/GenericHeader";
import FullscreenHeader from "@/components/FullscreenHeader";
import Image from "next/image";
import { SecondaryButton } from "@/components/ui/Button";

export const metadata = {
  title: "Apps - Learning Souls",
  description: "Download our mobile and desktop applications",
};

const appsData = [
  {
    id: 1,
    headerText: "Jummah Khutbah",
    subheaderText: "FREE FOREVER",
    listItems: [
      "Encourages understanding of the sermon",
      "Translations of the most recited Arabic Khutbah in 20 languages",
      "Helps everyone to lead Jummah Congregation all over the world",
    ],
    secondaryButtonText: "Coming Soon",
    secondaryButtonLink: "#",
    bgColor: "var(--color-primary)",
    headerTextColor: "var(--color-secondary)",
    textColor: "var(--color-tertiary)",
    backgroundImage: "/images/Asset-1.webp",
    helperImage: "/images/Khutbah-jumma.webp",
  },
  {
    id: 2,
    headerText: "Names of Allah",
    subheaderText: "Will Be Available as a Free App at Launch",
    listItems: [
      "99 names of Allah",
      "With illustrations for Children",
      "Additional 35 names of Allah from the Quran",
      "Allah's names translated into 20 languages",
    ],
    secondaryButtonText: "Coming Soon",
    secondaryButtonLink: "#",
    bgColor: "var(--color-secondary)",
    headerTextColor: "var(--color-primary)",
    textColor: "yellow",
    helperImage: "/images/Name-of-Allah.svg",
  },
  {
    id: 3,
    headerText: "Hadith e Nabvi (PBUH)",
    subheaderText: "Ahadith Arranged Topic-wise",
    helperText: "Free App and website",
    listItems: [
      "All Available authentication of Ahadith include",
      "Useful for both common readers and scholars",
      "Renowned collections of Hadith books Included",
      "All 328 Mother books of Hadith from Maktabah Shamila included",
      "(Phase 1) Arabic + English & Urdu Translations",
      "(Phase 2) 20 Major Languages Translations",
      "(Phase 3) Translation in all major languages of the world",
    ],
    secondaryButtonText: "Coming Soon",
    secondaryButtonLink: "#",
    bgColor: "var(--color-primary)",
    headerTextColor: "var(--color-secondary)",
    textColor: "var(--color-tertiary)",
    backgroundImage: "/images/Asset-1.webp",
    helperImage: "/images/project3.webp",
  },
  {
    id: 4,
    headerText: "Al Mustafa Quran",
    subheaderText: "Free App",
    listItems: [
      "Arabic Colour Tajweed",
      "Young reciters for children",
      "Option of word-by-word meaning",
      "Recitations of Renowned Qaris",
      "Personalised Tajweed and recitation help",
      "Arabic Quran in both Uthmanic and Indo-Pak fonts",
      "Renowned tafaseer to promote deeper understanding",
      "Fluent English and Urdu translation in an active voice format",
    ],
    secondaryButtonText: "Coming Soon",
    secondaryButtonLink: "#",
    bgColor: "var(--color-secondary)",
    headerTextColor: "var(--color-primary)",
    textColor: "yellow",
    helperImage: "/images/project2.webp",
  },
];

export default function Apps() {
  return (
    <>
      <GenericHeader
        title={"Apps"}
        height="huge"
        textColor={"var(--color-primary)"}
        bgColor={"var(--color-tertiary)"}
        textSize={"6rem"}
        image={"/images/about-us.webp"}
      />
      {appsData.map((app) => (
        <FullscreenHeader
          key={app.id}
          headerText={app.headerText}
          subheaderText={app.subheaderText}
          helperText={app.helperText}
          listItems={app.listItems}
          secondaryButtonText={app.secondaryButtonText}
          secondaryButtonLink={app.secondaryButtonLink}
          bgColor={app.bgColor}
          headerTextColor={app.headerTextColor}
          textColor={app.textColor}
          backgroundImage={app.backgroundImage}
          helperImage={app.helperImage}
          imageSize="scale-110 lg:scale-125"
          customImageHeight={800}
        />
      ))}

      {/* Our Sponsors Section */}
      <section
        className="w-full py-16 px-4 relative"
        style={{
          backgroundImage: "url(/images/Asset-1.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "white",
        }}
      >
        {/* White overlay for readability */}
        <div className="absolute inset-0 bg-white/30"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-center text-[#09b29d] mb-12 md:mb-16">
            OUR SPONSORS
          </h2>

          {/* Two Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-22 xl:gap-28">
            {/* Left Column */}
            <div className="flex flex-col items-center space-y-6">
              {/* Image */}
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src="/images/khushii-quran-stories.webp"
                  alt="Khushii Quran Stories"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
                Khushii Quran Stories
              </h3>

              {/* Unordered List */}
              <ul className="space-y-3 w-full text-[#bd2387] text-lg font-bold text-justify">
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>
                    Engaging stories from the Quran designed for children and
                    families
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>
                    Beautiful illustrations to bring Islamic teachings to life
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>Interactive learning experience for young minds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>
                    Available in multiple languages for global accessibility
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>
                    Audio narration to enhance storytelling experience
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>Educational content approved by Islamic scholars</span>
                </li>
              </ul>

              {/* Button */}
              <div className="pt-4">
                <SecondaryButton
                  as="a"
                  href="#"
                  text="Coming Soon"
                  className="px-8 py-3"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col items-center space-y-6">
              {/* Image */}
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src="/images/khushi.webp"
                  alt="Khushii Dua App"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
                Khushii Dua App
              </h3>

              {/* Unordered List */}
              <ul className="space-y-3 w-full text-[#bd2387] text-lg font-bold text-justify">
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>
                    Comprehensive collection of daily Islamic prayers and
                    supplications
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>
                    Easy-to-read Arabic text with transliteration and
                    translation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>
                    Audio recitations by renowned scholars for proper
                    pronunciation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>
                    Categorized duas for different occasions and needs
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>Bookmark and favorite your most-used prayers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>
                    Daily reminders to help maintain spiritual practices
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>Offline access to all content for convenience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>Share duas with family and friends easily</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>Regular updates with new content and features</span>
                </li>
              </ul>

              {/* Button */}
              <div className="pt-4">
                <SecondaryButton
                  as="a"
                  href="#"
                  text="Coming Soon"
                  className="px-8 py-3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
