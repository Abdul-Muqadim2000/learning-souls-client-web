import GenericHeader from "@/components/GenericHeader";
import ImageContentSection from "@/components/ImageContentSection";
import TimeLine from "@/components/TimeLine";

export const metadata = {
  title: "About Us - Learning Souls",
  description:
    "Learn about our mission to empower people with correct knowledge and help them out of darkness into light through enlightening knowledge",
};

const page = () => {
  return (
    <>
      <GenericHeader
        title="About Us"
        image="/images/about-us.webp"
        mobileImage="/images/about-us-mobile-banner.png"
        textColor={"var(--color-primary)"}
        height="xxl"
        imageClassName="!w-[260%] sm:!w-[180%] md:!w-full"
        fullImageHeight={true}
      />

      <ImageContentSection
        imageSrc="/images/gallery-img7.webp"
        imageAlt="Our Mission"
        title="Our History"
        subtitle="From the Start"
        description={[
          "Learning Souls was founded with a vision to promote education and understanding based on Islamic principles, aiming to foster community and interfaith harmony.",
          "Today, we continue our work with the same commitment, striving to make a lasting positive impact through education",
          "With the backing of dedicated supporters, we began distributing educational resources and forming partnerships to expand our reach.",
        ]}
        showProfile={true}
        profileImage="/images/profile-pic.webp"
        profileName="Dr Ghazanfar Shah"
        qualification="FRCEM, Masters in Islamic Studies"
        signatureImage="/images/signature.webp"
      />

      <TimeLine />
    </>
  );
};

export default page;
