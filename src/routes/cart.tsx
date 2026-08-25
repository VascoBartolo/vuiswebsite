import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { ArrowUpRight, Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Bag — VUIS" }] }),
  component: CartPage,
});

function CartPage() {
  const { detailed, subtotal, setQty, remove, clear } = useCart();

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-44 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
          Your bag
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
          Your bag is <span className="text-gradient-warm">empty.</span>
        </h1>
        <p className="mt-4 text-neutral-500">
          Begin with the Atlantic Edition.
        </p>
        <Link
          to="/products"
          className="mt-10 inline-flex cursor-pointer items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_45px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.05]"
        >
          Shop the Collection <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const shipping = subtotal > 200 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <h1 className="text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
        Your bag
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
                  alt={`VUIS ${product.name}${color ? ` in ${color.name}` : ""}`}
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
                      {product.subtitle}
                    </div>
                    {color && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-neutral-500">
                        <span
                          className="h-3 w-3 rounded-full border border-neutral-900/15"
                          style={{ background: color.swatch }}
                        />
                        {color.name}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => remove(product.id, color?.id)}
                    aria-label="Remove"
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
                      aria-label="Decrease quantity"
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
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="text-sm font-bold tabular-nums">
                    €{lineTotal}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="glass h-fit rounded-[1.75rem] p-7">
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
            Order summary
          </div>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span className="tabular-nums">€{subtotal}</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Complimentary" : `€${shipping}`}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-900/10 pt-3 text-base font-bold">
              <span>Total</span>
              <span className="tabular-nums">€{total}</span>
            </div>
          </div>
          <button
            onClick={() => {
              toast.success("Order placed — thank you.");
              clear();
            }}
            className="mt-7 w-full cursor-pointer rounded-full bg-neutral-900 py-4 text-sm font-semibold text-white shadow-[0_20px_45px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.02]"
          >
            Checkout
          </button>
          <Link
            to="/products"
            className="mt-4 block cursor-pointer text-center text-xs font-semibold text-neutral-500 transition-colors hover:text-neutral-900"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
