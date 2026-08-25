import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — VUIS" }] }),
  component: ContactPage,
});

const inputClasses =
  "mt-2 w-full rounded-2xl border border-neutral-900/10 bg-white/70 px-4 text-sm backdrop-blur-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-neutral-900/20";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Cascades its children in. Nested containers inherit the parent's animate
 * state, so the two columns stagger against each other and each column then
 * staggers its own contents.
 */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const details = [
  {
    label: "Atelier",
    value: "Rua da Sé nº14, Angra do Heroísmo, Terceira, Azores",
  },
  { label: "Email", value: "atelier@vuis.pt" },
  { label: "Hours", value: "Monday — Friday · 10:00 — 18:00 (WET)" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-28 -top-24 h-[420px] w-[420px] animate-orb rounded-full bg-[#EAD9BC] opacity-60 blur-[110px]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid max-w-6xl gap-14 px-6 pb-24 pt-32 md:grid-cols-2"
      >
        <motion.div variants={container}>
          <motion.p
            variants={item}
            className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]"
          >
            Atelier VUIS
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-4 text-5xl font-semibold tracking-[-0.03em]"
          >
            Get in <span className="text-gradient-warm">touch.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-md text-neutral-500">
            For private orders, press, or stockist inquiries — we reply within
            two working days.
          </motion.p>

          <motion.div variants={container} className="mt-10 space-y-5 text-sm">
            {details.map((d) => (
              <motion.div
                key={d.label}
                variants={item}
                className="glass rounded-2xl px-5 py-4"
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
                  {d.label}
                </div>
                <div className="mt-1 font-medium">{d.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.form
          variants={container}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Message sent — obrigado.");
          }}
          className="space-y-5"
        >
          <motion.div variants={item}>
            <label
              htmlFor="contact-name"
              className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400"
            >
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              className={`${inputClasses} h-12`}
            />
          </motion.div>

          <motion.div variants={item}>
            <label
              htmlFor="contact-email"
              className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400"
            >
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`${inputClasses} h-12`}
            />
          </motion.div>

          <motion.div variants={item}>
            <label
              htmlFor="contact-message"
              className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              className={`${inputClasses} p-4`}
            />
          </motion.div>

          <motion.button
            variants={item}
            type="submit"
            className="w-full cursor-pointer rounded-full bg-neutral-900 py-4 text-sm font-semibold text-white shadow-[0_20px_45px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.02]"
          >
            {sent ? "Sent" : "Send message"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
