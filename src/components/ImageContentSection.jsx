import React from "react";
import Image from "next/image";

const ImageContentSection = ({
  imageSrc = "/images/mission-img.webp",
  imageAlt = "Our Mission",
  title = "Our Mission",
  subtitle = "",
  description = [],
  showProfile = false,
  profileImage = "/images/profile-pic.webp",
  profileName = "Dr Ghazanfar Shah",
  qualification = "FRCEM, Masters in Islamic Studies",
  signatureImage = "/images/signature.webp",
}) => {
  return (
    <section className="bg-[var(--color-primary)] py-24 sm:py-28 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image (Left) */}
          <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[510px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content (Left) */}
          <div className="space-y-5">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-6xl font-bold text-[#bd2387]">
              {title}
            </h2>
            {/* Subtitle */}
            {subtitle && (
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-600">
                {subtitle}
              </h3>
            )}

            {/* Description */}
            <div className="space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
              {description.length > 0 ? (
                description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>
                    Caring for others in body and soul is the highest of human
                    behaviours that distinguishes humankind from all other
                    creatures.
                  </p>
                  <p>
                    Empowering people with correct knowledge is one of the best
                    ways to help.
                  </p>
                  <p>
                    At Learning Souls, we have started our journey with the aim
                    to get people out of darkness into light through
                    enlightening knowledge. We will in sha Allah help people out
                    of material poverty as well as educational poverty. Join us
                    in every project and work towards everlasting success.
                  </p>
                </>
              )}
            </div>

            {/* Profile Section */}
            {showProfile && (
              <div className="flex items-start gap-4 pt-2">
                {/* Profile Image */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ">
                  <Image
                    src={profileImage}
                    alt={profileName}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Name & Signature */}
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-semibold text-gray-500">
                    {profileName}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-gray-500">
                    {qualification}
                  </span>

                  <div className="relative w-28 h-10 ">
                    <Image
                      src={signatureImage}
                      alt={`${profileName} signature`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageContentSection;
