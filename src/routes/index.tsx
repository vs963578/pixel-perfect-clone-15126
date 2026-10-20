import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";

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
  const bestSellers = PRODUCTS.slice(4, 8);
  const heroImage =
    "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=" +
    encodeURIComponent(
      "elevated lifestyle still life of modern everyday essentials including headphones candle tote bag and ceramic decor on warm neutral stone surface, luxury editorial retail photography, soft natural sunlight, premium website hero image",
    ) +
    "&image_size=portrait_4_3";
  const storyImage =
    "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=" +
    encodeURIComponent(
      "warm modern apartment interior with curated lifestyle products, ceramic decor, books, textiles and soft daylight, premium editorial home retail photography, inviting and realistic",
    ) +
    "&image_size=landscape_4_3";
  const trustPoints = [
    {
      icon: Truck,
      title: "Fast fulfillment",
      body: "Orders ship within 24 hours from our Bengaluru warehouse.",
    },
    {
      icon: ShieldCheck,
      title: "Easy returns",
      body: "Seven-day returns and live support for every order.",
    },
    {
      icon: Sparkles,
      title: "Curated quality",
      body: "A tighter catalog of goods we would actually use ourselves.",
    },
  ] as const;
  const testimonials = [
    {
      quote: "The site feels premium and the products actually match the photography.",
      name: "Aarav Mehta",
      role: "Bengaluru",
    },
    {
      quote: "I found gifts, home pieces, and headphones in one checkout. Super smooth.",
      name: "Nitya Kapoor",
      role: "Mumbai",
    },
    {
      quote: "Fast delivery, clean packaging, and no clutter. Exactly what I want from a store.",
      name: "Rohan Shah",
      role: "Pune",
    },
  ] as const;

  return (
    <>
      <section className="px-6 pb-8 pt-8 md:px-12 md:pb-14 md:pt-12">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[36px] bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(242,240,235,0.95))] px-7 py-8 shadow-soft md:px-10 md:py-12">
            <div className="mb-5 inline-flex rounded-full border border-border bg-card px-3 py-1 text-[11px] font-mono-store uppercase tracking-[0.18em] text-accent">
              New drop / Autumn essentials
            </div>
            <h1 className="max-w-xl font-display text-5xl font-bold leading-[0.96] tracking-[-0.05em] md:text-7xl">
              A curated store for beautifully useful things.
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-8 text-ink2 md:text-[18px]">
              Shop technology, homeware, fashion, books, and movement essentials selected for
              everyday life, not endless scrolling.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                search={{ cat: "All" }}
                className="rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-accent"
              >
                Shop the collection
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:border-ink"
              >
                Talk to our team <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[24px] border border-border bg-white/72 p-4">
                <div className="font-display text-3xl font-semibold tracking-[-0.04em]">24h</div>
                <p className="mt-1 text-sm text-ink2">average dispatch on in-stock orders</p>
              </div>
              <div className="rounded-[24px] border border-border bg-white/72 p-4">
                <div className="font-display text-3xl font-semibold tracking-[-0.04em]">4.8/5</div>
                <p className="mt-1 text-sm text-ink2">customer rating across core categories</p>
              </div>
              <div className="rounded-[24px] border border-border bg-white/72 p-4">
                <div className="font-display text-3xl font-semibold tracking-[-0.04em]">500+</div>
                <p className="mt-1 text-sm text-ink2">weekly orders from repeat customers</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="relative overflow-hidden rounded-[36px] bg-bg2">
              <img
                src={heroImage}
                alt="Curated MRKT lifestyle collection"
                className="h-full min-h-[420px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 text-white md:p-8">
                <div className="text-[11px] font-mono-store uppercase tracking-[0.18em] text-white/72">
                  This week at MRKT
                </div>
                <div className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em]">
                  Elevated essentials for home, work, and weekends.
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {trustPoints.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-[28px] border border-border bg-card p-5 shadow-soft"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-bg2 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em]">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-ink2">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:px-12 md:py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono-store uppercase tracking-[0.18em] text-accent">
              Shop by collection
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] md:text-5xl">
              Find your everyday category.
            </h2>
          </div>
          <Link
            to="/products"
            search={{ cat: "All" }}
            className="hidden text-sm font-medium text-accent hover:underline md:inline"
          >
            Browse everything
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {CATEGORIES.map((c) => {
            const count = PRODUCTS.filter((p) => p.cat === c.key).length;
            const lead = PRODUCTS.find((p) => p.cat === c.key);
            return (
              <Link
                key={c.key}
                to="/products"
                search={{ cat: c.key }}
                className="group overflow-hidden rounded-[30px] border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(26,24,20,0.12)]"
              >
                {lead && (
                  <img
                    src={lead.image}
                    alt={c.label}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="p-5">
                  <div className="text-[11px] font-mono-store uppercase tracking-[0.18em] text-ink3">
                    {count} items
                  </div>
                  <div className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em]">
                    {c.label}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Explore <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-10 md:px-12 md:py-14">
        <div className="rounded-[36px] border border-border bg-card p-6 shadow-soft md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="text-[11px] font-mono-store uppercase tracking-[0.18em] text-accent">
                The MRKT difference
              </div>
              <h2 className="mt-3 max-w-lg font-display text-3xl font-bold tracking-[-0.04em] md:text-5xl">
                Designed to feel calm, fast, and useful from first click to delivery.
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-8 text-ink2">
                We keep the assortment focused, the imagery honest, and the shopping experience
                friction-light so you can actually discover things you want to keep.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div>
                  <div className="font-display text-4xl font-semibold tracking-[-0.05em]">05</div>
                  <p className="mt-1 text-sm text-ink2">core categories with tight curation</p>
                </div>
                <div>
                  <div className="font-display text-4xl font-semibold tracking-[-0.05em]">07</div>
                  <p className="mt-1 text-sm text-ink2">day returns on eligible products</p>
                </div>
                <div>
                  <div className="font-display text-4xl font-semibold tracking-[-0.05em]">100%</div>
                  <p className="mt-1 text-sm text-ink2">secure checkout and order tracking</p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-[30px] bg-bg2">
              <img
                src={storyImage}
                alt="Warm home interior styled with MRKT products"
                className="h-full min-h-[320px] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:px-12 md:py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono-store uppercase tracking-[0.18em] text-accent">
              Featured now
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] md:text-5xl">
              Most-loved picks this week.
            </h2>
          </div>
          <Link
            to="/products"
            search={{ cat: "All" }}
            className="hidden text-sm font-medium text-accent hover:underline md:inline"
          >
            See all products
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="px-6 py-10 md:px-12 md:py-14">
        <div className="mb-8">
          <div className="text-[11px] font-mono-store uppercase tracking-[0.18em] text-accent">
            Just landed
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] md:text-5xl">
            New pieces across home, books, and movement.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="px-6 py-10 md:px-12 md:py-14">
        <div className="rounded-[36px] bg-ink px-6 py-8 text-white md:px-8 md:py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-[11px] font-mono-store uppercase tracking-[0.18em] text-white/60">
                Customer notes
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] md:text-5xl">
                A store built to feel as good as the products look.
              </h2>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Need help choosing? <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-[28px] border border-white/10 bg-white/6 p-5">
                <p className="text-[16px] leading-7 text-white/88">"{item.quote}"</p>
                <div className="mt-5 text-[11px] font-mono-store uppercase tracking-[0.18em] text-white/55">
                  {item.name} / {item.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 pt-4 md:px-12 md:pb-18">
        <div className="rounded-[36px] border border-border bg-[linear-gradient(135deg,rgba(200,65,10,0.08),rgba(255,255,255,0.95))] px-6 py-8 md:px-8 md:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-[11px] font-mono-store uppercase tracking-[0.18em] text-accent">
                Ready to browse?
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] md:text-5xl">
                Start with a few beautiful basics and build from there.
              </h2>
              <p className="mt-4 max-w-xl text-[16px] leading-8 text-ink2">
                Explore the full catalogue, save your favorites, and check out in just a few steps.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products"
                search={{ cat: "All" }}
                className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-accent"
              >
                Explore products
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-border px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
