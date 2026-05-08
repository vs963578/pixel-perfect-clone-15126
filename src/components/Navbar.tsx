import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { ShoppingBag, Shield, Search } from "lucide-react";

export function PromoBanner() {
  return (
    <div className="bg-ink text-white text-center py-2.5 text-[13px] font-mono-store tracking-wide">
      Free shipping on orders over <span className="text-accent2 font-medium">₹999</span>
      <span className="mx-3 text-white/40">·</span>
      Use code <span className="text-accent2 font-medium">MRKT10</span> for 10% off
    </div>
  );
}

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { count } = useCart();
  const { location } = useRouterState();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const initialQ =
    (location.search as { q?: string } | undefined)?.q ?? "";
  const [q, setQ] = useState(initialQ);

  useEffect(() => {
    setQ(initialQ);
  }, [initialQ]);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    navigate({
      to: "/products",
      search: query ? { q: query } : {},
    });
  }

  return (
    <nav className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-4 px-6 md:px-12 h-16">
        <Link to="/" className="font-display text-[22px] font-bold tracking-tight shrink-0">
          MR<span className="text-accent">K</span>T
        </Link>

        <div className="hidden md:flex gap-1 shrink-0">
          {links.map((l) => {
            const active =
              l.to === "/" ? location.pathname === "/" : location.pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={[
                  "px-3.5 py-1.5 rounded-[10px] text-sm font-medium transition-colors",
                  active
                    ? "bg-ink text-white"
                    : "text-ink2 hover:bg-bg2 hover:text-ink",
                ].join(" ")}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <form onSubmit={onSearch} className="flex-1 max-w-md mx-auto hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink3 pointer-events-none" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
              className="w-full pl-9 pr-3 py-2 rounded-full border border-border bg-bg2 text-sm focus:outline-none focus:border-ink focus:bg-card transition-colors"
            />
          </div>
        </form>

        <div className="flex items-center gap-2.5 shrink-0 ml-auto sm:ml-0">
          {isAdmin && (
            <Link
              to="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-[10px] border border-border text-sm font-medium text-ink2 hover:border-ink hover:text-ink transition-colors"
            >
              <Shield className="h-3.5 w-3.5" /> Admin
            </Link>
          )}
          <Link
            to="/cart"
            className="flex items-center gap-2 px-4 py-2 rounded-[10px] bg-ink text-white text-sm font-medium hover:opacity-85 transition-opacity"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-accent text-white text-[11px] font-semibold w-[18px] h-[18px] rounded-full flex items-center justify-center">
              {count}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <form onSubmit={onSearch} className="sm:hidden px-6 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink3 pointer-events-none" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
            className="w-full pl-9 pr-3 py-2 rounded-full border border-border bg-bg2 text-sm focus:outline-none focus:border-ink focus:bg-card transition-colors"
          />
        </div>
      </form>
    </nav>
  );
}
