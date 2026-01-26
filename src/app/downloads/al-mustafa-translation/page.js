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
        backgroundImage={"/images/al-mustafa-header.webp"}
      />
      <FullscreenHeader
        subheaderText={"AL-MUSTAFA QURAN TRANSLATION - ALLAH EDITION"}
        listItems={[
          "Arabic and English, side by side",
          "Names and places are in Arabic",
          "Suitable for all readers, universally accessible",
          "Designed to be understood in just one read",
        ]}
        textColor="var(--color-secondary)"
        bgColor="var(--color-primary)"
        primaryButtonText={"Coming Soon"}
        primaryButtonLink={"#"}
        // backgroundImage={"/images/al-mustafa-header.webp"}
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
        // backgroundImage={"/images/al-mustafa-header.webp"}
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
        textColor="var(--color-secondary)"
        bgColor="var(--color-primary)"
        primaryButtonText={"Coming Soon"}
        primaryButtonLink={"#"}
        // backgroundImage={"/images/al-mustafa-header.webp"}
      />
      <FullscreenHeader
        subheaderText={"AL-MUSTAFA QURAN TRANSLATION - EASY URDU TRANSLATION"}
        listItems={[
          "Urdu and Arabic, line by line",
          "Active voice Urdu sentences",
          "Word by word and full Ayah translations",
          "Easiest translation for Urdu readers",
        ]}
        textColor="var(--color-primary)"
        bgColor="var(--color-secondary)"
        secondaryButtonText={"Coming Soon"}
        secondaryButtonLink={"#"}
        // backgroundImage={"/images/al-mustafa-header.webp"}
      />

      {/* FAQ Section */}
      <section className="w-full py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <FAQAccordion faqs={faqData} />
        </div>
      </section>
    </>
  );
}
