import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <Link
      to="/products/$productId"
      params={{ productId: String(product.id) }}
      className="group block overflow-hidden rounded-[28px] border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(26,24,20,0.14)]"
    >
      <div className="relative aspect-[4/4.4] overflow-hidden bg-bg2">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/12 to-transparent" />
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-mono-store text-ink shadow-sm backdrop-blur">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="mb-2 text-[11px] font-mono-store uppercase tracking-[0.18em] text-ink3">
          {product.cat}
        </div>
        <div className="mb-2 font-display text-[21px] font-semibold leading-tight tracking-[-0.02em]">
          {product.name}
        </div>
        <p className="mb-4 line-clamp-2 text-[14px] leading-6 text-ink2">{product.desc}</p>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-mono-store uppercase tracking-[0.16em] text-ink3">
              Starting at
            </div>
            <div className="font-display text-2xl font-bold tracking-[-0.03em]">
              {formatPrice(product.price)}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              add(product.id);
              toast.success(`${product.name} added to cart`);
            }}
            aria-label={`Add ${product.name} to cart`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition-all hover:scale-105 hover:bg-accent"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
