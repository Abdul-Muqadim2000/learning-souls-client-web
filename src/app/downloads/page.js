import CardList from "@/components/CardList";
import GenericHeader from "@/components/GenericHeader";

export const metadata = {
  title: "Downloads - Learning Souls",
  description: "Download our books, translations, and mobile applications",
};

const downloadCardsData = [
  {
    id: 1,
    bgImage: "/images/project1.webp",
    title: "Books Distribution Project",
    description:
      "Access our comprehensive collection of books for distribution. Download educational and Islamic literature.",
    buttonText: "View Downloads",
    buttonLink: "/downloads/books-distribution-project",
    gradientValue: "from-[#2563eb] to-[#3b82f6]",
  },
  {
    id: 2,
    bgImage: "/images/project2.webp",
    title: "Al-Mustafa Translation",
    description:
      "Download translations of Islamic texts and scholarly works with accurate and reliable translations.",
    buttonText: "View Downloads",
    buttonLink: "/downloads/al-mustafa-translation",
    gradientValue: "from-[#059669] to-[#10b981]",
  },
  {
    id: 3,
    bgImage: "/images/project3.webp",
    title: "Apps",
    description:
      "Download our mobile and desktop applications designed to enhance your learning experience.",
    buttonText: "View Downloads",
    buttonLink: "/downloads/apps",
    gradientValue: "from-[#9333ea] to-[#a855f7]",
  },
];

const page = () => {
  return (
    <>
      {/* Title Section */}
      <GenericHeader
        title="Downloads"
        bgColor={"var(--color-secondary)"}
        textColor={"var(--color-primary)"}
        height="xxl"
        image="/images/downloads-bg.webp"
        overlay={true}
      />

      {/* Cards Section */}
      <CardList cards={downloadCardsData} showTitle={false} />
    </>
  );
};

export default page;
