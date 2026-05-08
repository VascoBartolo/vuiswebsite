import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Minus, Plus } from "lucide-react";
import { ProductCarousel } from "./ProductCarousel";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { toast } from "sonner";

export function ProductDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) setQty(1);
  }, [open, product?.id]);

  if (!product) return null;

  const handleAdd = () => {
    add(product.id, qty);
    toast.success(`${product.name} added to bag`);
  };

  const handleBuy = () => {
    add(product.id, qty);
    onOpenChange(false);
    navigate({ to: "/cart" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-5xl gap-0 overflow-hidden p-0 sm:rounded-2xl">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>

        <div className="grid max-h-[calc(100dvh-1rem)] min-h-0 overflow-y-auto md:grid-cols-2 md:overflow-hidden">
          <ProductCarousel
            images={product.images}
            alt={product.name}
            className="min-h-0"
            viewportClassName="aspect-[4/3] max-h-[42dvh] md:aspect-[4/5] md:max-h-none"
          />

          <div className="flex min-h-0 flex-col p-5 sm:p-6 md:max-h-[calc(100dvh-1rem)] md:overflow-y-auto md:p-10">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {product.subtitle}
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl">{product.name}</h2>
            <div className="mt-2 text-lg">€{product.price}</div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">{product.description}</p>

            <ul className="mt-5 space-y-1.5 text-sm text-muted-foreground">
              {product.details.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="text-foreground">·</span> {d}
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-border pt-5 md:mt-auto md:pt-8">
              <div className="flex items-center gap-4">
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Qty</div>
                <div className="flex items-center border border-border">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="p-2 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-10 text-center text-sm">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="p-2 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="h-12 border border-primary text-xs uppercase tracking-[0.3em] hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Add to bag
                </button>
                <button
                  type="button"
                  onClick={handleBuy}
                  className="h-12 bg-primary text-xs uppercase tracking-[0.3em] text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
