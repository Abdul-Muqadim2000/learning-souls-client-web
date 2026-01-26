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
        image="/images/about-us.jpg"
        textColor={"var(--color-primary)"}
        height="xxl"
      />

      <ImageContentSection
        imageSrc="/images/gallery-img7.jpg"
        imageAlt="Our Mission"
        title="Hour History"
        subtitle="From the Start"
        description={[
          "Learning Souls was founded with a vision to promote education and understanding based on Islamic principles, aiming to foster community and interfaith harmony.",
          "Today, we continue our work with the same commitment, striving to make a lasting positive impact through education",
          "With the backing of dedicated supporters, we began distributing educational resources and forming partnerships to expand our reach.",
        ]}
        showProfile={true}
        profileImage="/images/profile-pic.jpg"
        profileName="Dr Ghazanfar Shah"
        qualification="FRCEM, Masters in Islamic Studies"
        signatureImage="/images/signature.png"
      />

      <TimeLine />
    </>
  );
};

export default page;
