import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact us — MRKT" },
      {
        name: "description",
        content:
          "Get in touch with the MRKT team. We're here to help with orders, returns, and product questions.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message sent — we'll get back to you within 24 hours.");
    }, 600);
  }

  return (
    <section className="px-6 md:px-12 py-14 md:py-20 max-w-5xl mx-auto">
      <div className="font-mono-store text-[11px] tracking-[0.18em] uppercase text-accent mb-4">
        We're here to help
      </div>
      <h1 className="font-display text-4xl md:text-6xl font-bold tracking-[-0.02em] mb-4">
        Contact us
      </h1>
      <p className="text-ink2 max-w-xl mb-12">
        Questions about an order, product, or something else? Drop us a note and we'll reply within
        24 hours.
      </p>

      <div className="grid md:grid-cols-[1fr_320px] gap-10">
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5 shadow-soft"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="block">
              <span className="font-mono-store text-[11px] uppercase tracking-wider text-ink3">
                Name
              </span>
              <input
                required
                name="name"
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-[10px] border border-border bg-background focus:outline-none focus:border-ink text-sm"
              />
            </label>
            <label className="block">
              <span className="font-mono-store text-[11px] uppercase tracking-wider text-ink3">
                Email
              </span>
              <input
                required
                type="email"
                name="email"
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-[10px] border border-border bg-background focus:outline-none focus:border-ink text-sm"
              />
            </label>
          </div>
          <label className="block">
            <span className="font-mono-store text-[11px] uppercase tracking-wider text-ink3">
              Subject
            </span>
            <input
              required
              name="subject"
              className="mt-1.5 w-full px-3.5 py-2.5 rounded-[10px] border border-border bg-background focus:outline-none focus:border-ink text-sm"
            />
          </label>
          <label className="block">
            <span className="font-mono-store text-[11px] uppercase tracking-wider text-ink3">
              Message
            </span>
            <textarea
              required
              name="message"
              rows={6}
              className="mt-1.5 w-full px-3.5 py-2.5 rounded-[10px] border border-border bg-background focus:outline-none focus:border-ink text-sm resize-none"
            />
          </label>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] bg-accent text-white text-sm font-semibold hover:bg-accent2 transition-colors disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            {sending ? "Sending…" : "Send message"}
          </button>
        </form>

        <aside className="space-y-5">
          <div className="bg-bg2 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 mt-0.5 text-accent" />
              <div>
                <div className="font-mono-store text-[11px] uppercase tracking-wider text-ink3">
                  Email
                </div>
                <a href="mailto:hello@mrkt.shop" className="text-sm font-medium hover:underline">
                  hello@mrkt.shop
                </a>
              </div>
            </div>
          </div>
          <div className="bg-bg2 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Phone className="h-4 w-4 mt-0.5 text-accent" />
              <div>
                <div className="font-mono-store text-[11px] uppercase tracking-wider text-ink3">
                  Phone
                </div>
                <span className="text-sm font-medium">+91 80 4000 1234</span>
                <div className="text-xs text-ink3 mt-0.5">Mon–Sat, 9am–7pm IST</div>
              </div>
            </div>
          </div>
          <div className="bg-bg2 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-0.5 text-accent" />
              <div>
                <div className="font-mono-store text-[11px] uppercase tracking-wider text-ink3">
                  Office
                </div>
                <span className="text-sm font-medium leading-relaxed">
                  MRKT HQ, 4th Floor
                  <br />
                  Indiranagar, Bengaluru 560038
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
