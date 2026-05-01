import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { Navbar, PromoBanner } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-ink2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-ink px-4 py-2 text-sm font-medium text-white"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MRKT — Curated General Store" },
      {
        name: "description",
        content:
          "From electronics to everyday essentials — curated, quality goods, delivered to your door.",
      },
      { property: "og:title", content: "MRKT — Curated General Store" },
      {
        property: "og:description",
        content: "Shop electronics, fashion, home goods, books and sports — all in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MRKT — Curated General Store" },
      { name: "description", content: "Pixel Perfect Replica creates exact visual duplicates of web page screenshots." },
      { property: "og:description", content: "Pixel Perfect Replica creates exact visual duplicates of web page screenshots." },
      { name: "twitter:description", content: "Pixel Perfect Replica creates exact visual duplicates of web page screenshots." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/60e97ae8-f607-458c-8a25-1136b0315775/id-preview-4fa4dc1a--f3de5685-d929-4ab8-a899-8a50422a4709.lovable.app-1777615682372.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/60e97ae8-f607-458c-8a25-1136b0315775/id-preview-4fa4dc1a--f3de5685-d929-4ab8-a899-8a50422a4709.lovable.app-1777615682372.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <CartProvider>
      <PromoBanner />
      <Navbar />
      <main className="min-h-[calc(100vh-104px)]">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors={false} />
    </CartProvider>
  );
}
