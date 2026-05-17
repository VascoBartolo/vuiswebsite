import { createFileRoute, Link } from "@tanstack/react-router";
import ScrollReveal from "@/components/ScrollReveal";
import heroNew from "@/assets/vuis-hero-bg.png";
import duo from "@/assets/vuis-duo.png";
import detail from "@/assets/vuis-clear-detail.png";
import clearBlue from "@/assets/vuis-clear-blue.png";

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
      {/* ── Fashion Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border/40">

        {/* Desktop: 3-column editorial layout */}
        <div className="hidden lg:grid lg:min-h-[100svh] lg:grid-cols-[5fr_6fr_5fr]">

          {/* Left — label + headline + CTAs */}
          <div className="animate-slide-left flex flex-col justify-between border-border/30 px-12 py-28">
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
                Atlantic Edition · Nº 01
              </p>
              <h1 className="mt-10 text-[clamp(2.8rem,3.2vw,4.2rem)] font-light leading-[1.05]">
                Eyewear,<br />
                shaped<br />
                by the<br />
                Azores.
              </h1>
            </div>

            <div className="space-y-5">
              <Link
                to="/products"
                className="flex h-12 w-full items-center justify-center bg-primary text-[10px] uppercase tracking-[0.45em] text-primary-foreground transition-colors duration-300 hover:bg-primary/85"
              >
                Shop Collection
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.45em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                Our story <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Center — full-bleed model image */}
          <div className="animate-img-reveal delay-200 relative overflow-hidden">
            <img
              src={heroNew}
              alt="Model wearing VUIS clear acetate sunglasses with blue gradient lenses"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>

          {/* Right — editorial copy + specs */}
          <div className="animate-slide-right delay-100 flex flex-col justify-between border-border/30 px-12 py-28">
            <p className="text-sm leading-[2.1] text-muted-foreground">
              A quiet study in<br />
              proportion and material.<br />
              Each frame is hand-finished<br />
              on the islands, in small<br />
              numbered series.
            </p>

            <dl className="space-y-8">
              {[
                { label: "Material",       value: "Italian Mazzucchelli Acetate" },
                { label: "Craftsmanship",  value: "Hand-finished, Azores PT" },
                { label: "Collection",     value: "From €189" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/60">{label}</dt>
                  <dd className="mt-2 text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Mobile: stacked layout */}
        <div className="lg:hidden">
          <div className="px-7 pt-20 pb-6">
            <p className="animate-fade-up text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
              Atlantic Edition · Nº 01
            </p>
            <h1 className="animate-fade-up delay-100 mt-6 text-5xl font-light leading-[1.05]">
              Eyewear, shaped by the Azores.
            </h1>
          </div>

          <div className="animate-img-reveal delay-200 relative w-full overflow-hidden h-[65vh]">
            <img
              src={heroNew}
              alt="Model wearing VUIS clear acetate sunglasses"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>

          <div className="animate-fade-up delay-300 px-7 py-10">
            <p className="text-sm leading-[2] text-muted-foreground">
              A quiet study in proportion and material. Each frame is hand-finished on the islands, in small numbered series, from Italian acetate.
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border/40 pt-8">
              {[
                { label: "Material",  value: "Italian Acetate" },
                { label: "Origin",    value: "Azores, PT" },
                { label: "From",      value: "€189" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/60">{label}</dt>
                  <dd className="mt-1.5 text-xs">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col gap-4">
              <Link
                to="/products"
                className="flex h-12 items-center justify-center bg-primary text-[10px] uppercase tracking-[0.4em] text-primary-foreground transition-colors hover:bg-primary/85"
              >
                Shop Collection
              </Link>
              <Link
                to="/contact"
                className="flex h-10 items-center justify-center text-[10px] uppercase tracking-[0.4em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Our story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────────────────── */}
      <section>
        <div className="mx-auto grid max-w-7xl gap-0 px-6 py-28 md:grid-cols-[1fr_1fr] md:gap-20 md:py-36">
          <ScrollReveal className="relative overflow-hidden">
            <img
              src={detail}
              alt="Detail of VUIS temple engraving"
              className="w-full object-cover"
            />
          </ScrollReveal>

          <ScrollReveal delay={150} className="flex flex-col justify-center pt-12 md:pt-0">
            <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">Maison VUIS</p>
            <h2 className="mt-6 text-4xl leading-[1.1] md:text-5xl">
              An archipelago<br />of details.
            </h2>
            <p className="mt-8 text-sm leading-[2] text-muted-foreground">
              Born in the heart of Terceira, VUIS was founded on a single belief:
              luxury is restraint. We design without ornament, leaving the acetate,
              the hinge, and the line of light to speak for themselves.
            </p>
            <p className="mt-5 text-sm leading-[2] text-muted-foreground">
              Every pair is assembled by hand, polished for three days, and finished
              with stainless steel optical hinges built to outlast a lifetime.
            </p>
            <Link
              to="/products"
              className="mt-10 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.45em] text-foreground transition-colors hover:text-muted-foreground"
            >
              Discover the collection <span aria-hidden>→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Featured ─────────────────────────────────────────────────── */}
      <section className="border-t border-border/40 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <ScrollReveal className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">Featured</p>
              <h2 className="mt-3 text-4xl leading-[1.1]">The signature pair.</h2>
            </div>
            <Link
              to="/products"
              className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground transition-colors hover:text-foreground"
            >
              View all →
            </Link>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-10">
            <ScrollReveal delay={80}>
              <Link to="/products" className="group block">
                <div className="overflow-hidden bg-muted/50">
                  <img
                    src={duo}
                    alt="VUIS Azor and Pico Noir side by side"
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-sm">The Atlantic Duo</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Faial Set · Both frames</p>
                  </div>
                  <span className="text-sm text-muted-foreground">€359</span>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={180}>
              <Link to="/products" className="group block">
                <div className="overflow-hidden bg-muted/50">
                  <img
                    src={clearBlue}
                    alt="VUIS Azor clear frame with blue gradient lenses"
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-sm">Azor</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Clear frame · Blue lenses</p>
                  </div>
                  <span className="text-sm text-muted-foreground">€189</span>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
