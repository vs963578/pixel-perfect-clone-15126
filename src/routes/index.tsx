import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, PRODUCTS, formatPrice } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MRKT — Shop everything, here." },
      {
        name: "description",
        content:
          "MRKT is a curated general store. Electronics, fashion, home, books, sports — quality goods delivered.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="grid md:grid-cols-2 min-h-[calc(100vh-104px)]">
        <div className="px-8 md:px-16 py-16 md:py-24 flex flex-col justify-center">
          <div className="font-mono-store text-[11px] tracking-[0.18em] uppercase text-accent mb-6">
            New season · New arrivals
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1] tracking-[-0.02em] mb-6">
            Shop <em className="font-light text-ink2">every</em>
            <br />
            thing, here.
          </h1>
          <p className="text-base md:text-lg text-ink2 max-w-md leading-relaxed mb-10">
            From electronics to everyday essentials — curated, quality goods, delivered to your
            door.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="px-7 py-3.5 bg-accent text-white rounded-[10px] text-[15px] font-semibold hover:bg-accent2 hover:-translate-y-0.5 transition-all"
            >
              Shop now
            </Link>
            <Link
              to="/products"
              className="px-6 py-3 bg-transparent text-ink border-[1.5px] border-border rounded-[10px] text-[15px] font-medium hover:border-ink transition-colors inline-flex items-center gap-1.5"
            >
              Browse categories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="bg-bg2 flex items-center justify-center overflow-hidden">
          <div className="grid grid-cols-2 gap-4 p-8 md:p-10 w-full">
            {[
              { tint: "#fdf0ed", icon: "📱", name: "Electronics", from: "₹499" },
              { tint: "#edf7f2", icon: "👗", name: "Fashion", from: "₹299" },
              { tint: "#f0f0ff", icon: "🏠", name: "Home", from: "₹199" },
              { tint: "#fffbea", icon: "📚", name: "Books", from: "₹99" },
            ].map((c) => (
              <div
                key={c.name}
                className="bg-card rounded-2xl p-5 shadow-[0_2px_12px_rgba(26,24,20,0.08)]"
              >
                <div
                  className="w-full aspect-square rounded-[10px] flex items-center justify-center text-5xl mb-3"
                  style={{ background: c.tint }}
                >
                  {c.icon}
                </div>
                <h4 className="font-display text-[15px] font-semibold">{c.name}</h4>
                <p className="text-xs text-ink3 font-mono-store">{c.from}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-border mx-6 md:mx-12" />

      {/* CATEGORIES */}
      <section className="px-6 md:px-12 py-16 md:py-20">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Shop by category
          </h2>
          <Link to="/products" className="text-sm text-accent font-medium hover:underline">
            All products →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.map((c) => {
            const count = PRODUCTS.filter((p) => p.cat === c.key).length;
            return (
              <Link
                key={c.key}
                to="/products"
                search={{ cat: c.key }}
                className="bg-bg2 rounded-2xl px-5 py-7 text-center border-[1.5px] border-transparent hover:bg-card hover:border-border hover:shadow-[0_2px_12px_rgba(26,24,20,0.08)] hover:-translate-y-1 transition-all"
              >
                <div className="text-4xl mb-3">{c.icon}</div>
                <div className="font-semibold text-sm mb-0.5">{c.label}</div>
                <div className="text-xs text-ink3 font-mono-store">{count} items</div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="h-px bg-border mx-6 md:mx-12" />

      {/* FEATURED */}
      <section className="px-6 md:px-12 py-16 md:py-20">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Featured products
          </h2>
          <Link to="/products" className="text-sm text-accent font-medium hover:underline">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <p className="sr-only">{formatPrice(0)}</p>
      </section>
    </>
  );
}
