import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — MRKT" },
      { name: "description", content: "Review the items in your MRKT shopping cart." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, subtotal, setQty, remove } = useCart();
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-10">
      <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-8">
        Your Cart
      </h1>

      {detailed.length === 0 ? (
        <div className="text-center py-24">
          <ShoppingBag className="h-16 w-16 mx-auto text-ink3 mb-6" />
          <h3 className="font-display text-2xl font-bold mb-2">Your cart is empty</h3>
          <p className="text-ink2 mb-8">Looks like you haven't added anything yet.</p>
          <Link
            to="/products"
            className="inline-block px-7 py-3.5 bg-accent text-white rounded-[10px] font-semibold hover:bg-accent2 transition-colors"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1fr_340px] gap-8 items-start">
          <div>
            {detailed.map(({ product, qty, lineTotal }) => (
              <div
                key={product.id}
                className="grid grid-cols-[80px_1fr_auto] gap-4 items-center py-5 border-b border-border"
              >
                <div className="w-20 h-20 bg-bg2 rounded-[10px] flex items-center justify-center text-4xl border border-border">
                  {product.emoji}
                </div>
                <div>
                  <div className="font-display text-base font-semibold">{product.name}</div>
                  <div className="text-xs text-ink3 font-mono-store">{product.cat}</div>
                  <div className="font-display text-base font-bold mt-1.5">
                    {formatPrice(product.price)}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQty(product.id, qty - 1)}
                      className="w-7 h-7 rounded-full border border-border bg-bg2 flex items-center justify-center hover:border-ink"
                      aria-label="Decrease"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="font-mono-store text-sm min-w-5 text-center">{qty}</span>
                    <button
                      onClick={() => setQty(product.id, qty + 1)}
                      className="w-7 h-7 rounded-full border border-border bg-bg2 flex items-center justify-center hover:border-ink"
                      aria-label="Increase"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="text-sm font-mono-store text-ink2">{formatPrice(lineTotal)}</div>
                  <button
                    onClick={() => remove(product.id)}
                    className="text-xs text-ink3 font-mono-store hover:text-destructive"
                  >
                    remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="bg-card border-[1.5px] border-border rounded-2xl p-7 sticky top-[84px]">
            <div className="font-display text-xl font-bold mb-5">Order summary</div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-display text-lg font-bold pt-4 mt-2 border-t-[1.5px] border-border">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block text-center w-full py-3.5 bg-accent text-white rounded-[10px] font-semibold mt-5 hover:bg-accent2 transition-colors"
            >
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
