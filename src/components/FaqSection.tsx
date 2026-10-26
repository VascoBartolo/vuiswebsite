import * as React from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { faqItems } from "@/lib/faq";
import { useCopy } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Questions",
    title: "Everything you",
    titleAccent: "might ask.",
    intro:
      "Build quality, shipping, returns and care. If something is missing, the atelier answers within two working days.",
    unsure: "Still unsure?",
    talk: "Talk to the atelier",
  },
  pt: {
    eyebrow: "Perguntas",
    title: "Tudo o que",
    titleAccent: "possa perguntar.",
    intro:
      "Qualidade, envios, devoluções e cuidados. Se faltar alguma coisa, o atelier responde em dois dias úteis.",
    unsure: "Ainda com dúvidas?",
    talk: "Fale com o atelier",
  },
};

export function FaqSection() {
  const c = useCopy(copy);
  const items = useCopy(faqItems);
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  // Reduced motion still opens and closes — it just does so instantly.
  const expand = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      id="faq"
      className="relative mx-auto max-w-4xl scroll-mt-28 px-6 pb-24"
    >
      <ScrollReveal className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
          {c.eyebrow}
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
          {c.title} <span className="text-gradient-warm">{c.titleAccent}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-neutral-500">
          {c.intro}
        </p>
      </ScrollReveal>

      <div className="mt-12 space-y-3">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;

          return (
            <ScrollReveal key={item.question} delay={i * 60}>
              <motion.div
                animate={{
                  backgroundColor: isOpen
                    ? "rgba(255,255,255,0.78)"
                    : "rgba(255,255,255,0.5)",
                }}
                transition={expand}
                className="overflow-hidden rounded-2xl border border-white/70 backdrop-blur-md"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-5 px-5 py-5 text-left md:px-6"
                  >
                    <span className="text-sm font-bold text-neutral-900 md:text-base">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{
                        rotate: isOpen ? 45 : 0,
                        backgroundColor: isOpen ? "#171717" : "rgba(0,0,0,0)",
                        color: isOpen ? "#ffffff" : "#171717",
                      }}
                      transition={expand}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-900/15"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={expand}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl px-5 pb-5 text-sm leading-relaxed text-neutral-500 md:px-6">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal delay={120}>
        <p className="mt-10 text-center text-sm text-neutral-500">
          {c.unsure}{" "}
          <Link
            to="/contact"
            className="cursor-pointer font-semibold text-neutral-900 underline underline-offset-4"
          >
            {c.talk}
          </Link>
          .
        </p>
      </ScrollReveal>
    </section>
  );
}
