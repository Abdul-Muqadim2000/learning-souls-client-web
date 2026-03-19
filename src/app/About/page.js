import Link from "next/link";
import {
  ArrowRight,
  Compass,
  HandHeart,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";

export const metadata = {
  title: "About - Learning Souls",
  description:
    "Learn about Learning Souls, our mission, values, and ways to connect with our team and projects.",
  keywords: [
    "Learning Souls",
    "About Learning Souls",
    "Islamic Education",
    "Community Projects",
  ],
};

const aboutHighlights = [
  {
    id: 1,
    title: "Mission Driven",
    description:
      "We focus on making authentic Islamic knowledge practical, accessible, and beneficial for all.",
    icon: Compass,
  },
  {
    id: 2,
    title: "Community First",
    description:
      "Our initiatives are designed to serve families, learners, and local communities with care.",
    icon: Users,
  },
  {
    id: 3,
    title: "Trust & Clarity",
    description:
      "From publications to digital resources, we prioritize quality, transparency, and consistency.",
    icon: ShieldCheck,
  },
];

const aboutQuickLinks = [
  {
    id: 1,
    title: "About Us",
    href: "/about-us",
    description:
      "Read our story, history, and long-term vision for meaningful educational impact.",
  },
  {
    id: 2,
    title: "Join Us",
    href: "/join-us",
    description:
      "Volunteer your time, skills, or support and become part of our mission in action.",
  },
  {
    id: 3,
    title: "Contact Us",
    href: "/contact-us",
    description:
      "Reach out for collaboration, questions, or support related to any Learning Souls initiative.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <section className="relative isolate">
        <div className="absolute inset-0 bg-[url('/images/Asset-1.webp')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-linear-to-br from-[#09b29d] via-[#078f7d] to-[#046357]" />
        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/10 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="max-w-4xl">
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-white/95 backdrop-blur">
              Who We Are
            </span>

            <h1 className="mt-6 text-white font-black leading-tight text-[clamp(2rem,5vw,4.5rem)]">
              About Learning Souls
            </h1>

            <p className="mt-5 max-w-3xl text-white/95 text-base sm:text-lg md:text-xl leading-relaxed">
              We are building pathways for meaningful learning through Islamic
              education, publications, and community-centered initiatives that
              uplift minds and hearts.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/about-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#057769] transition-transform duration-200 hover:scale-[1.02]"
              >
                Read Our Story
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/join-us"
                className="inline-flex items-center justify-center rounded-full border border-white/45 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white/20"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-10 sm:-mt-12 relative z-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {aboutHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-[#09b29d]/15 bg-white shadow-md p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-xl bg-[#09b29d]/10 p-3">
                      <Icon className="h-5 w-5 text-[#09b29d]" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#bd2387]">
              Explore More
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-[#09b29d] leading-tight">
              Discover Learning Souls
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed text-base sm:text-lg">
              Use these pages to learn more about our mission, join our work, or
              connect directly with our team.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {aboutQuickLinks.map((item) => (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="h-1.5 w-full bg-linear-to-r from-[#09b29d] via-[#0f766e] to-[#046357]" />
                <div className="p-6 sm:p-7">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed text-sm sm:text-base">
                    {item.description}
                  </p>

                  <Link
                    href={item.href}
                    className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#09b29d]/30 px-5 py-2.5 text-sm font-semibold text-[#09b29d] transition-colors duration-200 hover:bg-[#09b29d] hover:text-white"
                  >
                    Visit Page
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-linear-to-r from-[#09b29d] via-[#078f7d] to-[#046357] p-6 sm:p-8 lg:p-10 text-white shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
                  Partner With Learning Souls
                </h2>
                <p className="mt-3 text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed">
                  If you want to contribute expertise, volunteer support, or
                  collaborate on educational outreach, we would love to hear
                  from you.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:justify-end">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#057769] transition-transform duration-200 hover:scale-[1.02]"
                >
                  <Mail className="h-4 w-4" />
                  Contact Team
                </Link>
                <Link
                  href="/join-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white/20"
                >
                  <HandHeart className="h-4 w-4" />
                  Join Mission
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
