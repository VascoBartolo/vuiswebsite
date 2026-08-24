import duo from "@/assets/vuis-duo.png";
import clearBlue from "@/assets/vuis-clear-blue.png";
import hero from "@/assets/vuis-hero.png";
import clearDetail from "@/assets/vuis-clear-detail.png";
import bothSide from "@/assets/vuis-both-side.png";
import blackDetail from "@/assets/vuis-black-detail.png";

export type ProductColor = {
  id: string;
  name: string;
  /** CSS background for the swatch dot */
  swatch: string;
  images: string[];
};

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  description: string;
  details: string[];
  /** Default gallery — mirrors the first colour's images */
  images: string[];
  colors: ProductColor[];
};

const crystalImages = [clearBlue, clearDetail, hero, bothSide];
const noirImages = [blackDetail, duo, bothSide];
const duoImages = [duo, bothSide, hero];

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
    images: crystalImages,
    colors: [
      {
        id: "crystal",
        name: "Crystal · Blue lenses",
        swatch: "linear-gradient(135deg, #E4E9ED 20%, #9DBBD8 90%)",
        images: crystalImages,
      },
      {
        id: "noir",
        name: "Noir · Smoke lenses",
        swatch: "#1C1917",
        images: noirImages,
      },
    ],
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
    images: noirImages,
    colors: [
      {
        id: "noir",
        name: "Polished Noir",
        swatch: "#1C1917",
        images: noirImages,
      },
      {
        id: "crystal",
        name: "Crystal Grey",
        swatch: "linear-gradient(135deg, #E4E9ED 20%, #B9C4CE 90%)",
        images: [clearBlue, clearDetail, bothSide],
      },
    ],
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
    images: duoImages,
    colors: [
      {
        id: "duo",
        name: "Clear & Noir · Complete pair",
        swatch: "linear-gradient(135deg, #E4E9ED 50%, #1C1917 50%)",
        images: duoImages,
      },
    ],
  },
];
