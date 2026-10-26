import { createFileRoute } from "@tanstack/react-router";
import { useCopy } from "@/lib/i18n";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [{ title: "Privacy Policy — VUIS" }] }),
  component: PrivacyPolicy,
});

const copy = {
  en: {
    eyebrow: "Policy",
    title: "Privacy Policy",
    intro:
      "VUIS respects your privacy. We collect only the information necessary to fulfill your order and improve your experience with the maison.",
    collectHeading: "Information we collect",
    collectBody:
      "Name, email, shipping address, and payment details — provided by you at checkout. Browsing data is anonymized and used to refine the storefront.",
    useHeading: "How we use it",
    useBody:
      "To process orders, send order updates, and — only if you opt in — share occasional notes from the atelier. We never sell your data.",
    rightsHeading: "Your rights",
    rightsBefore:
      "Under GDPR you may request access, correction, or deletion of your data at any time by writing to",
    rightsAfter: ".",
    cookiesHeading: "Cookies",
    cookiesBody:
      "We use a minimal set of essential cookies to maintain your bag across sessions. No third-party advertising trackers are used.",
  },
  pt: {
    eyebrow: "Política",
    title: "Política de Privacidade",
    intro:
      "A VUIS respeita a sua privacidade. Recolhemos apenas as informações necessárias para processar a sua encomenda e melhorar a sua experiência com a maison.",
    collectHeading: "Informações que recolhemos",
    collectBody:
      "Nome, email, morada de envio e dados de pagamento — fornecidos por si no checkout. Os dados de navegação são anonimizados e utilizados para aperfeiçoar a loja.",
    useHeading: "Como as utilizamos",
    useBody:
      "Para processar encomendas, enviar atualizações sobre as encomendas e — apenas se der o seu consentimento — partilhar notas ocasionais do atelier. Nunca vendemos os seus dados.",
    rightsHeading: "Os seus direitos",
    rightsBefore:
      "Ao abrigo do RGPD, pode solicitar o acesso, a retificação ou o apagamento dos seus dados em qualquer momento, escrevendo para",
    rightsAfter: ".",
    cookiesHeading: "Cookies",
    cookiesBody:
      "Utilizamos um conjunto mínimo de cookies essenciais para manter o seu saco entre sessões. Não são utilizados rastreadores publicitários de terceiros.",
  },
};

function PrivacyPolicy() {
  const c = useCopy(copy);

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <div className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
        {c.eyebrow}
      </div>
      <h1 className="mt-4 text-5xl font-semibold tracking-[-0.03em]">
        {c.title}
      </h1>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>{c.intro}</p>
        <h2 className="text-2xl text-foreground">{c.collectHeading}</h2>
        <p>{c.collectBody}</p>
        <h2 className="text-2xl text-foreground">{c.useHeading}</h2>
        <p>{c.useBody}</p>
        <h2 className="text-2xl text-foreground">{c.rightsHeading}</h2>
        <p>
          {c.rightsBefore} atelier@vuis.pt{c.rightsAfter}
        </p>
        <h2 className="text-2xl text-foreground">{c.cookiesHeading}</h2>
        <p>{c.cookiesBody}</p>
      </div>
    </article>
  );
}
