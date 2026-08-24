import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — VUIS" }] }),
  component: ContactPage,
});

const inputClasses =
  "mt-2 w-full rounded-2xl border border-neutral-900/10 bg-white/70 px-4 text-sm backdrop-blur-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-neutral-900/20";

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-28 -top-24 h-[420px] w-[420px] animate-orb rounded-full bg-[#EAD9BC] opacity-60 blur-[110px]" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pb-24 pt-32 md:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
            Atelier VUIS
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.03em]">
            Get in <span className="text-gradient-warm">touch.</span>
          </h1>
          <p className="mt-6 max-w-md text-neutral-500">
            For private orders, press, or stockist inquiries — we reply within
            two working days.
          </p>
          <div className="mt-10 space-y-5 text-sm">
            <div className="glass rounded-2xl px-5 py-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
                Atelier
              </div>
              <div className="mt-1 font-medium">
                Rua da Sé nº14, Angra do Heroísmo, Terceira, Azores
              </div>
            </div>
            <div className="glass rounded-2xl px-5 py-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
                Email
              </div>
              <div className="mt-1 font-medium">atelier@vuis.pt</div>
            </div>
            <div className="glass rounded-2xl px-5 py-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
                Hours
              </div>
              <div className="mt-1 font-medium">
                Monday — Friday · 10:00 — 18:00 (WET)
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Message sent — obrigado.");
          }}
          className="space-y-5"
        >
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
              Name
              <input required className={`${inputClasses} h-12`} />
            </label>
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
              Email
              <input required type="email" className={`${inputClasses} h-12`} />
            </label>
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
              Message
              <textarea required rows={6} className={`${inputClasses} p-4`} />
            </label>
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-full bg-neutral-900 py-4 text-sm font-semibold text-white shadow-[0_20px_45px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.02]"
          >
            {sent ? "Sent" : "Send message"}
          </button>
        </form>
      </div>
    </div>
  );
}
