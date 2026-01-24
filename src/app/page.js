import CardList from "@/components/CardList";
import { cardListData } from "@/components/lib/cardListData";
import Hero from "@/components/Hero";
import ImageContentSection from "@/components/ImageContentSection";
import Support from "@/components/Support";
import CarouselSlider from "@/components/CarouselSlider";
import TeamCarousel from "@/components/TeamCarousal";
import ProductList from "@/components/ProductList";

export default function Home() {
  const carouselItems = [
    {
      image: "/images/gallery-img1.jpg",
    },
    {
      image: "/images/gallery-img2.jpg",
    },
    {
      image: "/images/gallery-img3.jpg",
    },
    {
      image: "/images/gallery-img4.jpg",
    },
    {
      image: "/images/gallery-img5.jpg",
    },
    {
      image: "/images/gallery-img6.jpg",
    },
    {
      image: "/images/gallery-img7.jpg",
    },
    {
      image: "/images/gallery-img8.jpg",
    },
    {
      image: "/images/gallery-img9.jpg",
    },
    {
      image: "/images/gallery-img10.jpg",
    },
    {
      image: "/images/gallery-img11.jpg",
    },
    {
      image: "/images/gallery-img12.jpg",
    },
  ];

  return (
    <main>
      <Hero />
      <CardList cards={cardListData} title="Our Projects" />

      <ImageContentSection
        showProfile={true}
        profileImage="/images/profile-pic.jpg"
        profileName="Dr Ghazanfar Shah"
        qualification="FRCEM, Masters in Islamic Studies"
        signatureImage="/images/signature.png"
      />
      <Support />
      <CarouselSlider items={carouselItems} title="Our Projects" />
      <TeamCarousel
        teamMembers={[
          {
            name: "Mr. Nauman Safdar",
            role: "Software Engineer & Database Specialist",
            image: "/images/dummy-person.webp",
          },
          {
            name: "Mr. Shah Zaman",
            role: "App Developer",
            image: "/images/dummy-person.webp",
          },
          {
            name: "Mr. Zurain Malik",
            role: "Advertisement & Web Developer",
            image: "/images/dummy-person.webp",
          },
          {
            name: "Mr. Hanan Mirza",
            role: "Advertisement & Web Developer",
            image: "/images/dummy-person.webp",
          },
          {
            name: "Mr. Nauman Safdar",
            role: "Software Engineer & Database Specialist",
            image: "/images/dummy-person.webp",
          },

          // ... more members
        ]}
      />
      <ProductList />
    </main>
  );
}
