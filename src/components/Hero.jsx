import HeroCarousel from "./HeroCarousel";

// Slide data configuration
// To add more slides, simply add more objects to this array
const heroSlides = [
  {
    backgroundImage: "/images/hero-img.webp",
    // title: "Nourish Your Soul with Knowledge of The Quran",

    // primaryButton: {
    //   text: "Read More",
    //   href: "/insights/value-driven-innovation-automation",
    // },
    // secondaryButton: {
    //   text: "Talk to Sales",
    //   href: "/contact-us",
    // },
  },
  //   {
  //     backgroundImage: "/hero-img3.webp",
  //     title: "Agentic AI is Revolutionizing the Industries",
  //     description:
  //       "Stop struggling with disconnected data systems. We apply Agentic AI to banking, retail, and other GCC industries.",
  //     primaryButton: {
  //       text: "Read More",
  //       href: "/insights/agentic-ai",
  //     },
  //     secondaryButton: {
  //       text: "Talk to Sales",
  //       href: "/contact-us",
  //     },
  //   },
  //   {
  //     backgroundImage: "/hero-img4.webp",
  //     title: "Data is Going to Be Your New Sovereign Asset",
  //     description:
  //       "Your company's data is your most valuable resource. We solve the problem of data silos by building a unified platform.",
  //     primaryButton: {
  //       text: "Read More",
  //       href: "/insights/data-sovereign-asset",
  //     },
  //     secondaryButton: {
  //       text: "Talk to Sales",
  //       href: "/contact-us",
  //     },
  //   },
  //   {
  //     backgroundImage: "/hero-img2.webp",
  //     title:
  //       "How Customer Service Teams Are Achieving a 20% to 45% Increase in Productivity with AI",
  //     description:
  //       "Companies using AI-driven tools like Microsoft Copilot see a 20% to 45% increase in the speed of resolving customer inquiries.",
  //     primaryButton: {
  //       text: "Read More",
  //       href: "/insights/autonomous-ai-customer-service",
  //     },
  //     secondaryButton: {
  //       text: "Talk to Sales",
  //       href: "/contact-us",
  //     },
  //   },
];

export default function Hero() {
  return (
    <HeroCarousel slides={heroSlides} autoplay={true} autoplayInterval={5000} />
  );
}
