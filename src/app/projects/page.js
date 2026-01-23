import CardList from "@/components/CardList";
import { cardListData } from "@/components/lib/cardListData";
import GenericHeader from "@/components/GenericHeader";

const page = () => {
  return (
    <>
      {/* Title Section */}
      <GenericHeader title="Our Projects" bgColor={"var(--color-tertiary)"} textColor={"var(--color-primary)"} />

      {/* Cards Section */}
      <CardList cards={cardListData} />
    </>
  );
};

export default page;
