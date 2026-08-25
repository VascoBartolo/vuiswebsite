export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Single source of truth for the FAQ: the accordion renders these and the
 * homepage emits them as FAQPage structured data, so the two cannot drift.
 * Placeholder copy — replace the answers as real policies are confirmed.
 */
export const faqItems: FaqItem[] = [
  {
    question: "How are VUIS frames made?",
    answer:
      "Every frame is cut from a solid block of Italian Mazzucchelli acetate, then tumbled and hand-polished over three days until the material reaches a glass-like depth. Hinges are stainless steel and set by hand, and each pair is finished and numbered on Terceira island in the Azores.",
  },
  {
    question: "Are the lenses actually UV protective?",
    answer:
      "Yes. Every pair ships with CR-39 lenses rated 100% UV400, which blocks the full UVA and UVB range up to 400 nanometres. Gradient tints are dipped and graded by hand, so no two pairs are perfectly identical.",
  },
  {
    question: "How long does shipping take, and what does it cost?",
    answer:
      "Orders leave the atelier within two working days. Mainland Portugal arrives in 2–3 working days, the rest of the EU in 3–6, and the rest of the world in 7–12. Shipping is complimentary on orders over €200; otherwise it is a flat €12.",
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
      "Rinse with lukewarm water, dry with the supplied microfiber cloth, and store them in the case when not worn. Avoid leaving acetate on a hot dashboard, which can relax the frame's shape over time.",
  },
  {
    question: "Which payment methods will you accept?",
    answer:
      "Checkout is being finalised. At launch it will accept the major cards, Apple Pay, and Google Pay, with prices charged in euro. This answer will be updated the moment payments go live.",
  },
];
