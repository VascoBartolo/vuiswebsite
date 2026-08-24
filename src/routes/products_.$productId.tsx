import {
  createFileRoute,
  Link,
  notFound,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setColorId(product?.colors[0]?.id);
    setImgIndex(0);
    setQty(1);
  }, [product?.id]);

  const color =
    product?.colors.find((c) => c.id === colorId) ?? product?.colors[0];
  const images = color?.images ?? product?.images ?? [];

  const prevImage = () =>
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  const nextImage = () => setImgIndex((i) => (i + 1) % images.length);

  // Lightbox: keyboard nav + scroll lock
  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") prevImage();
      if (event.key === "ArrowRight") nextImage();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, images.length]);

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

  const selectColor = (id: string) => {
    setColorId(id);
    setImgIndex(0);
  };

  const handleAdd = () => {
    add(product.id, qty, color.id);
    toast.success(`${product.name} · ${color.name} added to bag`);
  };

  const handleBuy = () => {
    add(product.id, qty, color.id);
    navigate({ to: "/cart" });
  };

  const toggleZoom = (event: MouseEvent<HTMLImageElement>) => {
    if (zoom) {
      setZoom(null);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
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
          <div className="animate-fade-up">
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-[#F0EBE1] shadow-[0_4px_24px_rgba(80,60,30,0.07)]">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="block aspect-[4/5] w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Expand image"
              >
                <img
                  src={images[imgIndex]}
                  alt={`${product.name} — ${color.name}`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </button>

              <span className="glass-strong pointer-events-none absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 opacity-80 transition-opacity group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="glass-strong absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-neutral-800 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="glass-strong absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-neutral-800 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* thumbnails */}
            <div className="mt-4 flex gap-3">
              {images.map((img, idx) => (
                <button
                  key={`${color.id}-${idx}`}
                  type="button"
                  onClick={() => setImgIndex(idx)}
                  className={`h-20 w-20 cursor-pointer overflow-hidden rounded-2xl border bg-[#F0EBE1] transition-all duration-300 ${
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
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
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
                    onClick={() => selectColor(c.id)}
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

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral-950/90 backdrop-blur-md"
          onClick={() => {
            setZoom(null);
            setLightboxOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} image gallery`}
        >
          <div className="absolute inset-0 overflow-hidden p-6 md:p-14">
            <img
              src={images[imgIndex]}
              alt={`${product.name} — ${color.name}, enlarged`}
              onClick={(event) => {
                event.stopPropagation();
                toggleZoom(event);
              }}
              className={`h-full w-full object-contain transition-transform duration-300 ease-out ${
                zoom ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              style={
                zoom
                  ? {
                      transform: "scale(2.4)",
                      transformOrigin: `${zoom.x}% ${zoom.y}%`,
                    }
                  : undefined
              }
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setZoom(null);
              setLightboxOpen(false);
            }}
            className="glass-dark absolute right-5 top-5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white transition-transform hover:scale-110"
            aria-label="Close gallery"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && !zoom && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  prevImage();
                }}
                className="glass-dark absolute left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-white transition-transform hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  nextImage();
                }}
                className="glass-dark absolute right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-white transition-transform hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <p className="glass-dark absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-xs font-semibold text-white tabular-nums">
            {imgIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}
