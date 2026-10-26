import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { products, type Product, type ProductColor } from "./products";

export type CartItem = {
  productId: string;
  colorId?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (productId: string, qty?: number, colorId?: string) => void;
  remove: (productId: string, colorId?: string) => void;
  setQty: (productId: string, qty: number, colorId?: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: {
    product: Product;
    color?: ProductColor;
    quantity: number;
    lineTotal: number;
  }[];
};

const CartContext = createContext<CartContextValue | null>(null);

const sameLine = (i: CartItem, productId: string, colorId?: string) =>
  i.productId === productId && i.colorId === colorId;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("vuis-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // corrupted stored cart — start empty
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("vuis-cart", JSON.stringify(items));
  }, [items]);

  const add = (productId: string, qty = 1, colorId?: string) =>
    setItems((prev) => {
      const existing = prev.find((i) => sameLine(i, productId, colorId));
      if (existing)
        return prev.map((i) =>
          sameLine(i, productId, colorId)
            ? { ...i, quantity: i.quantity + qty }
            : i,
        );
      return [...prev, { productId, colorId, quantity: qty }];
    });

  const remove = (productId: string, colorId?: string) =>
    setItems((prev) => prev.filter((i) => !sameLine(i, productId, colorId)));

  const setQty = (productId: string, qty: number, colorId?: string) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !sameLine(i, productId, colorId))
        : prev.map((i) =>
            sameLine(i, productId, colorId) ? { ...i, quantity: qty } : i,
          ),
    );

  const clear = () => setItems([]);

  const detailed = items
    .map((i) => {
      const product = products.find((p) => p.id === i.productId);
      if (!product) return null;
      const color = product.colors.find((c) => c.id === i.colorId);
      return {
        product,
        color,
        quantity: i.quantity,
        lineTotal: (color ?? product.colors[0]).price * i.quantity,
      };
    })
    .filter(Boolean) as CartContextValue["detailed"];

  const subtotal = detailed.reduce((s, d) => s + d.lineTotal, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, add, remove, setQty, clear, count, subtotal, detailed }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
