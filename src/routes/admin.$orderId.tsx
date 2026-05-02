import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/products";
import type { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
type Status = Database["public"]["Enums"]["order_status"];

const STATUSES: Status[] = ["pending", "paid", "shipped", "delivered", "cancelled"];

export const Route = createFileRoute("/admin/$orderId")({
  component: AdminOrderDetail,
});

function AdminOrderDetail() {
  const { orderId } = Route.useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      supabase.from("orders").select("*").eq("id", orderId).maybeSingle(),
      supabase.from("order_items").select("*").eq("order_id", orderId),
    ]).then(([o, it]) => {
      if (cancelled) return;
      if (o.error) console.error(o.error);
      if (it.error) console.error(it.error);
      setOrder(o.data ?? null);
      setItems(it.data ?? []);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  const updateStatus = async (status: Status) => {
    if (!order) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", order.id)
      .select()
      .maybeSingle();
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setOrder(data);
    toast.success(`Status set to ${status}`);
  };

  const deleteOrder = async () => {
    if (!order) return;
    if (!confirm(`Delete order ${order.order_number}? This cannot be undone.`)) return;
    const { error } = await supabase.from("orders").delete().eq("id", order.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Order deleted");
    navigate({ to: "/admin" });
  };

  if (loading) return <div className="py-16 text-center text-ink3 text-sm">Loading…</div>;
  if (!order) {
    return (
      <div className="py-16 text-center">
        <p className="text-ink2 mb-4">Order not found.</p>
        <Link to="/admin" className="text-accent hover:underline">← Back to orders</Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-ink2 hover:text-ink mb-5"
      >
        <ArrowLeft className="h-4 w-4" /> All orders
      </Link>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
        <div>
          <div className="text-[11px] font-mono-store text-ink3 uppercase tracking-wider">
            Order
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-[-0.02em]">
            {order.order_number}
          </h1>
          <div className="text-xs text-ink3 font-mono-store mt-1">
            Placed {new Date(order.created_at).toLocaleString()}
          </div>
        </div>
        <button
          onClick={deleteOrder}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-border rounded-[10px] text-sm text-destructive hover:border-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" /> Delete
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="space-y-6">
          <Section title="Items">
            <div className="border border-border rounded-2xl overflow-hidden">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-none"
                >
                  <div className="w-12 h-12 bg-bg2 rounded-[10px] flex items-center justify-center text-2xl">
                    {it.product_emoji ?? "📦"}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{it.product_name}</div>
                    <div className="text-xs text-ink3 font-mono-store">
                      {formatPrice(it.unit_price)} × {it.quantity}
                    </div>
                  </div>
                  <div className="font-display font-bold">{formatPrice(it.line_total)}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Customer">
            <Row label="Name" value={order.customer_name} />
            <Row label="Email" value={order.customer_email} />
            <Row label="Address" value={order.shipping_address} />
            <Row label="City" value={order.shipping_city} />
            <Row label="PIN" value={order.shipping_zip} />
          </Section>
        </div>

        <aside className="bg-card border-[1.5px] border-border rounded-2xl p-6 space-y-5 sticky top-[84px]">
          <div>
            <div className="text-[11px] font-mono-store text-ink3 uppercase tracking-wider mb-2">
              Status
            </div>
            <select
              value={order.status}
              disabled={saving}
              onChange={(e) => updateStatus(e.target.value as Status)}
              className="w-full px-3.5 py-2.5 border-[1.5px] border-border rounded-[10px] text-sm bg-background outline-none focus:border-accent"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2 text-sm pt-4 border-t border-border">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono-store">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-mono-store">{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between font-display text-lg font-bold pt-3 mt-1 border-t-[1.5px] border-border">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-display text-lg font-semibold mb-3">{title}</div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-border last:border-none text-sm">
      <span className="text-ink3 font-mono-store text-xs uppercase tracking-wider">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
