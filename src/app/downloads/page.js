import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Download,
  Languages,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export const metadata = {
  title: "Downloads - Learning Souls",
  description:
    "Explore and download books, translations, and applications from Learning Souls.",
  keywords: [
    "Learning Souls Downloads",
    "Islamic Books",
    "Quran Translation",
    "Islamic Apps",
  ],
};

const downloadResources = [
  {
    id: 1,
    title: "Books Distribution Project",
    href: "/downloads/books-distribution-project",
    description:
      "Access curated educational and Islamic publications prepared for community-level distribution.",
    icon: BookOpen,
    accent: "from-[#09b29d] to-[#058f7d]",
    points: [
      "Structured collections",
      "Community-friendly material",
      "Download-ready formats",
    ],
  },
  {
    id: 2,
    title: "Al-Mustafa Translation",
    href: "/downloads/al-mustafa-translation",
    description:
      "Discover accessible Quran translations with multiple editions for diverse reading preferences.",
    icon: Languages,
    accent: "from-[#bd2387] to-[#8e1a65]",
    points: [
      "Multiple translation editions",
      "Designed for readability",
      "Direct PDF access",
    ],
  },
  {
    id: 3,
    title: "Apps",
    href: "/downloads/apps",
    description:
      "Stay connected with mobile learning tools built to support daily Islamic study and reflection.",
    icon: Smartphone,
    accent: "from-[#0d9488] to-[#0f766e]",
    points: [
      "Mobile-first experience",
      "Practical daily usage",
      "Upcoming releases roadmap",
    ],
  },
];

const trustHighlights = [
  {
    id: 1,
    title: "Quality Reviewed",
    description:
      "Downloads are prepared to maintain clarity and consistency for learners and educators.",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Fast Access",
    description:
      "Organized categories make it easy to find what you need without unnecessary steps.",
    icon: Download,
  },
];

const DownloadsPage = () => {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <section className="relative isolate">
        <div className="absolute inset-0 bg-[url('/images/Asset-1.webp')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-linear-to-br from-[#09b29d] via-[#078f7d] to-[#046357]" />
        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/10 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="max-w-4xl">
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-white/95 backdrop-blur">
              Learning Souls Library
            </span>
            <h1 className="mt-6 text-white font-black leading-tight text-[clamp(2rem,5vw,4.5rem)]">
              Downloads
            </h1>
            <p className="mt-5 max-w-3xl text-white/95 text-base sm:text-lg md:text-xl leading-relaxed">
              Browse verified books, translations, and digital resources built
              to make Islamic learning accessible for individuals, families, and
              communities.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="#download-categories"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#057769] transition-transform duration-200 hover:scale-[1.02]"
              >
                Explore Categories
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full border border-white/45 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white/20"
              >
                Need Help Finding a Resource?
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-10 sm:-mt-12 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {trustHighlights.map((item) => {
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

      <section id="download-categories" className="py-10 sm:py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.18em] text-[#bd2387]">
              Download Categories
            </p>
            <h2 className="mt-3 text-[clamp(2.2rem,4vw,4.5rem)] font-black text-[#09b29d] leading-[0.95]">
              Find What You Need in One Place
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed text-base sm:text-lg">
              Each section is organized for quick access, clear navigation, and
              a better download experience across all devices.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {downloadResources.map((resource) => {
              const Icon = resource.icon;

              return (
                <article
                  key={resource.id}
                  className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_24px_60px_rgba(4,99,87,0.22)]"
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${resource.accent}`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_40%)]" />
                  <div className="relative p-6 sm:p-7 pb-24 sm:pb-24 text-white min-h-[320px] flex flex-col h-full">
                    <div className="inline-flex rounded-2xl bg-white/15 p-3 ring-1 ring-white/20 backdrop-blur-sm w-fit">
                      <Icon className="h-5 w-5 text-white" />
                    </div>

                    <h3 className="mt-6 text-2xl sm:text-3xl font-black leading-tight max-w-md">
                      {resource.title}
                    </h3>
                    <p className="mt-3 text-white/90 leading-relaxed text-sm sm:text-base max-w-md">
                      {resource.description}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {resource.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-sm sm:text-base text-white/90"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={resource.href}
                      className="absolute left-6 sm:left-7 bottom-6 sm:bottom-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#057769] shadow-lg shadow-black/10 transition-transform duration-200 hover:scale-[1.03]"
                    >
                      View Downloads
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DownloadsPage;
