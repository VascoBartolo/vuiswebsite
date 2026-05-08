import { createFileRoute, Link } from "@tanstack/react-router";
import ScrollReveal from "@/components/ScrollReveal";
import hero from "@/assets/vuis-hero.png";
import duo from "@/assets/vuis-duo.png";
import detail from "@/assets/vuis-clear-detail.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VUIS — Minimal Eyewear from the Azores" },
      { name: "description", content: "Handcrafted luxury sunglasses from the Azores. Italian acetate, Atlantic light." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
          <ScrollReveal>
            <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Atlantic Edition · Nº 01
            </div>
            <h1 className="mt-6 text-5xl leading-[1.05] md:text-7xl">
              Eyewear, shaped by the Azores.
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground">
              VUIS is a quiet study in proportion and material. Each frame is hand-finished
              on the islands, in small numbered series, from Italian acetate.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <Link
                to="/products"
                className="inline-flex h-12 items-center justify-center bg-primary px-8 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Shop Collection
              </Link>
              <Link
                to="/contact"
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
              >
                Our story →
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150} className="relative">
            <img src={hero} alt="VUIS clear acetate sunglasses with blue gradient lenses" className="w-full object-cover" />
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2">
          <ScrollReveal>
            <img src={detail} alt="Detail of VUIS temple engraving" className="w-full" />
          </ScrollReveal>
          <ScrollReveal delay={150} className="flex flex-col justify-center">
            <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Maison VUIS</div>
            <h2 className="mt-6 text-4xl md:text-5xl">An archipelago of details.</h2>
            <p className="mt-6 text-muted-foreground">
              Born in the heart of Terceira, VUIS was founded on a single belief: luxury
              is restraint. We design without ornament, leaving the acetate, the hinge, and
              the line of light to speak for themselves.
            </p>
            <p className="mt-4 text-muted-foreground">
              Every pair is assembled by hand, polished for three days, and finished with
              stainless steel optical hinges built to outlast a lifetime.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <ScrollReveal className="flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Featured</div>
            <h2 className="mt-3 text-4xl">The signature pair.</h2>
          </div>
          <Link to="/products" className="text-xs uppercase tracking-[0.3em] hover:underline">
            View all
          </Link>
        </ScrollReveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <ScrollReveal delay={100}><Link to="/products" className="group block">
            <div className="overflow-hidden bg-muted/40">
              <img src={duo} alt="VUIS Azor and Pico Noir" className="w-full transition-transform duration-700 group-hover:scale-[1.02]" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm">The Atlantic Duo</span>
              <span className="text-sm text-muted-foreground">€359</span>
            </div>
          </Link></ScrollReveal>
          <ScrollReveal delay={200}><Link to="/products" className="group block">
            <div className="overflow-hidden bg-muted/40">
              <img src={hero} alt="VUIS Azor clear" className="w-full transition-transform duration-700 group-hover:scale-[1.02]" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm">Azor · Clear / Blue</span>
              <span className="text-sm text-muted-foreground">€189</span>
            </div>
          </Link></ScrollReveal>
        </div>
      </section>
    </div>
  );
}
