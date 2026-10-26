import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Gem, Truck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { FaqSection } from "@/components/FaqSection";
import { faqItems } from "@/lib/faq";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatPrice, products } from "@/lib/products";
import { useCopy, useLang } from "@/lib/i18n";
import duo from "@/assets/vuis-duo.png";
import blackDetail from "@/assets/vuis-black-detail.png";
import clearDetail from "@/assets/vuis-clear-detail.png";

/** FAQ rich-result data, built from the same source the accordion renders. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.en.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VUIS — Minimal Eyewear from the Azores" },
      {
        name: "description",
        content:
          "Minimal sunglasses from the Azores. Robust steel frames encased in high-quality resin, with elegant gradient lenses.",
      },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
    ],
  }),
  component: Index,
});

const EASE = [0.22, 1, 0.36, 1] as const;

/** Hero entrance — staggered by delay so the copy assembles top-down. */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

const copy = {
  en: {
    titleTop: "Made to see",
    titleBottom: "differently.",
    intro:
      "Eyewear from the Azores. Robust steel frames encased in high-quality resin, finished with elegant gradient lenses.",
    shop: "Shop the Collection",
    story: "Our Story",
    perks: "Free EU shipping · 30-day returns · Lifetime hinge service",
    heroAlt:
      "Model wearing VUIS Azor smoke grey sunglasses with blue gradient lenses",
    shipChip: "Free EU shipping",
    shipChipNote: "To every EU country",
    from: "from",
    launchChip: "Launch offer · Five colours",
    stats: [
      { value: "5", label: "Colours" },
      { value: "Steel", label: "Core" },
      { value: "Free", label: "EU Shipping" },
      { value: "30 days", label: "Returns" },
    ],
    craft: "Craft",
    craftTitle: "Engineered like optics.",
    craftAccent: "Finished like jewellery.",
    duoAlt:
      "VUIS Azor frames in Crystal and Noir stacked on a pale studio background",
    duoTitle: "Two signatures. One philosophy.",

    frameTitle: "Steel, encased in resin",
    frameText:
      "A robust steel frame with a silver or gold coating, encased in high-quality resin.",
    frameAlt: "Macro detail of a black VUIS temple with the engraved VUIS logo",
    lensTitle: "Gradient lenses",
    lensText: "Elegant gradient lenses, softening from deep tint to light.",
    lensAlt: "Close-up of the Azor crystal frame with blue gradient lenses",
    azoresTitle: "Designed in the Azores",
    azoresText:
      "Designed on Terceira island, between two shores of Atlantic light.",
    collection: "The collection",
    viewAll: "View all",
    sunglasses: "sunglasses",
    ctaKicker: "from the islands, for the light",
    ctaTitle: "Own the light.",
    ctaText:
      "Robust steel, high-quality resin and elegant gradient lenses, in five colours.",
    shopNow: "Shop Now",
  },
  pt: {
    titleTop: "Made to see",
    titleBottom: "differently.",
    intro:
      "Óculos dos Açores. Armações robustas em aço, envoltas em resina de alta qualidade e rematadas com elegantes lentes degradé.",
    shop: "Ver a Coleção",
    story: "A Nossa História",
    perks:
      "Envio gratuito na UE · Devoluções em 30 dias · Assistência vitalícia às dobradiças",
    heroAlt:
      "Modelo com óculos de sol VUIS Azor cinza fumo e lentes degradé azuis",
    shipChip: "Envio gratuito na UE",
    shipChipNote: "Para todos os países da UE",
    from: "desde",
    launchChip: "Oferta de lançamento · Cinco cores",
    stats: [
      { value: "5", label: "Cores" },
      { value: "Aço", label: "Núcleo" },
      { value: "Grátis", label: "Envio na UE" },
      { value: "30 dias", label: "Devoluções" },
    ],
    craft: "Ofício",
    craftTitle: "Concebidos como ótica.",
    craftAccent: "Acabados como joalharia.",
    duoAlt:
      "Armações VUIS Azor em Cristal e Noir sobre um fundo claro de estúdio",
    duoTitle: "Duas assinaturas. Uma filosofia.",

    frameTitle: "Aço, envolto em resina",
    frameText:
      "Uma armação robusta em aço com revestimento prateado ou dourado, envolta em resina de alta qualidade.",
    frameAlt: "Detalhe de uma haste VUIS preta com o logótipo VUIS gravado",
    lensTitle: "Lentes degradé",
    lensText: "Elegantes lentes degradé, do tom intenso à luz.",
    lensAlt: "Pormenor da armação Azor cristal com lentes degradé azuis",
    azoresTitle: "Desenhado nos Açores",
    azoresText:
      "Desenhados na ilha Terceira, entre duas margens de luz atlântica.",
    collection: "A coleção",
    viewAll: "Ver tudo",
    sunglasses: "óculos de sol",
    ctaKicker: "das ilhas, para a luz",
    ctaTitle: "A luz é sua.",
    ctaText:
      "Aço robusto, resina de alta qualidade e elegantes lentes degradé, em cinco cores.",
    shopNow: "Comprar",
  },
};

