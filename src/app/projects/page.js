import CardList from "@/components/CardList";
import { cardListData } from "@/components/lib/cardListData";
import GenaricHeader from "@/components/GenaricHeader";

const page = () => {
  return (
    <>
      {/* Title Section */}
      <GenaricHeader title="Our Projects" />

      {/* Cards Section */}
      <CardList cards={cardListData} />
    </>
  );
};

export default page;
