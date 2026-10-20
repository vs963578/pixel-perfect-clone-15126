import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { ShoppingBag, Shield, Search, User as UserIcon, LogOut } from "lucide-react";
import { toast } from "sonner";

export function PromoBanner() {
  return (
    <div className="bg-ink text-center py-2.5 text-[12px] font-mono-store tracking-[0.18em] text-white">
      Free shipping over <span className="text-accent2">₹999</span>
      <span className="mx-3 text-white/35">/</span>
      New arrivals added every Friday
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
  const { isAdmin, user, signOut } = useAuth();
  const navigate = useNavigate();
  const initialQ = (location.search as { q?: string } | undefined)?.q ?? "";
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
    <nav className="sticky top-0 z-40 border-b border-border bg-background/88 backdrop-blur-xl">
      <div className="flex h-18 items-center gap-4 px-6 md:px-12">
        <Link to="/" className="shrink-0 font-display text-[24px] font-bold tracking-[-0.04em]">
          MR<span className="text-accent">K</span>T
        </Link>

        <div className="hidden shrink-0 gap-1 md:flex">
          {links.map((l) => {
            const active =
              l.to === "/" ? location.pathname === "/" : location.pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "bg-ink text-white" : "text-ink2 hover:bg-bg2 hover:text-ink",
                ].join(" ")}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <form onSubmit={onSearch} className="mx-auto hidden max-w-lg flex-1 sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink3 pointer-events-none" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
              className="w-full rounded-full border border-border bg-card px-4 py-2.5 pl-9 text-sm shadow-sm transition-colors focus:border-ink focus:outline-none"
            />
          </div>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-2.5 sm:ml-0">
          {isAdmin && (
            <Link
              to="/admin"
              className="hidden rounded-full border border-border px-3.5 py-2 text-sm font-medium text-ink2 transition-colors hover:border-ink hover:text-ink sm:inline-flex"
            >
              <Shield className="h-3.5 w-3.5" /> Admin
            </Link>
          )}
          {user ? (
            <button
              onClick={async () => {
                await signOut();
                toast.success("Signed out");
                navigate({ to: "/" });
              }}
              className="hidden rounded-full border border-border px-3.5 py-2 text-sm font-medium text-ink2 transition-colors hover:border-ink hover:text-ink sm:inline-flex"
              aria-label="Sign out"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          ) : (
            <Link
              to="/auth"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-medium text-ink2 transition-colors hover:border-ink hover:text-ink"
            >
              <UserIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign in</span>
            </Link>
          )}
          <Link
            to="/cart"
            className="flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-white">
              {count}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <form onSubmit={onSearch} className="px-6 pb-3 sm:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink3 pointer-events-none" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
            className="w-full rounded-full border border-border bg-card px-4 py-2.5 pl-9 text-sm shadow-sm transition-colors focus:border-ink focus:outline-none"
          />
        </div>
      </form>
    </nav>
  );
}
