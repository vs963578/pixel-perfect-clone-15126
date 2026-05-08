import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const searchSchema = z.object({
  cat: z
    .enum(["All", "Electronics", "Fashion", "Home", "Books", "Sports"])
    .catch("All")
    .default("All"),
  q: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/products/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "All Products — MRKT" },
      {
        name: "description",
        content:
          "Browse the full MRKT catalogue: electronics, fashion, home & living, books, and sports.",
      },
    ],
  }),
  component: ProductsPage,
});

const FILTERS = [
  { key: "All", label: "All", icon: "" },
  ...CATEGORIES.map((c) => ({ key: c.key, label: c.label.split(" ")[0], icon: c.icon })),
] as const;

function ProductsPage() {
  const { cat } = Route.useSearch();
  const filtered = cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat);

  return (
    <>
      <section className="px-6 md:px-12 pt-10 pb-0">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-2">
          All Products
        </h1>
        <p className="text-ink2 mb-7">Discover our full collection</p>
        <div className="flex gap-2 flex-wrap mb-2">
          {FILTERS.map((f) => {
            const active = cat === f.key;
            return (
              <Link
                key={f.key}
                to="/products"
                search={{ cat: f.key }}
                className={[
                  "px-4 py-2 rounded-full border-[1.5px] text-[13px] font-medium transition-colors",
                  active
                    ? "bg-ink border-ink text-white"
                    : "bg-card border-border text-ink2 hover:border-ink hover:text-ink",
                ].join(" ")}
              >
                {f.icon && <span className="mr-1">{f.icon}</span>}
                {f.label}
              </Link>
            );
          })}
        </div>
      </section>
      <section className="px-6 md:px-12 pb-20 pt-8">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-ink3 text-sm">No products in this category.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
