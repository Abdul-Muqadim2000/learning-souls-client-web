import Link from "next/link";
import GenericHeader from "@/components/GenericHeader";
import CardList from "@/components/CardList";
import { cardListData } from "@/components/lib/cardListData";
import FullscreenHeader from "@/components/FullscreenHeader";

export const metadata = {
  title: "Our Projects - Learning Souls",
  description:
    "Explore our Islamic education projects including Quran translation, distribution programs, and Hadith translation initiatives.",
  keywords: [
    "Islamic Projects",
    "Quran",
    "Hadith",
    "Education",
    "Learning Souls",
  ],
};

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Title Section */}
      <FullscreenHeader
        headerText={"Our Projects"}
        headerTextSize={"clamp(2.5rem, 6vw + 0.5rem, 9rem)"}
        headerTextColor={"var(--color-secondary)"}
        showShapes={true}
        bgColor="var(--color-primary)"
        backgroundImage="/images/Asset-1.webp"
        height="auto"
        helperImage="/images/ucb1.webp"
        helperImage1="/images/ucb2.webp"
        helperImage2="/images/ucb3.webp"
        customImageMaxWidth="max-w-[300px] sm:max-w-[360px] md:max-w-md lg:max-w-lg xl:max-w-2xl"
      />

      {/* Visual Separator */}
      <div className="w-full bg-gradient-to-b from-white to-gray-50 py-4 sm:py-6"></div>

      {/* Cards Section */}
      <CardList cards={cardListData} showTitle={false} />
    </div>
  );
};

export default page;
