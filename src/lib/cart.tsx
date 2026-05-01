import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./products";

export type CartItem = { productId: number; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  add: (productId: number, qty?: number) => void;
  setQty: (productId: number, qty: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
  detailed: { product: Product; qty: number; lineTotal: number }[];
  subtotal: number;
};

const CartContext = createContext<CartCtx | null>(null);
const STORAGE_KEY = "mrkt_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add: CartCtx["add"] = (productId, qty = 1) => {
    setItems((prev) => {
      const ix = prev.findIndex((i) => i.productId === productId);
      if (ix >= 0) {
        const next = [...prev];
        next[ix] = { ...next[ix], qty: next[ix].qty + qty };
        return next;
      }
      return [...prev, { productId, qty }];
    });
  };

  const setQty: CartCtx["setQty"] = (productId, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.productId !== productId)
        : prev.map((i) => (i.productId === productId ? { ...i, qty } : i)),
    );
  };

  const remove: CartCtx["remove"] = (productId) =>
    setItems((prev) => prev.filter((i) => i.productId !== productId));

  const clear = () => setItems([]);

  const detailed = items
    .map((i) => {
      const p = PRODUCTS.find((x) => x.id === i.productId);
      if (!p) return null;
      return { product: p, qty: i.qty, lineTotal: p.price * i.qty };
    })
    .filter(Boolean) as CartCtx["detailed"];

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = detailed.reduce((s, d) => s + d.lineTotal, 0);

  return (
    <CartContext.Provider value={{ items, count, add, setQty, remove, clear, detailed, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
