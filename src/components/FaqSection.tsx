import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { faqItems } from "@/lib/faq";

export function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative mx-auto max-w-4xl scroll-mt-28 px-6 pb-24"
    >
      <ScrollReveal className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
          Questions
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
          Everything you <span className="text-gradient-warm">might ask.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-neutral-500">
          Build quality, shipping, returns and care. If something is missing,
          the atelier answers within two working days.
        </p>
      </ScrollReveal>

      <div className="mt-12 space-y-3">
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;

          return (
            <ScrollReveal key={item.question} delay={i * 60}>
              <div
                className={`overflow-hidden rounded-2xl border backdrop-blur-md transition-colors duration-300 ${
                  isOpen
                    ? "border-white/80 bg-white/75"
                    : "border-white/60 bg-white/50 hover:bg-white/70"
                }`}
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
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-900/15 transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-neutral-900 text-white" : ""
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-5 pb-5 md:px-6"
                >
                  <p className="max-w-2xl text-sm leading-relaxed text-neutral-500">
                    {item.answer}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal delay={120}>
        <p className="mt-10 text-center text-sm text-neutral-500">
          Still unsure?{" "}
          <Link
            to="/contact"
            className="cursor-pointer font-semibold text-neutral-900 underline underline-offset-4"
          >
            Talk to the atelier
          </Link>
          .
        </p>
      </ScrollReveal>
    </section>
  );
}
