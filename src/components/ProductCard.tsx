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
      className="group block bg-card rounded-2xl overflow-hidden border border-border transition-all hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(26,24,20,0.14)]"
    >
      <div className="relative aspect-square bg-bg2 flex items-center justify-center text-6xl">
        {product.emoji}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-accent text-white text-[10px] font-mono-store px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="text-[11px] font-mono-store text-ink3 uppercase tracking-wider mb-1">
          {product.cat}
        </div>
        <div className="font-display text-base font-semibold leading-tight mb-1.5">
          {product.name}
        </div>
        <p className="text-[13px] text-ink2 mb-3 line-clamp-2 leading-snug">{product.desc}</p>
        <div className="flex items-center justify-between">
          <div className="font-display text-lg font-bold">{formatPrice(product.price)}</div>
          <button
            onClick={(e) => {
              e.preventDefault();
              add(product.id);
              toast.success(`${product.name} added to cart`);
            }}
            aria-label={`Add ${product.name} to cart`}
            className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center hover:bg-accent hover:scale-110 transition-all"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
