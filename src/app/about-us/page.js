import GenaricHeader from "@/components/GenaricHeader";
import ImageContentSection from "@/components/ImageContentSection";

const page = () => {
  return (
    <>
      <GenaricHeader title="About Us" image="/images/app-store.png" />

      <ImageContentSection
        imageSrc="/images/logo.png"
        imageAlt="Our Mission"
        title="Hour History"
        subtitle="Our Mission"
        description={[
          "Caring for others in body and soul is the highest of human behaviours that distinguishes humankind from all other creatures.",
          "Empowering people with correct knowledge is one of the best ways to help.",
          "At Learning Souls, we have started our journey with the aim to get people out of darkness into light through enlightening knowledge. We will in sha Allah help people out of material poverty as well as educational poverty. Join us in every project and work towards everlasting success.",
        ]}
        showProfile={true}
        profileImage="/images/profile-pic.jpg"
        profileName="Dr Ghazanfar Shah"
        qualification="FRCEM, Masters in Islamic Studies"
        signatureImage="/images/signature.png"
      />
    </>
  );
};

export default page;
