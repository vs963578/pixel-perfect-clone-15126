import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { getProduct, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const product = getProduct(Number(params.productId));
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — MRKT` },
          { name: "description", content: loaderData.product.desc },
          { property: "og:title", content: `${loaderData.product.name} — MRKT` },
          { property: "og:description", content: loaderData.product.desc },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="px-12 py-20 text-center">
      <h1 className="font-display text-3xl mb-2">Product not found</h1>
      <Link to="/products" className="text-accent hover:underline">
        ← Back to products
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="px-12 py-20 text-center">
        <p className="text-destructive mb-4">{error.message}</p>
        <button
          className="px-4 py-2 bg-ink text-white rounded-md"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Retry
        </button>
      </div>
    );
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  return (
    <>
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 px-4 py-2 mx-6 md:mx-12 mt-6 border-[1.5px] border-border rounded-[10px] bg-card text-sm text-ink2 hover:border-ink hover:text-ink transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-10 grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div className="aspect-square bg-bg2 rounded-2xl flex items-center justify-center text-[120px] border-[1.5px] border-border">
          {product.emoji}
        </div>
        <div>
          <div className="text-xs font-mono-store text-ink3 uppercase tracking-[0.1em] mb-2">
            {product.cat}
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-[-0.02em] mb-4">
            {product.name}
          </h1>
          <div className="font-display text-3xl font-bold text-accent mb-5">
            {formatPrice(product.price)}
          </div>
          <p className="text-ink2 leading-[1.8] text-base mb-8">{product.desc}</p>

          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-full border-[1.5px] border-border bg-card flex items-center justify-center hover:border-ink hover:bg-bg2 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-mono-store text-base font-medium min-w-6 text-center">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-9 h-9 rounded-full border-[1.5px] border-border bg-card flex items-center justify-center hover:border-ink hover:bg-bg2 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
            <span className="text-[13px] text-ink3 font-mono-store ml-1">qty</span>
          </div>

          <button
            onClick={() => {
              add(product.id, qty);
              toast.success(`Added ${qty} × ${product.name}`);
            }}
            className="w-full py-4 bg-ink text-white rounded-[10px] text-base font-semibold hover:bg-accent transition-colors"
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}
