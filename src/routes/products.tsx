import { createFileRoute } from "@tanstack/react-router";
import { useState, type KeyboardEvent } from "react";
import { products, type Product } from "@/lib/products";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ProductDialog } from "@/components/ProductDialog";
import ScrollReveal from "@/components/ScrollReveal";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Collection — VUIS" },
      { name: "description", content: "The VUIS collection. Handcrafted minimal eyewear." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [active, setActive] = useState<Product | null>(null);

  const openProduct = (product: Product) => setActive(product);

  const handleProductKeyDown = (event: KeyboardEvent<HTMLElement>, product: Product) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProduct(product);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <ScrollReveal className="text-center">
        <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Collection · 2026</div>
        <h1 className="mt-4 text-5xl md:text-6xl">The Atlantic Edition</h1>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Three pieces. One philosophy. Numbered, hand-finished in the Azores.
        </p>
      </ScrollReveal>

      <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * 100}>
            <article
              role="button"
              tabIndex={0}
              onClick={() => openProduct(p)}
              onKeyDown={(event) => handleProductKeyDown(event, p)}
              className="group block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`View details for ${p.name}`}
            >
              <ProductCarousel images={p.images} alt={p.name} />
              <div className="mt-5 flex items-baseline justify-between">
                <div>
                  <div className="text-base">{p.name}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {p.subtitle}
                  </div>
                </div>
                <div className="text-sm">€{p.price}</div>
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground group-hover:text-foreground">
                View details →
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <ProductDialog product={active} open={!!active} onOpenChange={(o) => !o && setActive(null)} />
    </div>
  );
}
