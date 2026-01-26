import GenericHeader from "@/components/GenericHeader";
import ProductList from "@/components/ProductList";

export const metadata = {
  title: "Books Distribution Project - Learning Souls",
  description: "Download books from our distribution project",
};

export default function BooksDistributionProject() {
  return (
    <>
      <GenericHeader
        title="Spreading the Light of Islamic Knowledge"
        subtitle="At Learning Soul, we aim to make authentic Islamic knowledge accessible to all. These free downloadable books cover various aspects of Islam from faith and worship to character and spirituality. We invite you to explore, learn, and share these resources to benefit yourself and others, In shā’ Allāh"
        // textSize={"4rem"}
        bgColor={"var(--color-primary)"}
        textColor={"var(--color-secondary)"}
        height="xxl"
      />
      <ProductList title={"FREE BOOK DOWNLOADS"} />
      <GenericHeader
        title="Be a Part of Sadaqah Jāriyah"
        subtitle="Sharing Islamic knowledge is a noble act and a means of continuous reward. Support our efforts to distribute free Islamic books by donating, volunteering, or spreading the word. Together, we can reach more hearts and homes with the message of Islam"
        bgColor={"var(--color-primary)"}
        textColor={"var(--color-secondary)"}
        height="xxl"
        buttonText="Donate Now"
        buttonLink="/donate"
      />
    </>
  );
}
