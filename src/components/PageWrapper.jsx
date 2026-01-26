"use client";

import { Children } from "react";
import { usePathname } from "next/navigation";
import ScrollFadeIn from "./ScrollFadeIn";

/**
 * PageWrapper - Wraps page content with automatic scroll animations
 * Applies fade-in animations to each child component individually
 */
const PageWrapper = ({ children }) => {
  const pathname = usePathname();

  // Convert children to array and wrap each child with ScrollFadeIn
  const childrenArray = Children.toArray(children);

  return (
    <div className="page-wrapper" key={pathname}>
      {childrenArray.map((child, index) => (
        <ScrollFadeIn
          key={index}
          duration={600}
          threshold={0.1}
          delay={index * 50}
        >
          {child}
        </ScrollFadeIn>
      ))}
    </div>
  );
};

export default PageWrapper;
