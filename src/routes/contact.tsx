import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — VUIS" }] }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2">
      <div>
        <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Atelier VUIS</div>
        <h1 className="mt-4 text-5xl">Get in touch.</h1>
        <p className="mt-6 text-muted-foreground">
          For private orders, press, or stockist inquiries — we reply within two working days.
        </p>
        <div className="mt-10 space-y-4 text-sm">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Atelier</div>
            <div className="mt-1">Rua da Sé nº14, Angra do Heroísmo, Terceira, Azores</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Email</div>
            <div className="mt-1">atelier@vuis.pt</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Hours</div>
            <div className="mt-1">Monday — Friday · 10:00 — 18:00 (WET)</div>
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
          <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Name</label>
          <input required className="mt-2 h-12 w-full border border-border bg-background px-4 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Email</label>
          <input required type="email" className="mt-2 h-12 w-full border border-border bg-background px-4 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Message</label>
          <textarea required rows={6} className="mt-2 w-full border border-border bg-background p-4 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <button type="submit" className="h-12 w-full bg-primary text-xs uppercase tracking-[0.3em] text-primary-foreground hover:bg-primary/90">
          {sent ? "Sent" : "Send message"}
        </button>
      </form>
    </div>
  );
}