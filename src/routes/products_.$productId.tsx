import {
  createFileRoute,
  Link,
  notFound,
  useNavigate,
} from "@tanstack/react-router";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/products_/$productId")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return { name: product.name };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.name ?? "Product"} — VUIS` }],
  }),
  component: ProductPage,
});

/**
 * Distinguishes a tap from the end of a swipe, so dragging the carousel never
 * fires the underlying open/zoom action.
 */
function useTapGuard() {
  const start = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (event: ReactPointerEvent) => {
    start.current = { x: event.clientX, y: event.clientY };
  };

  const isTap = (event: {
    clientX: number;
    clientY: number;
    detail?: number;
  }) => {
    // Keyboard activation reports no pointer coordinates — always allow it
    if (event.detail === 0) return true;

    const from = start.current;
    if (!from) return true;
    return Math.hypot(event.clientX - from.x, event.clientY - from.y) < 10;
  };

  return { onPointerDown, isTap };
}

/** Fullscreen gallery: swipe on touch, ghost-glass arrows on desktop, tap to zoom. */
function Lightbox({
  images,
  alt,
  startIndex,
  onClose,
}: {
  images: string[];
  alt: string;
  startIndex: number;
  onClose: () => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex });
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const { onPointerDown, isTap } = useTapGuard();

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setIndex(emblaApi.selectedScrollSnap());
      setZoom(null);
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") emblaApi?.scrollPrev();
      if (event.key === "ArrowRight") emblaApi?.scrollNext();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [emblaApi, onClose]);

  const zoomAt = (event: MouseEvent<HTMLElement>) => {
    // A drag that ends over the image must not register as a zoom tap
    if (!isTap(event)) return;

    const rect = event.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="fixed inset-0 z-[60] bg-neutral-950/92 backdrop-blur-md">
      <div
        className="h-full overflow-hidden"
        ref={emblaRef}
        onPointerDown={onPointerDown}
      >
        <div className="flex h-full touch-pan-y">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="flex h-full min-w-0 flex-[0_0_100%] items-center justify-center p-5 md:p-14"
              onClick={(event) => {
                if (isTap(event)) onClose();
              }}
            >
              <img
                src={img}
                alt={`${alt} — image ${idx + 1}`}
                draggable={false}
                onClick={(event) => {
                  event.stopPropagation();
                  zoomAt(event);
                }}
                className="max-h-full max-w-full cursor-zoom-in select-none object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* zoom layer */}
      {zoom && (
        <div
          className="absolute inset-0 cursor-zoom-out overflow-hidden bg-neutral-950/92 p-5 md:p-14"
          onClick={() => setZoom(null)}
        >
          <img
            src={images[index]}
            alt={`${alt}, enlarged`}
            draggable={false}
            className="h-full w-full select-none object-contain transition-transform duration-300 ease-out"
            style={{
              transform: "scale(2.4)",
              transformOrigin: `${zoom.x}% ${zoom.y}%`,
            }}
          />
        </div>
      )}

      <button
        type="button"
        onClick={onClose}
        className="glass-ghost-light absolute right-5 top-5 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-110"
        aria-label="Close gallery"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && !zoom && (
        <>
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="glass-ghost-light absolute left-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-110 md:flex"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="glass-ghost-light absolute right-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-110 md:flex"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <p className="glass-ghost-light absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-xs font-semibold tabular-nums">
            {index + 1} / {images.length}
          </p>
        </>
      )}
    </div>
  );
}

