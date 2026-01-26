import Link from "next/link";
import GenericHeader from "@/components/GenericHeader";
import CardList from "@/components/CardList";
import { cardListData } from "@/components/lib/cardListData";

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
      <GenericHeader
        title="Our Projects"
        bgColor={"var(--color-tertiary)"}
        textColor={"var(--color-primary)"}
        height="2xl"
        image="/images/books-bg.png"
      />

      {/* Cards Section */}
      <CardList cards={cardListData} showTitle={false} />
    </div>
  );
};

export default page;
