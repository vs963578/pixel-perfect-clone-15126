import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — MRKT" },
      { name: "description", content: "Complete your MRKT order securely." },
    ],
  }),
  component: CheckoutPage,
});

function fmtCard(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}
function fmtExp(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

function CheckoutPage() {
  const { detailed, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (detailed.length === 0) {
    return (
      <div className="max-w-[600px] mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-3">Nothing to check out</h1>
        <p className="text-ink2 mb-6">Add a few items first.</p>
        <Link
          to="/products"
          className="inline-block px-6 py-3 bg-accent text-white rounded-[10px] font-semibold"
        >
          Browse products
        </Link>
      </div>
    );
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const orderId = `MRKT-${Math.floor(1000 + Math.random() * 9000)}`;
    setTimeout(() => {
      clear();
      navigate({ to: "/success", search: { order: orderId } });
    }, 600);
  };

  return (
    <div className="max-w-[960px] mx-auto px-6 md:px-12 py-10">
      <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-8">
        Checkout
      </h1>
      <div className="grid md:grid-cols-[1fr_340px] gap-8 items-start">
        <form
          onSubmit={onSubmit}
          className="bg-card border-[1.5px] border-border rounded-2xl p-7"
        >
          <SectionTitle>Delivery details</SectionTitle>
          <div className="grid grid-cols-2 gap-3.5">
            <Field label="First name" name="first" required defaultValue="" placeholder="Arjun" />
            <Field label="Last name" name="last" required placeholder="Sharma" />
          </div>
          <Field label="Email" name="email" type="email" required placeholder="arjun@example.com" />
          <Field label="Phone" name="phone" required placeholder="+91 98765 43210" />
          <Field label="Address" name="addr" required placeholder="123 MG Road, Apt 4" />
          <div className="grid grid-cols-2 gap-3.5">
            <Field label="City" name="city" required placeholder="Mumbai" />
            <Field label="PIN code" name="pin" required placeholder="400001" />
          </div>

          <div className="h-6" />
          <SectionTitle>Payment</SectionTitle>
          <Field
            label="Card number"
            name="card"
            required
            placeholder="4242 4242 4242 4242"
            value={card}
            onChange={(e) => setCard(fmtCard(e.target.value))}
            inputMode="numeric"
          />
          <div className="grid grid-cols-2 gap-3.5">
            <Field
              label="Expiry"
              name="exp"
              required
              placeholder="MM/YY"
              value={exp}
              onChange={(e) => setExp(fmtExp(e.target.value))}
              inputMode="numeric"
            />
            <Field
              label="CVV"
              name="cvv"
              required
              type="password"
              maxLength={3}
              placeholder="123"
              inputMode="numeric"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-success text-white rounded-[10px] font-semibold mt-3 hover:opacity-90 disabled:opacity-50 transition-opacity inline-flex items-center justify-center gap-2"
          >
            <Check className="h-4 w-4" />
            {submitting ? "Placing order…" : "Place order"}
          </button>
        </form>

        <aside className="bg-card border-[1.5px] border-border rounded-2xl p-7 sticky top-[84px]">
          <div className="font-display text-xl font-bold mb-4">Order summary</div>
          <div>
            {detailed.map(({ product, qty, lineTotal }) => (
              <div
                key={product.id}
                className="flex justify-between py-2.5 border-b border-border last:border-none text-sm"
              >
                <span>
                  {product.name} <span className="text-ink3 font-mono-store">×{qty}</span>
                </span>
                <span className="font-mono-store">{formatPrice(lineTotal)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-sm">
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
            <div className="flex justify-between font-display text-lg font-bold pt-3 mt-2 border-t-[1.5px] border-border">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display text-lg font-semibold mb-4 pb-2 border-b border-border">
      {children}
    </div>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string };
function Field({ label, ...rest }: FieldProps) {
  return (
    <div className="mb-3.5">
      <label className="block text-[12px] font-mono-store text-ink2 mb-1.5 tracking-wide">
        {label}
      </label>
      <input
        {...rest}
        className="w-full px-3.5 py-2.5 border-[1.5px] border-border rounded-[10px] text-sm text-ink bg-background outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}
