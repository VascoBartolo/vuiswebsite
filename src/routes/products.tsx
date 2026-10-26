import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatPrice, products } from "@/lib/products";
import { useCopy, useLang } from "@/lib/i18n";
import ScrollReveal from "@/components/ScrollReveal";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Collection — VUIS" },
      {
        name: "description",
        content: "The VUIS collection. Minimal eyewear designed in the Azores.",
      },
    ],
  }),
  component: ProductsPage,
});

const copy = {
  en: {
    eyebrow: "Collection · 2026",
    the: "The",
    intro: "One frame, five colours. Launch pricing for a limited time.",
    view: "View",
    sunglasses: "sunglasses",
    alternate: "alternate view",
    from: "from",
  },
  pt: {
    eyebrow: "Coleção · 2026",
    the: "A",
    intro: "Uma armação, cinco cores. Preço de lançamento por tempo limitado.",
    view: "Ver",
    sunglasses: "óculos de sol",
    alternate: "vista alternativa",
    from: "desde",
  },
};

function ProductsPage() {
  const c = useCopy(copy);
  const { lang } = useLang();

  return (
    <div className="relative overflow-hidden">
      {/* ambient orbs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] animate-orb rounded-full bg-[#EAD9BC] opacity-60 blur-[110px]" />
      <div className="pointer-events-none absolute -right-28 top-[30%] h-[400px] w-[400px] animate-orb-slow rounded-full bg-[#D7E3EE] opacity-50 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-32">
        <ScrollReveal className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
            {c.eyebrow}
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.03em] md:text-6xl">
            {c.the} <span className="text-gradient-warm">Atlantic Edition</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-neutral-500">{c.intro}</p>
        </ScrollReveal>

        <div className="mx-auto mt-14 grid max-w-md gap-6">
          {products.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 100}>
              <Link
                to="/products/$productId"
                params={{ productId: p.id }}
                className="group block w-full cursor-pointer rounded-[1.75rem] border border-white/70 bg-white/70 p-3 text-left shadow-[0_4px_24px_rgba(80,60,30,0.07)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_-20px_rgba(80,60,30,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`${c.view} ${p.name}`}
              >
                <div className="relative aspect-square overflow-hidden rounded-[1.35rem] bg-[#F0EBE1]">
                  <img
                    src={p.images[0]}
                    alt={`VUIS ${p.name} ${c.sunglasses} — ${p.subtitle[lang].toLowerCase()}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:opacity-0"
                  />
                  {p.images[1] && (
                    <img
                      src={p.images[1]}
                      alt={`VUIS ${p.name} ${c.sunglasses}, ${c.alternate}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:opacity-100"
                    />
                  )}

                  {/* colour swatches */}
                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    {p.colors.map((color) => (
                      <span
                        key={color.id}
                        title={color.name[lang]}
                        className="h-4 w-4 rounded-full border border-white shadow-sm"
                        style={{ background: color.swatch }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between px-3 py-4">
                  <div>
                    <p className="text-sm font-bold">{p.name}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {p.subtitle[lang]}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex flex-col items-end leading-tight">
                      <span className="text-[11px] tabular-nums text-neutral-400 line-through">
                        {formatPrice(p.colors[0].compareAtPrice)}
                      </span>
                      <span className="text-sm font-bold tabular-nums">
                        {c.from} {formatPrice(p.colors[0].price)}
                      </span>
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-900/15 transition-colors duration-300 group-hover:bg-neutral-900 group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
