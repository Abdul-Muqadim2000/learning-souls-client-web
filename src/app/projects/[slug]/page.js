"use client";
// app/our-projects/[slug]/page.jsx
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const params = useParams();
  const { slug } = params;

  // Map slug to title/content
  const projects = {
    "quran-translation-for-all": {
      title: "Quran Translation for All",
      description:
        "This project aims to make Quran translation accessible to everyone.",
    },
    "distributing-quran-and-seerah": {
      title: "Distributing Quran and Seerah",
      description: "Description of another project...",
    },
    "translation-of-hadith": {
      title: "Translation of Hadith",
      description: "Description of another project...",
    },
    // Add more submenus here
  };

  const project = projects[slug];

  if (!project) return <p>Project not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p>{project.description}</p>
    </div>
  );
}
