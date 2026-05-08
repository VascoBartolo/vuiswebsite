import * as React from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = React.HTMLAttributes<HTMLElement> & {
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

const ScrollReveal = ({
  as = "div",
  children,
  className,
  delay = 0,
  duration = 700,
  y = 28,
  scale = 0.98,
  threshold = 0.18,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  style,
  ...props
}: ScrollRevealProps) => {
  const ref = React.useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return React.createElement(
    as,
    {
      ref,
      className: cn(
        "will-change-transform",
        isVisible ? "opacity-100" : "opacity-0",
        className,
      ),
      style: {
        ...style,
        transform: isVisible
          ? "translate3d(0, 0, 0) scale(1)"
          : `translate3d(0, ${y}px, 0) scale(${scale})`,
        filter: isVisible ? "blur(0)" : "blur(2px)",
        transitionProperty: "opacity, transform, filter",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "var(--transition-smooth)",
      },
      ...props,
    },
    children,
  );
};

export default ScrollReveal;