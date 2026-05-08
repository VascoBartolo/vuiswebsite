import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Bag — VUIS" }] }),
  component: CartPage,
});

function CartPage() {
  const { detailed, subtotal, setQty, remove, clear } = useCart();

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-4xl">Your bag is empty</h1>
        <p className="mt-4 text-muted-foreground">
          Begin with the Atlantic Edition.
        </p>
        <Link
          to="/products"
          className="mt-10 inline-flex h-12 items-center justify-center bg-primary px-8 text-xs uppercase tracking-[0.3em] text-primary-foreground hover:bg-primary/90"
        >
          Shop Collection
        </Link>
      </div>
    );
  }

  const shipping = subtotal > 200 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-4xl md:text-5xl">Your bag</h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="divide-y divide-border border-y border-border">
          {detailed.map(({ product, quantity, lineTotal }) => (
            <div key={product.id} className="flex gap-6 py-6">
              <img src={product.images[0]} alt={product.name} className="h-32 w-32 object-cover bg-muted/40" />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-base">{product.name}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.subtitle}</div>
                  </div>
                  <button onClick={() => remove(product.id)} aria-label="Remove" className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center border border-border">
                    <button onClick={() => setQty(product.id, quantity - 1)} className="p-2 hover:bg-muted"><Minus className="h-3 w-3" /></button>
                    <span className="w-10 text-center text-sm">{quantity}</span>
                    <button onClick={() => setQty(product.id, quantity + 1)} className="p-2 hover:bg-muted"><Plus className="h-3 w-3" /></button>
                  </div>
                  <div className="text-sm">€{lineTotal}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit border border-border p-8">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Order summary</div>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>€{subtotal}</span></div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Complimentary" : `€${shipping}`}</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between text-base">
              <span>Total</span><span>€{total}</span>
            </div>
          </div>
          <button
            onClick={() => {
              toast.success("Order placed — thank you.");
              clear();
            }}
            className="mt-8 h-12 w-full bg-primary text-xs uppercase tracking-[0.3em] text-primary-foreground hover:bg-primary/90"
          >
            Checkout
          </button>
          <Link to="/products" className="mt-4 block text-center text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}