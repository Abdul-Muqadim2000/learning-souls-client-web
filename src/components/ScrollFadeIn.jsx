"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ScrollFadeIn - A wrapper component that fades in children when they scroll into view
 * @param {ReactNode} children - The content to animate
 * @param {string} direction - Animation direction: 'up', 'down', 'left', 'right', 'none' (default: 'up')
 * @param {number} delay - Delay before animation starts in ms (default: 0)
 * @param {number} duration - Animation duration in ms (default: 600)
 * @param {number} threshold - Percentage of element visible before triggering (0-1, default: 0.1)
 * @param {string} className - Additional CSS classes
 */
const ScrollFadeIn = ({
  children,
  direction = "up",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const currentElement = elementRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
          // Unobserve after animation triggers once for performance
          if (currentElement) {
            observer.unobserve(currentElement);
          }
        }
      },
      {
        threshold: threshold,
        rootMargin: "50px", // Start animation slightly before element is visible
      },
    );

    if (currentElement) {
      // Check if element is already in viewport on mount
      const rect = currentElement.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport) {
        // Trigger animation immediately for elements in initial viewport
        setTimeout(() => {
          setIsVisible(true);
          setHasAnimated(true);
        }, delay);
      } else {
        // Use observer for elements below the fold
        observer.observe(currentElement);
      }
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, delay, hasAnimated]);

  // Define initial transform based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(40px)";
      case "down":
        return "translateY(-40px)";
      case "left":
        return "translateX(40px)";
      case "right":
        return "translateX(-40px)";
      case "none":
      default:
        return "translateY(0)";
    }
  };

  const animationStyles = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate(0, 0)" : getInitialTransform(),
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
  };

  return (
    <div ref={elementRef} style={animationStyles} className={className}>
      {children}
    </div>
  );
};

export default ScrollFadeIn;

// Convenience exports for common animation patterns
export const FadeInUp = ({ children, ...props }) => (
  <ScrollFadeIn direction="up" {...props}>
    {children}
  </ScrollFadeIn>
);

export const FadeInDown = ({ children, ...props }) => (
  <ScrollFadeIn direction="down" {...props}>
    {children}
  </ScrollFadeIn>
);

export const FadeInLeft = ({ children, ...props }) => (
  <ScrollFadeIn direction="left" {...props}>
    {children}
  </ScrollFadeIn>
);

export const FadeInRight = ({ children, ...props }) => (
  <ScrollFadeIn direction="right" {...props}>
    {children}
  </ScrollFadeIn>
);

export const FadeIn = ({ children, ...props }) => (
  <ScrollFadeIn direction="none" {...props}>
    {children}
  </ScrollFadeIn>
);
