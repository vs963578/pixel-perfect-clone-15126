import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/success")({
  validateSearch: z.object({ order: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Order placed — MRKT" },
      { name: "description", content: "Your MRKT order has been received." },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { order } = Route.useSearch();
  return (
    <div className="max-w-[600px] mx-auto px-6 py-24 text-center">
      <div className="text-7xl mb-6">🎉</div>
      <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-3">
        Order placed!
      </h1>
      <p className="text-ink2 text-base leading-relaxed mb-8">
        Thank you for shopping at MRKT. Your order has been received and will be processed shortly.
      </p>
      {order && (
        <div className="font-mono-store bg-bg2 rounded-[10px] px-5 py-2.5 inline-block text-sm text-accent mb-8">
          Order #{order}
        </div>
      )}
      <div className="flex gap-3 justify-center flex-wrap">
        <Link
          to="/"
          className="px-7 py-3.5 bg-accent text-white rounded-[10px] font-semibold hover:bg-accent2 transition-colors"
        >
          Continue shopping
        </Link>
        <Link
          to="/products"
          className="px-6 py-3 border-[1.5px] border-border rounded-[10px] font-medium hover:border-ink transition-colors"
        >
          Browse more
        </Link>
      </div>
    </div>
  );
}
