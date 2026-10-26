import type { Lang } from "./i18n";

export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Single source of truth for the FAQ: the accordion renders these and the
 * homepage emits them as FAQPage structured data, so the two cannot drift.
 * Placeholder copy — replace the answers as real policies are confirmed.
 */
export const faqItems: Record<Lang, FaqItem[]> = {
  en: [
    {
      question: "How are VUIS frames made?",
      answer:
        "Each frame is built around a robust steel core with a silver or gold coating, depending on the colour, encased in high-quality resin and finished with elegant gradient lenses.",
    },
    {
      question: "How long does shipping take, and what does it cost?",
      answer:
        "Orders leave the atelier within two working days. Mainland Portugal arrives in 2–3 working days, the rest of the EU in 3–6, and the rest of the world in 7–12. Shipping is free to every EU country; the rest of the world is a flat 20 €.",
    },
    {
      question: "Can I return or exchange a pair?",
      answer:
        "You have 30 days from delivery. Frames must be unworn and returned with the leather case and microfiber pouch. Engraved or custom orders are final sale. Email atelier@vuis.pt with your order number and we will send a return label.",
    },
    {
      question: "What is covered if something breaks?",
      answer:
        "Hinges carry a lifetime service: if one loosens or fails through normal wear, we repair or replace it. Accidental damage, scratched lenses, and general wear are not covered, but we can usually repair them at cost.",
    },
    {
      question: "Do you offer prescription lenses?",
      answer:
        "Not yet. Our frames are cut to standard optical dimensions, so most opticians can fit prescription lenses to them. A VUIS prescription service is planned — write to us if you would like to hear when it opens.",
    },
    {
      question: "How should I care for my frames?",
      answer:
        "Rinse with lukewarm water, dry with the supplied microfiber cloth, and store them in the case when not worn. Avoid leaving resin frames on a hot dashboard, which can relax the frame's shape over time.",
    },
    {
      question: "Which payment methods will you accept?",
      answer:
        "Checkout is being finalised. At launch it will accept the major cards, Apple Pay, and Google Pay, with prices charged in euro. This answer will be updated the moment payments go live.",
    },
  ],
  pt: [
    {
      question: "Como são feitas as armações VUIS?",
      answer:
        "Cada armação é construída em torno de um núcleo robusto em aço, com revestimento prateado ou dourado consoante a cor, envolta em resina de alta qualidade e rematada com elegantes lentes degradé.",
    },
    {
      question: "Quanto tempo demora o envio e quanto custa?",
      answer:
        "As encomendas saem do atelier em dois dias úteis. Em Portugal continental chegam em 2–3 dias úteis, no resto da UE em 3–6 e no resto do mundo em 7–12. O envio é gratuito para todos os países da UE; para o resto do mundo tem um custo fixo de 20 €.",
    },
    {
      question: "Posso devolver ou trocar um par?",
      answer:
        "Tem 30 dias a partir da entrega. As armações devem estar por usar e ser devolvidas com o estojo em pele e a bolsa de microfibra. Encomendas gravadas ou personalizadas não admitem devolução. Escreva para atelier@vuis.pt com o número da encomenda e enviaremos uma etiqueta de devolução.",
    },
    {
      question: "O que está coberto se algo partir?",
      answer:
        "As dobradiças têm assistência vitalícia: se uma ficar solta ou falhar com o uso normal, reparamo-la ou substituímo-la. Danos acidentais, lentes riscadas e desgaste geral não estão cobertos, mas normalmente podemos repará-los a preço de custo.",
    },
    {
      question: "Têm lentes graduadas?",
      answer:
        "Ainda não. As nossas armações seguem dimensões óticas padrão, pelo que a maioria das óticas consegue montar-lhes lentes graduadas. Está previsto um serviço de lentes graduadas VUIS — escreva-nos se quiser saber quando abrir.",
    },
    {
      question: "Como devo cuidar das minhas armações?",
      answer:
        "Passe por água morna, seque com o pano de microfibra incluído e guarde-as no estojo quando não as usar. Evite deixar armações de resina no tablier de um carro ao sol, o que pode deformar a armação com o tempo.",
    },
    {
      question: "Que métodos de pagamento vão aceitar?",
      answer:
        "O checkout está a ser finalizado. No lançamento aceitará os principais cartões, Apple Pay e Google Pay, com preços cobrados em euros. Esta resposta será atualizada assim que os pagamentos estiverem ativos.",
    },
  ],
};
