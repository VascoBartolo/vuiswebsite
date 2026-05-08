import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({ meta: [{ title: "Refund Policy — VUIS" }] }),
  component: RefundPolicy,
});

function RefundPolicy() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 prose-sm">
      <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Policy</div>
      <h1 className="mt-4 text-5xl">Refund Policy</h1>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>We accept returns within 30 days of delivery. Items must be unworn, in original condition, and accompanied by all original packaging including the leather case and microfiber pouch.</p>
        <h2 className="text-2xl text-foreground">Eligibility</h2>
        <p>Custom or engraved orders are final sale and cannot be refunded. Sale items are eligible for store credit only.</p>
        <h2 className="text-2xl text-foreground">Process</h2>
        <p>Email atelier@vuis.pt with your order number to request a return label. Refunds are issued to the original payment method within 7 business days of receipt at our atelier in Ponta Delgada.</p>
        <h2 className="text-2xl text-foreground">Damaged or defective items</h2>
        <p>Should your VUIS pair arrive damaged, contact us within 7 days and we will arrange a complimentary replacement.</p>
      </div>
    </article>
  );
}