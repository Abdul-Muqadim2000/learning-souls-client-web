import GenericHeader from "@/components/GenericHeader";
import FullscreenHeader from "@/components/FullscreenHeader";

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
        />
      ))}
    </>
  );
}
