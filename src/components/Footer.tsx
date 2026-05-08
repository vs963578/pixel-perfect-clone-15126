import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const colTitle = "text-[12px] font-mono-store uppercase tracking-[0.18em] text-white/60 mb-4";
const colLink = "block text-[13px] text-white/90 hover:text-white transition-colors mb-2";

export function Footer() {
  return (
    <footer className="bg-[#172337] text-white mt-12">
      <div className="px-6 md:px-12 py-12 grid gap-10 md:grid-cols-6">
        <div>
          <div className={colTitle}>About</div>
          <Link to="/contact" className={colLink}>Contact Us</Link>
          <a className={colLink}>About Us</a>
          <a className={colLink}>Careers</a>
          <a className={colLink}>MRKT Stories</a>
          <a className={colLink}>Press</a>
          <a className={colLink}>Corporate Information</a>
        </div>

        <div>
          <div className={colTitle}>Group Companies</div>
          <a className={colLink}>Myntra</a>
          <a className={colLink}>Cleartrip</a>
          <a className={colLink}>Shopsy</a>
        </div>

        <div>
          <div className={colTitle}>Help</div>
          <a className={colLink}>Payments</a>
          <a className={colLink}>Shipping</a>
          <a className={colLink}>Cancellation & Returns</a>
          <a className={colLink}>FAQ</a>
        </div>

        <div>
          <div className={colTitle}>Consumer Policy</div>
          <a className={colLink}>Cancellation & Returns</a>
          <a className={colLink}>Terms Of Use</a>
          <a className={colLink}>Security</a>
          <a className={colLink}>Privacy</a>
          <a className={colLink}>Sitemap</a>
          <a className={colLink}>Grievance Redressal</a>
          <a className={colLink}>EPR Compliance</a>
          <a className={colLink}>FSSAI Food Safety</a>
        </div>

        <div className="border-l border-white/10 pl-6">
          <div className={colTitle}>Mail Us:</div>
          <p className="text-[13px] text-white/90 leading-6">
            MRKT Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India
          </p>
          <div className={`${colTitle} mt-6`}>Social:</div>
          <div className="flex gap-4 text-white/90">
            <a aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
            <a aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
            <a aria-label="YouTube"><Youtube className="h-5 w-5" /></a>
            <a aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
          </div>
        </div>

        <div className="border-l border-white/10 pl-6">
          <div className={colTitle}>Registered Office Address:</div>
          <p className="text-[13px] text-white/90 leading-6">
            MRKT Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India<br />
            CIN : U51109KA2012PTC066107<br />
            Telephone: <span className="text-[#2874f0]">044-45614700</span> / <span className="text-[#2874f0]">044-67415800</span>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 md:px-12 py-4 text-[12px] font-mono-store text-white/60 flex flex-wrap justify-between gap-2">
        <span>© {new Date().getFullYear()} MRKT</span>
        <span>Made with care</span>
      </div>
    </footer>
  );
}
