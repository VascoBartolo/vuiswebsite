import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Milliseconds — kept in ms for call-site readability. */
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  /** 0-1 portion of the element that must be visible before revealing. */
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

/**
 * Reveals its children as they scroll into view. Built on motion.dev so the
 * easing matches the rest of the site's motion language, and it collapses to
 * a plain render when the visitor prefers reduced motion.
 */
const ScrollReveal = ({
  children,
  className,
  delay = 0,
  duration = 700,
  y = 28,
  scale = 0.98,
  threshold = 0.18,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  ...props
}: ScrollRevealProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={{ opacity: 0, y, scale, filter: "blur(2px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, amount: threshold, margin: rootMargin }}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
