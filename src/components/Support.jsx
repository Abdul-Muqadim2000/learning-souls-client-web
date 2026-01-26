import React from "react";
import GenericHeader from "./GenericHeader";
import { PrimaryButton } from "./ui/Button";
import Image from "next/image";

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
      <div className="max-w-6xl mx-auto px-4 py-26">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CARD */}
          <div className="flex justify-center">
            <div
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center relative mt-[-160] z-10 bottom-[40] min-h-[500px] flex flex-col justify-center items-center"
              style={{
                backgroundImage: "url(/images/mission-img1.webp)",
                backgroundSize: "200%",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay",
                backgroundRepeat: "no-repeat",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 10px 25px -8px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="max-w-xs mx-auto">
                <h3 className="text-lg font-semibold text-[var(--color-secondary)] mb-4">
                  Donate Online
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Partner with us by donating to one of our active campaigns.
                  Your generosity fuels our work.
                </p>

                <PrimaryButton className="px-14 py-4" text={"Donate Now"} />
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="text-white">
            <h3 className="text-3xl font-semibold mb-8">
              For Bank Transfers and Standing Orders
            </h3>
            <div className="space-y-5 text-sm md:text-base">
              <div className="flex gap-4">
                <span className="font-semibold w-40">ACCOUNT NAME</span>
                <span>Learning Souls</span>
              </div>

              <div className="flex gap-4">
                <span className="font-semibold w-40">ACCOUNT NUMBER</span>
                <span>55839336</span>
              </div>

              <div className="flex gap-4">
                <span className="font-semibold w-40">SORT CODE</span>
                <span>23-05-80</span>
              </div>

              <div className="flex gap-4">
                <span className="font-semibold w-40">IBAN</span>
                <span>GB92MYMB23058055839336</span>
              </div>

              <div className="flex gap-4">
                <span className="font-semibold w-40">SWIFT</span>
                <span>MYMBGB2L</span>
              </div>

              <div className="flex gap-4">
                <span className="font-semibold w-40">BANK ADDRESS</span>
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

            <div className="mt-4     ">
              <Image
                src="/images/jazakallah.webp"
                alt="جزاكم الله خيرًا"
                width={240}
                height={64}
                className="inline-block"
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
