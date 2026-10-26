import { createFileRoute } from "@tanstack/react-router";
import { useCopy } from "@/lib/i18n";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({ meta: [{ title: "Refund Policy — VUIS" }] }),
  component: RefundPolicy,
});

const copy = {
  en: {
    eyebrow: "Policy",
    title: "Refund Policy",
    intro:
      "We accept returns within 30 days of delivery. Items must be unworn, in original condition, and accompanied by all original packaging including the leather case and microfiber pouch.",
    eligibilityHeading: "Eligibility",
    eligibilityBody:
      "Custom or engraved orders are final sale and cannot be refunded. Sale items are eligible for store credit only.",
    processHeading: "Process",
    processBefore: "Email",
    processAfter:
      "with your order number to request a return label. Refunds are issued to the original payment method within 7 business days of receipt at our atelier in Ponta Delgada.",
    damagedHeading: "Damaged or defective items",
    damagedBody:
      "Should your VUIS pair arrive damaged, contact us within 7 days and we will arrange a complimentary replacement.",
  },
  pt: {
    eyebrow: "Política",
    title: "Política de Reembolso",
    intro:
      "Aceitamos devoluções no prazo de 30 dias após a entrega. Os artigos não podem ter sido usados, devem estar no seu estado original e ser acompanhados de toda a embalagem original, incluindo o estojo em pele e a bolsa de microfibra.",
    eligibilityHeading: "Elegibilidade",
    eligibilityBody:
      "As encomendas personalizadas ou gravadas são vendas finais e não podem ser reembolsadas. Os artigos em saldo apenas são elegíveis para crédito em loja.",
    processHeading: "Processo",
    processBefore: "Envie um email para",
    processAfter:
      "com o número da sua encomenda para solicitar uma etiqueta de devolução. Os reembolsos são efetuados através do método de pagamento original no prazo de 7 dias úteis após a receção no nosso atelier em Ponta Delgada.",
    damagedHeading: "Artigos danificados ou defeituosos",
    damagedBody:
      "Caso o seu par VUIS chegue danificado, contacte-nos no prazo de 7 dias e providenciaremos uma substituição gratuita.",
  },
};

function RefundPolicy() {
  const c = useCopy(copy);

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-32 prose-sm">
      <div className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
        {c.eyebrow}
      </div>
      <h1 className="mt-4 text-5xl font-semibold tracking-[-0.03em]">
        {c.title}
      </h1>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>{c.intro}</p>
        <h2 className="text-2xl text-foreground">{c.eligibilityHeading}</h2>
        <p>{c.eligibilityBody}</p>
        <h2 className="text-2xl text-foreground">{c.processHeading}</h2>
        <p>
          {c.processBefore} atelier@vuis.pt {c.processAfter}
        </p>
        <h2 className="text-2xl text-foreground">{c.damagedHeading}</h2>
        <p>{c.damagedBody}</p>
      </div>
    </article>
  );
}
