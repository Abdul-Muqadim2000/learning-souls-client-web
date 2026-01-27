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
    <div className="min-h-screen bg-gray-50">
      {/* Title Section */}
      <FullscreenHeader
        headerText={"Our Projects"}
        headerTextSize={"9rem"}
        backgroundImage="/images/books-bg.webp"
        height="60vh"
        helperImage={"/images/ucb1.webp"}
      />
      {/* Cards Section */}
      <CardList cards={cardListData} showTitle={false} />
    </div>
  );
};

export default page;
