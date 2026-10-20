import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const colTitle = "mb-4 text-[12px] font-mono-store uppercase tracking-[0.18em] text-white/55";
const colLink = "mb-2 block text-[14px] text-white/88 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="mt-16 bg-[#101826] text-white">
      <div className="grid gap-10 px-6 py-14 md:grid-cols-[1.25fr_repeat(3,0.8fr)_1fr] md:px-12">
        <div>
          <Link to="/" className="font-display text-3xl font-bold tracking-[-0.04em]">
            MR<span className="text-accent2">K</span>T
          </Link>
          <p className="mt-4 max-w-sm text-[15px] leading-7 text-white/72">
            A modern general store for elevated everyday essentials across tech, home, style,
            wellness, and reading.
          </p>
          <div className="mt-6 flex gap-4 text-white/88">
            <a href="#" aria-label="Facebook" className="transition-colors hover:text-white">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" className="transition-colors hover:text-white">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" aria-label="YouTube" className="transition-colors hover:text-white">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" className="transition-colors hover:text-white">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <div className={colTitle}>Shop</div>
          <Link to="/products" search={{ cat: "All" }} className={colLink}>
            All products
          </Link>
          <Link to="/products" search={{ cat: "Electronics" }} className={colLink}>
            Electronics
          </Link>
          <Link to="/products" search={{ cat: "Home" }} className={colLink}>
            Home and living
          </Link>
          <Link to="/products" search={{ cat: "Fashion" }} className={colLink}>
            Fashion
          </Link>
        </div>

        <div>
          <div className={colTitle}>Company</div>
          <Link to="/" className={colLink}>
            Home
          </Link>
          <Link to="/contact" className={colLink}>
            Contact
          </Link>
          <a href="#" className={colLink}>
            Journal
          </a>
          <a href="#" className={colLink}>
            Careers
          </a>
        </div>

        <div>
          <div className={colTitle}>Support</div>
          <a href="#" className={colLink}>
            Shipping
          </a>
          <a href="#" className={colLink}>
            Returns
          </a>
          <a href="#" className={colLink}>
            Order help
          </a>
          <a href="#" className={colLink}>
            Privacy
          </a>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/4 p-6">
          <div className={colTitle}>Visit</div>
          <p className="text-[14px] leading-7 text-white/82">
            MRKT Studio
            <br />
            24 Residency Road
            <br />
            Bengaluru 560025
            <br />
            India
          </p>
          <div className="mt-5 text-[14px] text-white/82">
            <a href="mailto:hello@mrkt.shop" className="block hover:text-white">
              hello@mrkt.shop
            </a>
            <a href="tel:+918040001234" className="mt-1 block hover:text-white">
              +91 80 4000 1234
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-2 border-t border-white/10 px-6 py-4 text-[12px] font-mono-store text-white/55 md:px-12">
        <span>© {new Date().getFullYear()} MRKT. Curated for everyday living.</span>
        <span>Secure checkout / fast shipping / easy returns</span>
      </div>
    </footer>
  );
}
