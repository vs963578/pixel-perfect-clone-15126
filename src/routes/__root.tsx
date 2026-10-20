import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";
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
      {
        name: "twitter:description",
        content:
          "Shop electronics, fashion, home goods, books and sports in one polished storefront.",
      },
      {
        property: "og:image",
        content:
          "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=elevated%20lifestyle%20still%20life%20of%20modern%20everyday%20essentials%20including%20headphones%20candle%20tote%20bag%20and%20ceramic%20decor%20on%20warm%20neutral%20stone%20surface%2C%20luxury%20editorial%20retail%20photography%2C%20soft%20natural%20sunlight%2C%20premium%20website%20hero%20image&image_size=landscape_16_9",
      },
      {
        name: "twitter:image",
        content:
          "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=elevated%20lifestyle%20still%20life%20of%20modern%20everyday%20essentials%20including%20headphones%20candle%20tote%20bag%20and%20ceramic%20decor%20on%20warm%20neutral%20stone%20surface%2C%20luxury%20editorial%20retail%20photography%2C%20soft%20natural%20sunlight%2C%20premium%20website%20hero%20image&image_size=landscape_16_9",
      },
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
    <AuthProvider>
      <CartProvider>
        <PromoBanner />
        <Navbar />
        <main className="min-h-[calc(100vh-104px)]">
          <Outlet />
        </main>
        <Footer />
        <Toaster position="bottom-right" richColors={false} />
      </CartProvider>
    </AuthProvider>
  );
}
