import type { Lang } from "./i18n";

type Localized = Record<Lang, string>;

export type ProductColor = {
  id: string;
  name: Localized;
  /** CSS background for the swatch dot */
  swatch: string;
  /** Finish of the steel frame */
  metal: "silver" | "gold";
  price: number;
  /** Pre-launch price, shown struck through */
  compareAtPrice: number;
  /** Profile, close-up, details, on model */
  images: string[];
};

export type Product = {
  id: string;
  name: string;
  subtitle: Localized;
  description: Localized;
  dimensions: { label: Localized; value: string }[];
  /** Default gallery — mirrors the first colour's images */
  images: string[];
  colors: ProductColor[];
};

const shots = (file: string) =>
  ["profile", "closeup", "details", "model"].map(
    (view) => `/images/products/vuis-${file}-${view}.webp`,
  );

const silver = {
  metal: "silver",
  price: 39.99,
  compareAtPrice: 59.99,
} as const;
const gold = { metal: "gold", price: 49.99, compareAtPrice: 69.99 } as const;

const colors: ProductColor[] = [
  {
    id: "silver",
    name: { en: "Silver", pt: "Prata" },
    swatch: "linear-gradient(135deg, #C9CBCD 20%, #6F8FC4 90%)",
    images: shots("silver"),
    ...silver,
  },
  {
    id: "black",
    name: { en: "Noir", pt: "Noir" },
    swatch: "#1C1917",
    images: shots("black"),
    ...silver,
  },
  {
    id: "olive",
    name: { en: "Olive", pt: "Oliva" },
    swatch: "linear-gradient(135deg, #8FA582 20%, #8A6347 90%)",
    images: shots("green"),
    ...silver,
  },
  {
    id: "crystal",
    name: { en: "Crystal", pt: "Cristal" },
    swatch: "linear-gradient(135deg, #F1F3F4 20%, #A9D6EA 70%, #D9B56A 100%)",
    images: shots("transparent"),
    ...gold,
  },
  {
    id: "champagne",
    name: { en: "Champagne", pt: "Champanhe" },
    swatch: "linear-gradient(135deg, #E9D3A8 20%, #6E5A44 90%)",
    images: shots("beige"),
    ...gold,
  },
];

export const products: Product[] = [
  {
    id: "azor",
    name: "Azor",
    subtitle: {
      en: "Steel core · Resin frame · Gradient lenses",
      pt: "Núcleo em aço · Armação em resina · Lentes degradé",
    },
    description: {
      en: "Our signature square silhouette. A robust steel frame, encased in high-quality resin and finished with elegant gradient lenses — offered in five colours.",
      pt: "A nossa silhueta quadrada de assinatura. Uma armação robusta em aço, envolta em resina de alta qualidade e rematada com elegantes lentes degradé — disponível em cinco cores.",
    },
    dimensions: [
      {
        label: { en: "Frame width", pt: "Largura da armação" },
        value: "144 mm",
      },
      { label: { en: "Lens width", pt: "Largura da lente" }, value: "58 mm" },
      { label: { en: "Lens height", pt: "Altura da lente" }, value: "45 mm" },
      { label: { en: "Bridge", pt: "Ponte" }, value: "20 mm" },
      {
        label: { en: "Temple length", pt: "Comprimento da haste" },
        value: "150 mm",
      },
    ],
    images: colors[0].images,
    colors,
  },
];

/** The steel finish follows the chosen colour. */
export const materialsFor = (color: ProductColor, lang: Lang) =>
  lang === "pt"
    ? [
        `Armação robusta em aço com revestimento ${color.metal === "gold" ? "dourado" : "prateado"}`,
        "Envolta em resina de alta qualidade",
        "Elegantes lentes degradé",
      ]
    : [
        `Robust steel frame with a ${color.metal} coating`,
        "Encased in high-quality resin",
        "Elegant gradient lenses",
      ];

const euro = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
});

export const formatPrice = (value: number) => euro.format(value);
