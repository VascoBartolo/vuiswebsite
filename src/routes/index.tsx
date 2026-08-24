import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Gem, ShieldCheck, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { products } from "@/lib/products";
import heroModel from "@/assets/vuis-hero-bg.png";
import duo from "@/assets/vuis-duo.png";
import blackDetail from "@/assets/vuis-black-detail.png";
import clearDetail from "@/assets/vuis-clear-detail.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VUIS — Minimal Eyewear from the Azores" },
      {
        name: "description",
        content:
          "Handcrafted luxury sunglasses from the Azores. Italian acetate, Atlantic light.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "100%", label: "UV400 Filter" },
  { value: "72 h", label: "Hand Polish" },
  { value: "Nº 500", label: "Numbered Series" },
  { value: "∞", label: "Hinge Warranty" },
];

function Index() {
  return (
    <div className="relative overflow-hidden">
      {/* ── Ambient orbs ── */}
      <div className="pointer-events-none absolute -left-24 -top-32 h-[520px] w-[520px] animate-orb rounded-full bg-[#EAD9BC] opacity-70 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 top-[16%] h-[460px] w-[460px] animate-orb-slow rounded-full bg-[#D7E3EE] opacity-60 blur-[110px]" />
      <div className="pointer-events-none absolute -left-20 top-[58%] h-[420px] w-[420px] animate-orb rounded-full bg-[#E9E0CC] opacity-60 blur-[110px]" />

      {/* ── Hero ── */}
      <section className="relative mx-auto max-w-7xl px-6 pb-4 pt-24 md:pt-32">
        <div className="grid items-center gap-6 lg:grid-cols-[1.08fr_1fr]">
          {/* copy */}
          <div className="text-center lg:text-left">
            <div className="glass animate-fade-up inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-600 md:px-5 md:py-2.5 md:text-[11px]">
              <Sparkles className="h-3.5 w-3.5 text-[#A98B54]" />
              Atlantic Edition · Nº 01
            </div>

            <h1 className="animate-fade-up delay-100 mt-6 text-5xl font-semibold leading-[0.96] tracking-[-0.035em] md:mt-7 md:text-7xl xl:text-[5.75rem]">
              <span className="text-gradient-warm">Clarity,</span>
              <br />
              <span className="text-gradient-warm">redefined.</span>
            </h1>

            <p className="animate-fade-up delay-200 mx-auto mt-4 max-w-xs text-sm leading-relaxed text-neutral-500 md:mt-6 md:max-w-md md:text-lg lg:mx-0">
              Hand-finished eyewear from the Azores. Italian acetate,
              hand-tinted gradient lenses, and hardware built for a lifetime of
              light.
            </p>

            <div className="animate-fade-up delay-300 mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-9 md:gap-4 lg:justify-start">
              <Link
                to="/products"
                className="cursor-pointer rounded-full bg-neutral-900 px-5 py-3 text-[13px] font-semibold text-white shadow-[0_20px_45px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.05] md:px-8 md:py-4 md:text-sm"
              >
                Shop the Collection
              </Link>
              <Link
                to="/contact"
                className="glass flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-[13px] font-semibold text-neutral-800 transition-transform duration-300 hover:scale-[1.05] md:px-8 md:py-4 md:text-sm"
              >
                Our Story <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="animate-fade-up delay-400 mt-10 hidden text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-400 lg:block">
              Free EU shipping · 30-day returns · Lifetime hinge service
            </p>
          </div>

          {/* model stage */}
          <div className="relative">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[75%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(214,190,145,0.5),transparent)] blur-3xl" />

            <img
              src={heroModel}
              alt="Model wearing VUIS Azor clear acetate sunglasses with blue gradient lenses"
              className="animate-img-reveal delay-300 relative mx-auto h-[40svh] min-h-[300px] w-auto object-contain md:h-[52svh] md:min-h-[360px] lg:h-[62svh]"
            />

            {/* floating glass chips */}
            <div className="glass-strong animate-float absolute -left-3 top-[8%] hidden items-center gap-3.5 rounded-2xl px-5 py-4 md:flex xl:-left-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900/90 text-white">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span className="text-left">
                <span className="block text-sm font-bold">UV 400</span>
                <span className="block text-xs text-neutral-500">
                  Total protection
                </span>
              </span>
            </div>

            <div className="glass-strong animate-float-delayed absolute -right-2 bottom-[16%] hidden items-center gap-3.5 rounded-2xl px-5 py-4 md:flex xl:right-0">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C7D8E8]">
                <Gem className="h-5 w-5 text-neutral-700" />
              </span>
              <span className="text-left">
                <span className="block text-sm font-bold">Azor · €189</span>
                <span className="block text-xs text-neutral-500">
                  Clear / Blue gradient
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* stat glass row */}
        <div className="animate-fade-up delay-500 relative z-10 mt-6 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl py-5 text-center">
              <p className="text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bento ── */}
      <section className="relative mx-auto max-w-6xl px-6 py-24 md:py-28">
        <ScrollReveal className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
            Craft
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            Engineered like optics.
            <br />
            <span className="text-gradient-warm">Finished like jewellery.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {/* big image card */}
          <ScrollReveal className="md:col-span-2">
            <div className="group relative h-[420px] overflow-hidden rounded-[2rem]">
              <img
                src={duo}
                alt="VUIS Azor and Pico Noir stacked"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div className="glass-dark absolute bottom-4 left-4 right-4 rounded-2xl px-6 py-4 text-white">
                <p className="text-sm font-bold">
                  Two signatures. One philosophy.
                </p>
                <p className="mt-0.5 text-xs text-white/70">
                  Azor &amp; Pico Noir — numbered, hand-finished on Terceira.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* acetate card */}
          <ScrollReveal delay={120}>
            <div className="glass flex h-[420px] flex-col justify-between rounded-[2rem] p-6">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-white">
                  <Gem className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-tight">
                  Mazzucchelli acetate
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  Cut from Italian cellulose blocks, polished for three days to
                  a glass-like depth.
                </p>
              </div>
              <img
                src={blackDetail}
                alt="Macro detail of Pico Noir acetate"
                className="h-44 w-full rounded-2xl object-cover"
              />
            </div>
          </ScrollReveal>

          {/* lenses card */}
          <ScrollReveal delay={80}>
            <div className="glass flex h-[340px] flex-col justify-between rounded-[2rem] p-6">
              <div>
                <h3 className="text-xl font-bold tracking-tight">
                  Hand-tinted lenses
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  CR-39 gradient lenses, dipped and graded by hand.
                </p>
              </div>
              <img
                src={clearDetail}
                alt="Detail of the Azor clear frame"
                className="h-40 w-full rounded-2xl object-cover"
              />
            </div>
          </ScrollReveal>

          {/* Azores card */}
          <ScrollReveal delay={160} className="md:col-span-2">
            <div className="glass-shine relative flex h-[340px] items-center overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#191613_0%,#3B3226_55%,#191613_100%)] px-8 md:px-12">
              <div className="relative z-10 flex w-full flex-wrap items-center justify-between gap-8">
                <div className="max-w-sm">
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    Made in the Azores
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    Designed and assembled on Terceira island, between two
                    shores of Atlantic light.
                  </p>
                </div>
                <p className="font-serif-italic text-gradient-sand text-6xl md:text-7xl">
                  Terceira
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Collection rail ── */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <ScrollReveal className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            The collection
          </h2>
          <Link
            to="/products"
            className="flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-900"
          >
            View all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>

        <div className="mt-8 flex snap-x gap-5 overflow-x-auto pb-4">
          {products.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 100} className="snap-start">
              <Link
                to="/products"
                className="group block w-[290px] shrink-0 cursor-pointer"
              >
                <div className="rounded-[1.75rem] border border-white/70 bg-white/70 p-3 shadow-[0_4px_24px_rgba(80,60,30,0.07)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_-20px_rgba(80,60,30,0.35)]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-[#F0EBE1]">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="flex items-center justify-between px-3 py-4">
                    <div>
                      <p className="text-sm font-bold">{p.name}</p>
                      <p className="mt-0.5 text-xs text-neutral-500">
                        {p.subtitle}
                      </p>
                    </div>
                    <span className="rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-bold text-white">
                      €{p.price}
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CTA panel ── */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24 md:pb-28">
        <ScrollReveal>
          <div className="glass-shine relative overflow-hidden rounded-[3rem] bg-[linear-gradient(115deg,#171412_0%,#403627_55%,#171412_100%)] px-8 py-20 text-center">
            <p className="font-serif-italic text-lg text-[#CBB588]">
              from the islands, for the light
            </p>
            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.03em] text-white md:text-6xl">
              Own the light.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/60">
              Every pair ships in a hand-stitched leather case, numbered and
              signed on the temple.
            </p>
            <Link
              to="/products"
              className="mt-9 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-neutral-900 transition-transform duration-300 hover:scale-[1.05]"
            >
              Shop Now <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
