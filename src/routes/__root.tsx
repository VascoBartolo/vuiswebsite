import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { ArrowUpRight, Compass, RefreshCw } from "lucide-react";

import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { LanguageProvider } from "@/lib/i18n";
import { CookieConsentProvider } from "@/lib/cookie-consent";
import { SiteLayout } from "@/components/SiteLayout";
import { Toaster } from "@/components/ui/sonner";

const SITE_URL = "https://vuiswebsite.vercel.app";
const SITE_TITLE = "VUIS — Minimal Eyewear, Designed in the Azores";
const SITE_DESCRIPTION =
  "VUIS designs minimal, luxury eyewear in the Azores. Robust steel frames encased in high-quality resin, with elegant gradient lenses.";

/** Tells search engines the storefront is a real shop with a real address. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VUIS",
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua da Sé nº14",
    addressLocality: "Angra do Heroísmo",
    addressRegion: "Terceira, Azores",
    addressCountry: "PT",
  },
  email: "atelier@vuis.pt",
};

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAF7F1] px-6 text-neutral-900">
      <div className="pointer-events-none absolute -left-24 -top-24 h-[460px] w-[460px] animate-orb rounded-full bg-[#EAD9BC] opacity-70 blur-[110px]" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-[420px] w-[420px] animate-orb-slow rounded-full bg-[#D7E3EE] opacity-60 blur-[110px]" />

      <div className="animate-fade-up relative max-w-lg text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
          Lost at sea
        </p>

        <p className="text-gradient-warm mt-4 text-[7rem] font-semibold leading-none tracking-[-0.05em] md:text-[9rem]">
          404
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
          This page drifted off the map.
        </h1>

        <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-neutral-500">
          The page you are looking for doesn&apos;t exist or has been moved. The
          collection, however, is exactly where you left it.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/products"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.05]"
          >
            Shop the Collection <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to="/"
            className="glass inline-flex cursor-pointer items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-neutral-800 transition-transform duration-300 hover:scale-[1.05]"
          >
            <Compass className="h-4 w-4" /> Back home
          </Link>
        </div>

        <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
          VUIS · Designed in the Azores
        </p>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAF7F1] px-6 text-neutral-900">
      <div className="pointer-events-none absolute -left-24 -top-24 h-[460px] w-[460px] animate-orb rounded-full bg-[#EAD9BC] opacity-70 blur-[110px]" />

      <div className="animate-fade-up relative max-w-lg text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
          This page didn&apos;t load.
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-neutral-500">
          Something went wrong on our end. Try again, or head back to the
          storefront.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.05]"
          >
            <RefreshCw className="h-4 w-4" /> Try again
          </button>
          <a
            href="/"
            className="glass inline-flex cursor-pointer items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-neutral-800 transition-transform duration-300 hover:scale-[1.05]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: SITE_TITLE },
        { name: "description", content: SITE_DESCRIPTION },
        { name: "author", content: "VUIS" },
        { name: "theme-color", content: "#FAF7F1" },
        { name: "robots", content: "index, follow" },

        { property: "og:site_name", content: "VUIS" },
        { property: "og:title", content: SITE_TITLE },
        { property: "og:description", content: SITE_DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: SITE_URL },
        { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content:
            "VUIS Azor and Pico Noir sunglasses side by side on a soft cream background",
        },
        { property: "og:locale", content: "en_GB" },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: SITE_TITLE },
        { name: "twitter:description", content: SITE_DESCRIPTION },
        { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
      ],
      links: [
        { rel: "stylesheet", href: appCss },

        // Favicons
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "canonical", href: SITE_URL },

        // Fonts
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&display=swap",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(organizationSchema),
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

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
  const { queryClient } = Route.useRouteContext();

  return (
    // reducedMotion="user" makes every motion component across the site honour
    // the visitor's OS-level motion preference without per-component checks.
    <MotionConfig reducedMotion="user">
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <CookieConsentProvider>
            <CartProvider>
              <SiteLayout />
              <Toaster />
            </CartProvider>
          </CookieConsentProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </MotionConfig>
  );
}