function Index() {
  const c = useCopy(copy);
  const { lang } = useLang();

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
            <motion.h1
              {...fadeUp(0.1)}
              className="text-5xl font-semibold leading-[0.96] tracking-[-0.035em] md:text-7xl xl:text-[5.75rem]"
            >
              <span className="text-gradient-warm">{c.titleTop}</span>
              <br />
              <span className="text-gradient-warm">{c.titleBottom}</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-neutral-500 md:mt-6 md:max-w-md md:text-lg lg:mx-0"
            >
              {c.intro}
            </motion.p>

            <motion.div
              {...fadeUp(0.3)}
              className="mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-9 md:gap-4 lg:justify-start"
            >
              <Link
                to="/products"
                className="cursor-pointer rounded-full bg-neutral-900 px-5 py-3 text-[13px] font-semibold text-white shadow-[0_20px_45px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.05] md:px-8 md:py-4 md:text-sm"
              >
                {c.shop}
              </Link>
              <Link
                to="/contact"
                className="glass flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-[13px] font-semibold text-neutral-800 transition-transform duration-300 hover:scale-[1.05] md:px-8 md:py-4 md:text-sm"
              >
                {c.story} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.p
              {...fadeUp(0.4)}
              className="mt-10 hidden text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-400 lg:block"
            >
              {c.perks}
            </motion.p>
          </div>

          {/* model stage */}
          <div className="relative">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[75%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(214,190,145,0.5),transparent)] blur-3xl" />

            <motion.img
              src="/images/products/vuis-silver-hero.webp"
              alt={c.heroAlt}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.3, delay: 0.3, ease: EASE }}
              className="relative mx-auto aspect-square h-[40svh] min-h-[300px] w-auto rounded-[2rem] object-cover contrast-[0.85] saturate-[0.9] shadow-[0_30px_70px_-30px_rgba(80,60,30,0.45)] md:h-[52svh] md:min-h-[360px] lg:h-[62svh]"
            />

            {/* Floating glass chips. The outer element carries the entrance so
                it joins the hero cascade; the inner one owns the perpetual
                float, keeping the two transforms from fighting each other. */}
            <motion.div
              {...fadeUp(0.55)}
              className="absolute -left-3 top-[8%] hidden md:block xl:-left-5"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="glass-float flex items-center gap-3.5 rounded-2xl px-5 py-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900/90 text-white">
                  <Truck className="h-5 w-5" />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-bold">{c.shipChip}</span>
                  <span className="block text-xs text-neutral-500">
                    {c.shipChipNote}
                  </span>
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              {...fadeUp(0.7)}
              className="absolute -right-2 bottom-[16%] hidden md:block xl:right-0"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{
                  duration: 7.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.4,
                }}
                className="glass-float flex items-center gap-3.5 rounded-2xl px-5 py-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C7D8E8]">
                  <Gem className="h-5 w-5 text-neutral-700" />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-bold">
                    Azor · {c.from} {formatPrice(products[0].colors[0].price)}
                  </span>
                  <span className="block text-xs text-neutral-500">
                    {c.launchChip}
                  </span>
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* stat glass row */}
        <motion.div
          {...fadeUp(0.5)}
          className="relative z-10 mt-6 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-4"
        >
          {c.stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl py-5 text-center">
              <p className="text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Bento ── */}
      <section className="relative mx-auto max-w-6xl px-6 py-24 md:py-28">
        <ScrollReveal className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
            {c.craft}
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            {c.craftTitle}
            <br />
            <span className="text-gradient-warm">{c.craftAccent}</span>
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {/* big image card */}
          <ScrollReveal className="md:col-span-2">
            <div className="group relative h-[420px] overflow-hidden rounded-[2rem]">
              <img
                src={duo}
                alt={c.duoAlt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div className="glass-dark absolute bottom-4 left-4 right-4 rounded-2xl px-6 py-4 text-white">
                <p className="text-sm font-bold">{c.duoTitle}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* frame card */}
          <ScrollReveal delay={120}>
            <div className="glass flex h-[420px] flex-col justify-between rounded-[2rem] p-6">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-white">
                  <Gem className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-tight">
                  {c.frameTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {c.frameText}
                </p>
              </div>
              <img
                src={blackDetail}
                alt={c.frameAlt}
                loading="lazy"
                className="h-44 w-full rounded-2xl object-cover"
              />
            </div>
          </ScrollReveal>

          {/* lenses card */}
          <ScrollReveal delay={80}>
            <div className="glass flex h-[340px] flex-col justify-between rounded-[2rem] p-6">
              <div>
                <h3 className="text-xl font-bold tracking-tight">
                  {c.lensTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {c.lensText}
                </p>
              </div>
              <img
                src={clearDetail}
                alt={c.lensAlt}
                loading="lazy"
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
                    {c.azoresTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {c.azoresText}
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

      {/* ── Collection carousel ── */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <ScrollReveal className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            {c.collection}
          </h2>
          <Link
            to="/products"
            className="flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-900"
          >
            {c.viewAll} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Carousel
            opts={{ align: "start", loop: true }}
            className="mt-8 px-1 md:px-0"
          >
            <CarouselContent className="-ml-5">
              {products.map((p) => (
                <CarouselItem
                  key={p.id}
                  className="basis-full pl-5 sm:basis-1/2 lg:basis-1/3"
                >
                  <Link
                    to="/products/$productId"
                    params={{ productId: p.id }}
                    className="group block cursor-pointer"
                  >
                    <div className="rounded-[1.75rem] border border-white/70 bg-white/70 p-3 shadow-[0_4px_24px_rgba(80,60,30,0.07)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_-20px_rgba(80,60,30,0.35)]">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-[#F0EBE1]">
                        <img
                          src={p.images[0]}
                          alt={`VUIS ${p.name} ${c.sunglasses} — ${p.subtitle[lang].toLowerCase()}`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />
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
                        <span className="rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-bold text-white">
                          {c.from} {formatPrice(p.colors[0].price)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="glass-strong -left-3 h-11 w-11 border-white/70 text-neutral-800 transition-transform hover:scale-110 hover:bg-neutral-900 hover:text-white md:-left-5" />
            <CarouselNext className="glass-strong -right-3 h-11 w-11 border-white/70 text-neutral-800 transition-transform hover:scale-110 hover:bg-neutral-900 hover:text-white md:-right-5" />
          </Carousel>
        </ScrollReveal>
      </section>

      {/* ── FAQ ── */}
      <FaqSection />

      {/* ── CTA panel ── */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24 md:pb-28">
        <ScrollReveal>
          <div className="glass-shine relative overflow-hidden rounded-[3rem] bg-[linear-gradient(115deg,#171412_0%,#403627_55%,#171412_100%)] px-8 py-20 text-center">
            <p className="font-serif-italic text-lg text-[#CBB588]">
              {c.ctaKicker}
            </p>
            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.03em] text-white md:text-6xl">
              {c.ctaTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/60">
              {c.ctaText}
            </p>
            <Link
              to="/products"
              className="mt-9 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-neutral-900 transition-transform duration-300 hover:scale-[1.05]"
            >
              {c.shopNow} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