function ProductPage() {
  const { productId } = Route.useParams();
  const product = useMemo(
    () => products.find((p) => p.id === productId),
    [productId],
  );

  const { add } = useCart();
  const navigate = useNavigate();

  const [colorId, setColorId] = useState(product?.colors[0]?.id);
  const [imgIndex, setImgIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const { onPointerDown, isTap } = useTapGuard();

  const color =
    product?.colors.find((c) => c.id === colorId) ?? product?.colors[0];
  const images = useMemo(
    () => color?.images ?? product?.images ?? [],
    [color, product],
  );

  useEffect(() => {
    setColorId(product?.colors[0]?.id);
    setQty(1);
  }, [product?.id, product?.colors]);

  // Keep the active thumbnail in sync with whatever the carousel lands on
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setImgIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  // A colour swap changes the slide set — rebuild and return to the first frame
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0, true);
    setImgIndex(0);
  }, [emblaApi, images]);

  const openLightbox = useCallback(
    (idx: number, event: MouseEvent<HTMLElement>) => {
      if (!isTap(event)) return;
      setLightboxIndex(idx);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (!product || !color) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-44 text-center">
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">
          Product not found
        </h1>
        <Link
          to="/products"
          className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-sm font-semibold text-white"
        >
          Back to the Collection
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    add(product.id, qty, color.id);
    toast.success(`${product.name} · ${color.name} added to bag`);
  };

  const handleBuy = () => {
    add(product.id, qty, color.id);
    navigate({ to: "/cart" });
  };

  return (
    <div className="relative overflow-hidden">
      {/* ambient orbs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] animate-orb rounded-full bg-[#EAD9BC] opacity-60 blur-[110px]" />
      <div className="pointer-events-none absolute -right-28 top-[40%] h-[400px] w-[400px] animate-orb-slow rounded-full bg-[#D7E3EE] opacity-50 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 md:pt-32">
        <Link
          to="/products"
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" /> Collection
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* ── Gallery ── */}
          {/* min-w-0: grid items default to min-width:auto, which would let the
              thumbnail row force this column wider than the padded container */}
          <div className="animate-fade-up min-w-0">
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-[#F0EBE1] shadow-[0_4px_24px_rgba(80,60,30,0.07)]">
              <div
                className="overflow-hidden"
                ref={emblaRef}
                onPointerDown={onPointerDown}
              >
                <div className="flex touch-pan-y">
                  {images.map((img, idx) => (
                    <button
                      key={`${color.id}-${idx}`}
                      type="button"
                      onClick={(event) => openLightbox(idx, event)}
                      className="block aspect-[4/5] min-w-0 flex-[0_0_100%] cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                      aria-label={`Expand image ${idx + 1} of ${images.length}`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} — ${color.name}`}
                        draggable={false}
                        className="h-full w-full select-none object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => emblaApi?.scrollPrev()}
                    className="glass-ghost absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full opacity-70 transition-all duration-300 group-hover:opacity-100 md:flex"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => emblaApi?.scrollNext()}
                    className="glass-ghost absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full opacity-70 transition-all duration-300 group-hover:opacity-100 md:flex"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* thumbnails */}
            {images.length > 1 && (
              <div className="mt-4 flex gap-2.5 sm:gap-3">
                {images.map((img, idx) => (
                  <button
                    key={`${color.id}-thumb-${idx}`}
                    type="button"
                    onClick={() => emblaApi?.scrollTo(idx)}
                    className={`aspect-square w-full min-w-0 max-w-20 flex-1 cursor-pointer overflow-hidden rounded-2xl border bg-[#F0EBE1] transition-all duration-300 ${
                      idx === imgIndex
                        ? "border-neutral-900 ring-2 ring-neutral-900 ring-offset-2 ring-offset-[#FAF7F1]"
                        : "border-white/70 opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`Show image ${idx + 1} of ${images.length}`}
                    aria-current={idx === imgIndex ? "true" : undefined}
                  >
                    <img
                      src={img}
                      alt=""
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Details ── */}
          <div className="animate-fade-up delay-100">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
              {product.subtitle}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 text-2xl font-bold tabular-nums">
              €{product.price}
            </p>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-500 md:text-base">
              {product.description}
            </p>

            {/* colour picker */}
            <div className="mt-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
                Colour — <span className="text-neutral-700">{color.name}</span>
              </p>
              <div className="mt-3 flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setColorId(c.id)}
                    title={c.name}
                    aria-label={`Colour: ${c.name}`}
                    aria-pressed={c.id === color.id}
                    className={`h-10 w-10 cursor-pointer rounded-full border border-neutral-900/15 transition-all duration-300 ${
                      c.id === color.id
                        ? "ring-2 ring-neutral-900 ring-offset-2 ring-offset-[#FAF7F1]"
                        : "hover:scale-110"
                    }`}
                    style={{ background: c.swatch }}
                  />
                ))}
              </div>
            </div>

            {/* details */}
            <div className="glass mt-8 rounded-2xl p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
                Details
              </p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                {product.details.map((d) => (
                  <li key={d} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A98B54]" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* qty + actions */}
            <div className="mt-8 flex items-center gap-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
                Qty
              </p>
              <div className="flex items-center rounded-full border border-neutral-900/15 bg-white/60">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="cursor-pointer rounded-full p-3 transition-colors hover:bg-neutral-900/5"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="cursor-pointer rounded-full p-3 transition-colors hover:bg-neutral-900/5"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className="cursor-pointer rounded-full border border-neutral-900 py-3.5 text-sm font-semibold transition-colors duration-300 hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Add to bag
              </button>
              <button
                type="button"
                onClick={handleBuy}
                className="cursor-pointer rounded-full bg-neutral-900 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Buy now
              </button>
            </div>

            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
              Free EU shipping · 30-day returns · Lifetime hinge service
            </p>
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          alt={`${product.name} — ${color.name}`}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
