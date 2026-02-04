import CardList from "@/components/CardList";
import { cardListData } from "@/components/lib/cardListData";
import Hero from "@/components/Hero";
import ImageContentSection from "@/components/ImageContentSection";
import Support from "@/components/Support";
import CarouselSlider from "@/components/CarouselSlider";
import TeamCarousel from "@/components/TeamCarousal";
import ProductList from "@/components/ProductList";

export const metadata = {
  title: "Home - Learning Souls",
  description:
    "Welcome to Learning Souls - Empowering people with correct knowledge through enlightening education and charitable works",
};

export default function Home() {
  const carouselItems = [
    {
      image: "/images/gallery-img1.webp",
    },
    {
      image: "/images/gallery-img2.webp",
    },
    {
      image: "/images/gallery-img3.webp",
    },
    {
      image: "/images/gallery-img4.webp",
    },
    {
      image: "/images/gallery-img5.webp",
    },
    {
      image: "/images/gallery-img6.webp",
    },
    {
      image: "/images/gallery-img7.webp",
    },
    {
      image: "/images/gallery-img8.webp",
    },
    {
      image: "/images/gallery-img9.webp",
    },
    {
      image: "/images/gallery-img10.webp",
    },
    {
      image: "/images/gallery-img11.webp",
    },
    {
      image: "/images/gallery-img12.webp",
    },
    {
      image: "/images/gallery-img12.webp",
    },
    {
      image: "/images/gallery-img12.webp",
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

  return (
    <main>
      <Hero />
      <CardList cards={cardListData} title="Our Projects" />

      <ImageContentSection
        showProfile={true}
        profileImage="/images/profile-pic.webp"
        profileName="Dr Ghazanfar Shah"
        qualification="FRCEM, Masters in Islamic Studies"
        signatureImage="/images/signature.webp"
      />
      <Support />
      <CarouselSlider items={carouselItems} title="PICTURE GALLERY" />
      <ProductList />
      <CarouselSlider
        items={upcomingBooksItems}
        title="UPCOMMING BOOKS"
        bgColor="var(--color-tertiary)"
        bgImage="/images/books-bg.webp"
        textColor="white"
      />
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
    </main>
  );
}
