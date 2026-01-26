// app/our-projects/[slug]/page.jsx
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectBanner from "@/components/projects/ProjectBanner";
import ContentSection from "@/components/projects/ContentSection";
import EditionCard from "@/components/projects/EditionCard";
import FeatureList from "@/components/projects/FeatureList";

// Map slug to title/content
const projects = {
  "quran-translation-for-all": {
    title: "Quran Translation for All",
    description:
      "This project aims to make Quran translation accessible to everyone.",
    heroTitle: "Quran Translation For All",
    bannerTitle: "Translation of the Holy Quran",
    bannerSubtitle: "Easy To Understand For All",
    introText: `This project started in 2019 with the vision of making the Word of Allah (Quran) as easy learn the meaning of the Quran so easy so they start to reading the Quran fluently. Initially was translated some ayahs of the Quran in the language of 7 - 8 years kids to help them understand the Kind Words of of Quran. Themselves took ideas 20 years and a one boy reading and verification process. We hope it will open the hearts of many Muslims as well as to 20 years and a learn more about Islam, Quran and the one who brought it to human kind.`,
    purchaseInfo: `Quran & Books will be available on this web site via all major platform (Flick, apple books and google books) free of cost. We hope to raise the purchase price to minimum and our worthy friends this purpose will be used to support teaching some children. We also aim to make it free for all Muslim Quran App with our commitments with following features.`,
    editions: [
      {
        title: "Gilt Edition",
        features: [
          "With rich Arabic",
          "Awesome font for western kids",
          "Binding and cover prints",
          "Simple and phrases are te-",
        ],
        pattern: "gold"
      },
      {
        title: "Main Edition",
        features: [
          "Arabic and English are le tran",
          "Suitable for all readers",
          "Simple language for Kids",
          "feature and phrases are Arabic",
        ],
        pattern: "blue"
      },
      {
        title: "Revised Edition",
        features: [
          "Arabic text to Arabic to tran",
          "Best for Kids who are learning",
          "to recite Quran",
        ],
        pattern: "floral"
      },
      {
        title: "Advanced Learners Edition",
        features: [
          "Arabic text with word by word",
          "meaning in the Arabic version",
        ],
        pattern: "geometric"
      }
    ],
    features: [
      "Arabic Quran in both lines and easy-than lines",
      "Completely Color Themed as well as black",
      "Adaptive Quran Theme (Dark / Light mode)",
      "Tajwid English and Urdu translation in active (clickMenu)",
      "Translation of Memorable Duas",
      "Bookmarks to previous stages unbelievably",
      "Tajweed / recitation help",
      "Reviewed indicator to prescribe ubiquitous unbelievably",
    ]
  },
  "distributing-quran-and-seerah": {
    title: "Distributing Quran and Seerah",
    description: "Description of another project...",
    heroTitle: "Distributing Quran and Seerah",
    bannerTitle: "Spreading Knowledge",
    bannerSubtitle: "Through Quran and Seerah Distribution",
  },
  "translation-of-hadith": {
    title: "Translation of Hadith",
    description: "Description of another project...",
    heroTitle: "Translation of Hadith",
    bannerTitle: "Understanding Hadith",
    bannerSubtitle: "Authentic Translation for All",
  },
  // Add more submenus here
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects[slug];

  return {
    title: project
      ? `${project.title} - Learning Souls`
      : "Project - Learning Souls",
    description: project ? project.description : "Project details",
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-gray-600">Project not found</p>
    </div>
  );

  // Render Quran Translation page
  if (slug === "quran-translation-for-all") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <ProjectHero title={project.heroTitle} />

        {/* Banner Section */}
        <div className="my-8">
          <ProjectBanner 
            title={project.bannerTitle}
            subtitle={project.bannerSubtitle}
          />
        </div>

        {/* Different Styles Section */}
        <ContentSection 
          title="Different Styles Of The Presentation For Different Type Of Readers"
          centered={true}
          className="bg-white"
          icon={
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
              </svg>
            </div>
          }
        >
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-5xl mx-auto text-center mb-12">
            {project.introText}
          </p>

          {/* Edition Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {project.editions.map((edition, index) => (
              <EditionCard
                key={index}
                title={edition.title}
                features={edition.features}
                pattern={edition.pattern}
              />
            ))}
          </div>
        </ContentSection>

        {/* Purchase Information Section */}
        <ContentSection className="bg-gray-100">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
              {project.purchaseInfo}
            </p>

            {/* Features List */}
            <FeatureList features={project.features} />

            <p className="text-gray-700 text-base mt-8 italic">
              If you would like know more, email us a message through contact us form.
            </p>
          </div>
        </ContentSection>

        {/* Support Section - Placeholder for Form */}
        <ContentSection 
          title="Support Our Projects"
          centered={true}
          className="bg-linear-to-br from-teal-500 to-teal-600 text-white py-16"
        >
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Help our organization support deserving students and kids in enrolling or advancing to our Project.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto">
            <p className="text-white text-sm mb-4">
              Support Through Donation
            </p>
            <div className="bg-white rounded-lg p-6 text-gray-800">
              <p className="text-center font-semibold mb-4">Donation form component will be placed here</p>
              <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                Form Component Placeholder
              </div>
            </div>
          </div>
        </ContentSection>
      </div>
    );
  }

  // Default render for other projects
  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectHero title={project.heroTitle || project.title} />
      
      <div className="my-8">
        <ProjectBanner 
          title={project.bannerTitle || project.title}
          subtitle={project.bannerSubtitle || project.description}
        />
      </div>

      <ContentSection className="bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed">
            {project.description}
          </p>
          <p className="text-gray-500 text-sm mt-8 italic">
            Content for this project is being developed. Please check back soon.
          </p>
        </div>
      </ContentSection>
    </div>
  );
}
