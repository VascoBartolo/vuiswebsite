import { useEffect, useState, type MouseEvent, type TouchEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ProductCarouselProps = {
  images: string[];
  alt: string;
  className?: string;
  viewportClassName?: string;
  imageClassName?: string;
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0.85,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0.85,
  }),
};

export function ProductCarousel({
  images,
  alt,
  className,
  viewportClassName,
  imageClassName,
}: ProductCarouselProps) {
  const [i, setI] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  useEffect(() => {
    setI(0);
    setDirection(1);
  }, [images]);

  if (!images.length) {
    return <div className={cn("aspect-[4/5] w-full bg-muted/40", className)} />;
  }

  const lastIndex = images.length - 1;

  const goTo = (idx: number) => {
    const nextIndex = Math.min(Math.max(idx, 0), lastIndex);
    if (nextIndex === i) return;

    setDirection(nextIndex > i ? 1 : -1);
    setI(nextIndex);
  };

  const next = () => {
    setDirection(1);
    setI((p) => (p + 1) % images.length);
  };

  const prev = () => {
    setDirection(-1);
    setI((p) => (p - 1 + images.length) % images.length);
  };

  const stopAndRun = (event: MouseEvent<HTMLButtonElement>, action: () => void) => {
    event.preventDefault();
    event.stopPropagation();
    action();
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null || touchStartY === null || images.length <= 1) {
      setTouchStartX(null);
      setTouchStartY(null);
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX;
    const touchEndY = event.changedTouches[0]?.clientY;
    if (touchEndX === undefined || touchEndY === undefined) return;

    const deltaX = touchStartX - touchEndX;
    const deltaY = Math.abs(touchStartY - touchEndY);

    // Only fire carousel swipe when horizontal motion clearly dominates vertical
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > deltaY * 1.5) {
      event.stopPropagation();
      deltaX > 0 ? next() : prev();
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  return (
    <div
      className={cn("group relative touch-pan-y", className)}
      onTouchStart={(event) => {
        setTouchStartX(event.touches[0]?.clientX ?? null);
        setTouchStartY(event.touches[0]?.clientY ?? null);
      }}
      onTouchEnd={handleTouchEnd}
    >
      <div className={cn("relative aspect-[4/5] w-full overflow-hidden bg-muted/40", viewportClassName)}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={`${images[i]}-${i}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={images[i]}
              alt={alt}
              className={cn("h-full w-full object-cover", imageClassName)}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => stopAndRun(event, prev)}
            className="absolute left-3 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-foreground/20 bg-transparent text-foreground backdrop-blur-sm transition hover:border-foreground/40 hover:bg-background/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(event) => stopAndRun(event, next)}
            className="absolute right-3 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-foreground/20 bg-transparent text-foreground backdrop-blur-sm transition hover:border-foreground/40 hover:bg-background/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(event) => stopAndRun(event, () => goTo(idx))}
                className={cn(
                  "h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  idx === i
                    ? "w-8 bg-foreground"
                    : "w-4 bg-foreground/30 hover:w-6 hover:bg-foreground/60",
                )}
                aria-label={`Show image ${idx + 1} of ${images.length}`}
                aria-current={idx === i ? "true" : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
