export function Footer() {
  return (
    <footer className="border-t border-border bg-bg2 mt-12">
      <div className="px-6 md:px-12 py-10 grid gap-8 md:grid-cols-3 items-start">
        <div>
          <div className="font-display text-xl font-bold">
            MR<span className="text-accent">K</span>T
          </div>
          <p className="text-sm text-ink2 mt-2 max-w-xs">
            A curated general store. Quality goods, delivered to your door.
          </p>
        </div>
        <div className="text-sm text-ink2">
          <div className="font-mono-store text-[11px] uppercase tracking-wider text-ink3 mb-2">
            Shop
          </div>
          <ul className="space-y-1.5">
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home & Living</li>
            <li>Books</li>
            <li>Sports</li>
          </ul>
        </div>
        <div className="text-sm text-ink2">
          <div className="font-mono-store text-[11px] uppercase tracking-wider text-ink3 mb-2">
            Help
          </div>
          <ul className="space-y-1.5">
            <li>Shipping & Returns</li>
            <li>Track your order</li>
            <li>Contact us</li>
          </ul>
        </div>
      </div>
      <div className="px-6 md:px-12 py-4 border-t border-border text-[12px] font-mono-store text-ink3 flex justify-between">
        <span>© {new Date().getFullYear()} MRKT</span>
        <span>Made with care</span>
      </div>
    </footer>
  );
}
