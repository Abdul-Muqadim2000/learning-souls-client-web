import React from "react";
import GenericHeader from "./GenericHeader";
import { PrimaryButton } from "./ui/Button";
import Image from "next/image";
import Link from "next/link";

const Support = () => {
  return (
    <section className="w-full bg-[var(--color-secondary)]">
      {/* Header */}
      <div className="bg-white py-0">
        <GenericHeader
          title="Support our Mission"
          textColor={"var(--color-secondary)"}
          height="xl"
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-26">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* LEFT CARD */}
          <div className="flex justify-center order-2 lg:order-1">
            <div
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 max-w-xl w-full text-center relative lg:mt-[-160px] z-10 lg:bottom-[-20px] min-h-[500px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[700px] flex flex-col justify-center items-center"
              style={{
                backgroundImage: "url(/images/mission-img1.webp)",
                backgroundSize: "280%",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay",
                backgroundRepeat: "no-repeat",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 10px 25px -8px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="max-w-xs mx-auto">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[var(--color-secondary)] mb-3 sm:mb-4">
                  Donate Online
                </h3>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 py-4 sm:py-6 md:py-8">
                  Partner with us by donating to one of our active campaigns.
                  Your generosity fuels our work.
                </p>
                <Link href="/donate">
                  <PrimaryButton
                    className="px-8 sm:px-12 md:px-14 py-3 sm:py-4 text-sm sm:text-base"
                    text={"Donate Now"}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="text-white order-1 lg:order-2">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 text-center lg:text-left">
              For Bank Transfers and Standing Orders
            </h3>
            <div className="space-y-4 sm:space-y-5 text-xs sm:text-sm md:text-base text-center">
              <div className="flex flex-col gap-2">
                <span className="font-semibold">ACCOUNT NAME</span>
                <span className="break-all">Learning Souls</span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-semibold">ACCOUNT NUMBER</span>
                <span className="break-all">55839336</span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-semibold">SORT CODE</span>
                <span className="break-all">23-05-80</span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-semibold">IBAN</span>
                <span className="break-all">GB92MYMB23058055839336</span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-semibold">SWIFT</span>
                <span className="break-all">MYMBGB2L</span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-semibold">BANK ADDRESS</span>
                <span>
                  58–64 Fargate
                  <br />
                  Sheffield City Center
                  <br />
                  Sheffield S1 2HE
                </span>
              </div>
            </div>
            {/* Arabic Text Placeholder */}

            <div className="mt-6 sm:mt-8 text-center lg:text-left">
              <Image
                src="/images/jazakallah.webp"
                alt="جزاكم الله خيرًا"
                width={400}
                height={64}
                className="inline-block w-48 sm:w-64 md:w-80 lg:w-96 h-auto"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
