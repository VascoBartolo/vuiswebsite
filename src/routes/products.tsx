import { createFileRoute } from "@tanstack/react-router";
import { useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { products, type Product } from "@/lib/products";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ProductDialog } from "@/components/ProductDialog";
import ScrollReveal from "@/components/ScrollReveal";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Collection — VUIS" },
      {
        name: "description",
        content: "The VUIS collection. Handcrafted minimal eyewear.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [active, setActive] = useState<Product | null>(null);

  const openProduct = (product: Product) => setActive(product);

  const handleProductKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    product: Product,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProduct(product);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* ambient orbs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] animate-orb rounded-full bg-[#EAD9BC] opacity-60 blur-[110px]" />
      <div className="pointer-events-none absolute -right-28 top-[30%] h-[400px] w-[400px] animate-orb-slow rounded-full bg-[#D7E3EE] opacity-50 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-32">
        <ScrollReveal className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
            Collection · 2026
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.03em] md:text-6xl">
            The <span className="text-gradient-warm">Atlantic Edition</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-neutral-500">
            Three pieces. One philosophy. Numbered, hand-finished in the Azores.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 100}>
              <article
                role="button"
                tabIndex={0}
                onClick={() => openProduct(p)}
                onKeyDown={(event) => handleProductKeyDown(event, p)}
                className="group block w-full cursor-pointer rounded-[1.75rem] border border-white/70 bg-white/70 p-3 text-left shadow-[0_4px_24px_rgba(80,60,30,0.07)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_-20px_rgba(80,60,30,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`View details for ${p.name}`}
              >
                <ProductCarousel
                  images={p.images}
                  alt={p.name}
                  viewportClassName="aspect-[4/5] rounded-[1.35rem]"
                />
                <div className="flex items-center justify-between px-3 py-4">
                  <div>
                    <p className="text-sm font-bold">{p.name}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {p.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-bold text-white">
                      €{p.price}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-900/15 transition-colors duration-300 group-hover:bg-neutral-900 group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ProductDialog
          product={active}
          open={!!active}
          onOpenChange={(o) => !o && setActive(null)}
        />
      </div>
    </div>
  );
}
