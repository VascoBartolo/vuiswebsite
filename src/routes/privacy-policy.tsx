import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [{ title: "Privacy Policy — VUIS" }] }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Policy</div>
      <h1 className="mt-4 text-5xl">Privacy Policy</h1>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>VUIS respects your privacy. We collect only the information necessary to fulfill your order and improve your experience with the maison.</p>
        <h2 className="text-2xl text-foreground">Information we collect</h2>
        <p>Name, email, shipping address, and payment details — provided by you at checkout. Browsing data is anonymized and used to refine the storefront.</p>
        <h2 className="text-2xl text-foreground">How we use it</h2>
        <p>To process orders, send order updates, and — only if you opt in — share occasional notes from the atelier. We never sell your data.</p>
        <h2 className="text-2xl text-foreground">Your rights</h2>
        <p>Under GDPR you may request access, correction, or deletion of your data at any time by writing to atelier@vuis.pt.</p>
        <h2 className="text-2xl text-foreground">Cookies</h2>
        <p>We use a minimal set of essential cookies to maintain your bag across sessions. No third-party advertising trackers are used.</p>
      </div>
    </article>
  );
}