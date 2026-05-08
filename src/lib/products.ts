import duo from "@/assets/vuis-duo.png";
import clearBlue from "@/assets/vuis-clear-blue.png";
import hero from "@/assets/vuis-hero.png";
import clearDetail from "@/assets/vuis-clear-detail.png";
import bothSide from "@/assets/vuis-both-side.png";
import blackDetail from "@/assets/vuis-black-detail.png";

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  description: string;
  details: string[];
  images: string[];
};

export const products: Product[] = [
  {
    id: "azor-clear-blue",
    name: "Azor",
    subtitle: "Clear frame · Blue lenses",
    price: 189,
    description:
      "Inspired by the volcanic clarity of the Atlantic, the Azor pairs a translucent acetate frame with hand-tinted blue gradient lenses.",
    details: [
      "Italian Mazzucchelli acetate",
      "CR-39 gradient lenses · 100% UV400",
      "Stainless steel optical hinges",
      "Handcrafted in limited series",
    ],
    images: [clearBlue, clearDetail, hero, bothSide],
  },
  {
    id: "pico-noir",
    name: "Pico Noir",
    subtitle: "Polished black · Smoke lenses",
    price: 209,
    description:
      "A nod to the silhouettes of Pico island. Deep black acetate sculpted into our signature square keyhole shape.",
    details: [
      "Italian Mazzucchelli acetate",
      "CR-39 smoke lenses · 100% UV400",
      "Stainless steel optical hinges",
      "Engraved temple logo",
    ],
    images: [blackDetail, duo, bothSide],
  },
  {
    id: "faial-duo",
    name: "Faial Duo Set",
    subtitle: "The complete pair · Clear & Noir",
    price: 359,
    description:
      "Both signatures, presented together in a hand-stitched leather case. Day to dusk, in the Azorean tradition.",
    details: [
      "Set of two frames",
      "Hand-stitched leather case",
      "Microfiber pouches included",
      "Lifetime hinge service",
    ],
    images: [duo, bothSide, hero],
  },
];
