import CardList from "@/components/CardList";
import { cardListData } from "@/components/lib/cardListData";
import Hero from "@/components/Hero";
import ImageContentSection from "@/components/ImageContentSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <CardList cards={cardListData} title="Our Projects" />
      <ImageContentSection />
    </main>
  );
}
