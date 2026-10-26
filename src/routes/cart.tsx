import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { useCopy, useLang } from "@/lib/i18n";
import { formatPrice } from "@/lib/products";
import { ArrowUpRight, Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Bag — VUIS" }] }),
  component: CartPage,
});

const copy = {
  en: {
    yourBag: "Your bag",
    emptyTitle: "Your bag is",
    emptyAccent: "empty.",
    begin: "Begin with the Atlantic Edition.",
    shop: "Shop the Collection",
    inColour: "in",
    remove: "Remove",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    summary: "Order summary",
    subtotal: "Subtotal",
    shipTo: "Shipping to",
    eu: "European Union",
    world: "Rest of the world",
    shipping: "Shipping",
    free: "Complimentary",
    total: "Total",
    placed: "Order placed — thank you.",
    checkout: "Checkout",
    continue: "Continue shopping",
  },
  pt: {
    yourBag: "O seu saco",
    emptyTitle: "O seu saco está",
    emptyAccent: "vazio.",
    begin: "Comece pela Atlantic Edition.",
    shop: "Ver a Coleção",
    inColour: "em",
    remove: "Remover",
    decrease: "Diminuir quantidade",
    increase: "Aumentar quantidade",
    summary: "Resumo da encomenda",
    subtotal: "Subtotal",
    shipTo: "Envio para",
    eu: "União Europeia",
    world: "Resto do mundo",
    shipping: "Envio",
    free: "Gratuito",
    total: "Total",
    placed: "Encomenda efetuada — obrigado.",
    checkout: "Finalizar compra",
    continue: "Continuar a comprar",
  },
};

/** Free across the EU, flat rate everywhere else. */
const SHIPPING = { eu: 0, world: 20 } as const;

function CartPage() {
  const { detailed, subtotal, setQty, remove, clear } = useCart();
  const c = useCopy(copy);
  const { lang } = useLang();
  const [destination, setDestination] = useState<keyof typeof SHIPPING>("eu");

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-44 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
          {c.yourBag}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
          {c.emptyTitle}{" "}
          <span className="text-gradient-warm">{c.emptyAccent}</span>
        </h1>
        <p className="mt-4 text-neutral-500">{c.begin}</p>
        <Link
          to="/products"
          className="mt-10 inline-flex cursor-pointer items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_45px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.05]"
        >
          {c.shop} <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const shipping = SHIPPING[destination];
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <h1 className="text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
        {c.yourBag}
      </h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {detailed.map(({ product, color, quantity, lineTotal }) => (
            <div
              key={`${product.id}-${color?.id ?? "default"}`}
              className="flex gap-5 rounded-[1.75rem] border border-white/70 bg-white/70 p-4 shadow-[0_4px_24px_rgba(80,60,30,0.07)] backdrop-blur-md"
            >
              <Link
                to="/products/$productId"
                params={{ productId: product.id }}
                className="shrink-0 cursor-pointer"
              >
                <img
                  src={color?.images[0] ?? product.images[0]}
                  alt={`VUIS ${product.name}${color ? ` ${c.inColour} ${color.name[lang]}` : ""}`}
                  loading="lazy"
                  className="h-28 w-28 rounded-2xl bg-[#F0EBE1] object-cover md:h-32 md:w-32"
                />
              </Link>
              <div className="flex flex-1 flex-col py-1">
                <div className="flex items-start justify-between">
                  <div>
                    <Link
                      to="/products/$productId"
                      params={{ productId: product.id }}
                      className="cursor-pointer text-sm font-bold hover:underline"
                    >
                      {product.name}
                    </Link>
                    <div className="mt-0.5 text-xs text-neutral-500">
                      {product.subtitle[lang]}
                    </div>
                    {color && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-neutral-500">
                        <span
                          className="h-3 w-3 rounded-full border border-neutral-900/15"
                          style={{ background: color.swatch }}
                        />
                        {color.name[lang]}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => remove(product.id, color?.id)}
                    aria-label={c.remove}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-900/5 hover:text-neutral-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-neutral-900/15">
                    <button
                      onClick={() =>
                        setQty(product.id, quantity - 1, color?.id)
                      }
                      className="cursor-pointer rounded-full p-2.5 transition-colors hover:bg-neutral-900/5"
                      aria-label={c.decrease}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQty(product.id, quantity + 1, color?.id)
                      }
                      className="cursor-pointer rounded-full p-2.5 transition-colors hover:bg-neutral-900/5"
                      aria-label={c.increase}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="text-sm font-bold tabular-nums">
                    {formatPrice(lineTotal)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="glass h-fit rounded-[1.75rem] p-7">
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
            {c.summary}
          </div>
          <div
            role="radiogroup"
            aria-label={c.shipTo}
            className="mt-5 grid grid-cols-2 rounded-full border border-neutral-900/10 p-1 text-xs font-semibold"
          >
            {(["eu", "world"] as const).map((d) => (
              <button
                key={d}
                type="button"
                role="radio"
                aria-checked={destination === d}
                onClick={() => setDestination(d)}
                className={`cursor-pointer rounded-full px-3 py-2 transition-colors duration-300 ${
                  destination === d
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {c[d]}
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between font-medium">
              <span>{c.subtotal}</span>
              <span className="tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>{c.shipping}</span>
              <span>{shipping === 0 ? c.free : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-900/10 pt-3 text-base font-bold">
              <span>{c.total}</span>
              <span className="tabular-nums">{formatPrice(total)}</span>
            </div>
          </div>
          <button
            onClick={() => {
              toast.success(c.placed);
              clear();
            }}
            className="mt-7 w-full cursor-pointer rounded-full bg-neutral-900 py-4 text-sm font-semibold text-white shadow-[0_20px_45px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.02]"
          >
            {c.checkout}
          </button>
          <Link
            to="/products"
            className="mt-4 block cursor-pointer text-center text-xs font-semibold text-neutral-500 transition-colors hover:text-neutral-900"
          >
            {c.continue}
          </Link>
        </aside>
      </div>
    </div>
  );
}
