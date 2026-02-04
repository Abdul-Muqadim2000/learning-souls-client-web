import CarouselSlider from "@/components/CarouselSlider";
import FullscreenHeader from "@/components/FullscreenHeader";
import { FAQAccordion } from "@/components/ui/Accordion";

export const metadata = {
  title: "Al-Mustafa Translation - Learning Souls",
  description: "Download translations of Islamic texts and scholarly works",
};

const faqData = [
  {
    question: "IS THIS A RELIGIOUS BOOK?",
    answer:
      "YES, BUT THIS TRANSLATION AVOIDS RELIGIOUS PERSUASION. IT LETS YOU EXPLORE THE QURAN ON YOUR OWN TERMS.",
  },
  {
    question: "IS THIS BASED ON A SPECIFIC SCHOOL OF THOUGHT?",
    answer:
      "NO. THIS VERSION DOES NOT FOLLOW SECTARIAN VIEWS. IT'S DESIGNED TO BE UNIVERSAL.",
  },
  {
    question: "CAN I SHARE THIS WITH OTHERS?",
    answer: "YES. YOU CAN DOWNLOAD, SHARE, PRINT — WITHOUT ASKING PERMISSION.",
  },
];
const upcomingBooksItems = [
  {
    image: "/images/ucb1.png",
    heading: "Coming Soon",
  },
  {
    image: "/images/ucb2.png",
    heading: "Coming Soon",
  },
  {
    image: "/images/ucb3.png",
    heading: "Coming Soon",
  },
  {
    image: "/images/ucb4.png",
    heading: "Coming Soon",
  },
  {
    image: "/images/ucb5.png",
    heading: "Coming Soon",
  },
  {
    image: "/images/ucb6.png",
    heading: "Coming Soon",
  },
  {
    image: "/images/ucb7.png",
    heading: "Coming Soon",
  },
];
export default function AlMustafaTranslation() {
  return (
    <>
      <FullscreenHeader
        headerText={"AL MUSTAFA QURAN TRANSLATION"}
        headerTextColor={"yellow"}
        subheaderText={"AL-MUSTAFA QURAN TRANSLATION - GOD EDITION"}
        listItems={[
          "Plain English Text. Names and places are in English.",
          "Easiest translation to understand in one read.",
          "Easy to read for both Muslim and non-Muslim readers",
        ]}
        textColor="var(--color-primary)"
        secondaryButtonText={"Coming Soon"}
        secondaryButtonLink={"#"}
        backgroundImage={"/images/al-mustafa1.webp"}
      />
      <FullscreenHeader
        subheaderText={"AL-MUSTAFA QURAN TRANSLATION - ALLAH EDITION"}
        listItems={[
          "Arabic and English, side by side",
          "Names and places are in Arabic",
          "Suitable for all readers, universally accessible",
          "Designed to be understood in just one read",
        ]}
        listItemsColor="var(--color-tertiary)"
        listItemsFontSize="clamp(1rem, 2vw, 1.25rem)"
        listItemsBold={true}
        textColor="var(--color-secondary)"
        bgColor="var(--color-primary)"
        primaryButtonText={"Coming Soon"}
        primaryButtonLink={"#"}
        backgroundImage={"/images/Asset-1.webp"}
        helperImage={"/images/ucb2.webp"}
      />
      <FullscreenHeader
        subheaderText={"AL-MUSTAFA QURAN TRANSLATION - TAJWEED EDITION"}
        listItems={[
          "Arabic text with Colour Tajweed",
          "Designed with children in mind",
          "Arabic and English, side by side",
          "Easiest edition for learners and reciters",
          "Ideal for those who are learning to recite the Quran",
        ]}
        textColor="var(--color-primary)"
        bgColor="var(--color-secondary)"
        secondaryButtonText={"Coming Soon"}
        secondaryButtonLink={"#"}
        helperImage={"/images/ucb4.webp"}
      />
      <FullscreenHeader
        subheaderText={
          "AL-MUSTAFA QURAN TRANSLATION - ADVANCED LEARNERS EDITION"
        }
        listItems={[
          "Arabic and English, side by side",
          "Names and places are in Arabic.",
          "Arabic text with word-by-word translations.",
          "Designed for readers seeking a deeper translation of the Quran",
        ]}
        listItemsColor="var(--color-tertiary)"
        listItemsFontSize="clamp(1rem, 2vw, 1.25rem)"
        listItemsBold={true}
        textColor="var(--color-secondary)"
        bgColor="var(--color-primary)"
        primaryButtonText={"Coming Soon"}
        primaryButtonLink={"#"}
        backgroundImage={"/images/Asset-1.webp"}
        helperImage={"/images/ucb5.webp"}
      />
      <FullscreenHeader
        subheaderText={"AL-MUSTAFA QURAN TRANSLATION - EASY URDU TRANSLATION"}
        listItems={[
          "Urdu and Arabic, line by line",
          "Active voice Urdu sentences",
          "Word by word and full Ayah translations",
          "Easiest translation for Urdu readers",
        ]}
        helperImage={"/images/ucb3.webp"}
        bgColor="var(--color-secondary)"
        secondaryButtonText={"Coming Soon"}
        secondaryButtonLink={"#"}
        // backgroundImage={"/images/Asset-1.webp"}
      />

      <CarouselSlider
        items={upcomingBooksItems}
        title="EACH EDITION BRINGS A DIFFERENT LENS (COMING SOON)"
        bgColor="var(--color-tertiary)"
        bgImage="/images/books-bg.webp"
        textColor="white"
      />
      {/* FAQ Section */}
      <section className="w-full py-8 px-4 sm:py-12 md:py-16 bg-gray-50 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <FAQAccordion faqs={faqData} />
        </div>
      </section>
    </>
  );
}
