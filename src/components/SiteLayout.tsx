import * as React from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useCopy, useLang, type Lang } from "@/lib/i18n";
import { CookieBanner } from "@/components/CookieBanner";
import icon from "@/assets/vuis-icon.png";

const copy = {
  en: {
    nav: { "/": "Home", "/products": "Collection", "/contact": "Contact" },
    bag: "Bag",
    signIn: "Sign in",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    madeIn: "Designed in the Azores",
    tagline:
      "Minimal eyewear, designed in the Azores. Atlantic light, tailored.",
    logoAlt: "VUIS — minimal eyewear designed in the Azores",
    shop: "Shop",
    policies: "Policies",
    refund: "Refund policy",
    privacy: "Privacy policy",
    cookies: "Cookie policy",
  },
  pt: {
    nav: { "/": "Início", "/products": "Coleção", "/contact": "Contacto" },
    bag: "Saco",
    signIn: "Entrar",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    language: "Idioma",
    madeIn: "Desenhado nos Açores",
    tagline:
      "Óculos minimalistas, desenhados nos Açores. A luz do Atlântico, à medida.",
    logoAlt: "VUIS — óculos minimalistas desenhados nos Açores",
    shop: "Loja",
    policies: "Políticas",
    refund: "Política de devoluções",
    privacy: "Política de privacidade",
    cookies: "Política de cookies",
  },
};

const nav = ["/", "/products", "/contact"] as const;

const langs: Lang[] = ["en", "pt"];

function LanguagePicker({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const c = useCopy(copy);

  return (
    <div
      role="group"
      aria-label={c.language}
      className={`flex items-center rounded-full border border-neutral-900/10 p-0.5 text-[10px] font-bold tracking-[0.15em] ${className}`}
    >
      {langs.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`cursor-pointer rounded-full px-2.5 py-1.5 uppercase transition-colors duration-300 ${
            lang === l
              ? "bg-neutral-900 text-white"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function SiteLayout() {
  const { count } = useCart();
  const c = useCopy(copy);
  const prefersReducedMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const path = useRouterState({
    select: (s) => s.location.pathname,
  });

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  /**
   * Navigating to a different route already lands at the top via the router's
   * scrollRestoration; clicking the link for the route you are already on is a
   * no-op navigation, so scroll back up explicitly.
   */
  const scrollToTopIfCurrent = (to: string) => () => {
    if (path !== to) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F1] text-neutral-900">
      {/* ── Floating glass nav ── */}
      <header className="fixed left-1/2 top-4 z-40 w-[min(93%,60rem)] -translate-x-1/2">
        <div className="glass flex items-center justify-between rounded-full py-2.5 pl-6 pr-2.5 md:pl-7">
          <Link
            to="/"
            aria-label="VUIS — Home"
            onClick={scrollToTopIfCurrent("/")}
            className="cursor-pointer transition-opacity hover:opacity-70"
          >
            <img src={icon} alt="VUIS" className="h-3.5 w-auto md:h-4" />
          </Link>

          <nav className="hidden items-center gap-9 text-[13px] font-medium md:flex">
            {nav.map((to) => (
              <Link
                key={to}
                to={to}
                onClick={scrollToTopIfCurrent(to)}
                className={`cursor-pointer transition-colors hover:text-neutral-900 ${
                  path === to ? "text-neutral-900" : "text-neutral-500"
                }`}
              >
                {c.nav[to]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguagePicker className="hidden sm:flex" />
            <Link
              to="/login"
              onClick={scrollToTopIfCurrent("/login")}
              aria-label={c.signIn}
              className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-white/60 hover:text-neutral-900 sm:flex"
            >
              <User className="h-4 w-4" />
            </Link>

            <Link
              to="/cart"
              onClick={scrollToTopIfCurrent("/cart")}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-white transition-transform duration-300 hover:scale-[1.05]"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="tabular-nums">
                {c.bag} ·{" "}
                <motion.span
                  key={count}
                  initial={{ y: prefersReducedMotion ? 0 : -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="inline-block"
                >
                  {count}
                </motion.span>
              </span>
            </Link>

            <button
              type="button"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={c.openMenu}
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={closeMobileMenu}
              aria-label={c.closeMenu}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 320, damping: 34 }
              }
              className="absolute right-0 top-0 flex h-full w-[82vw] max-w-sm flex-col rounded-l-[2rem] border-l border-white/60 bg-[#FAF7F1]/95 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex h-16 items-center justify-between px-6">
                <Link
                  to="/"
                  aria-label="VUIS — Home"
                  onClick={() => {
                    closeMobileMenu();
                    scrollToTopIfCurrent("/")();
                  }}
                >
                  <img src={icon} alt="VUIS" className="h-3.5 w-auto" />
                </Link>

                <button
                  type="button"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-neutral-900/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={closeMobileMenu}
                  aria-label={c.closeMenu}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="flex flex-col gap-1 px-6 py-6">
                {nav.map((to) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => {
                      closeMobileMenu();
                      scrollToTopIfCurrent(to)();
                    }}
                    className={`cursor-pointer rounded-2xl px-4 py-3.5 text-lg font-semibold tracking-tight transition-colors ${
                      path === to
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-600 hover:bg-neutral-900/5 hover:text-neutral-900"
                    }`}
                  >
                    {c.nav[to]}
                  </Link>
                ))}

                <Link
                  to="/cart"
                  onClick={() => {
                    closeMobileMenu();
                    scrollToTopIfCurrent("/cart")();
                  }}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold tracking-tight transition-colors ${
                    path === "/cart"
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-600 hover:bg-neutral-900/5 hover:text-neutral-900"
                  }`}
                >
                  <span>{c.bag}</span>
                  {count > 0 && (
                    <span className="rounded-full bg-[#CBB588] px-2.5 py-1 text-[11px] font-bold text-neutral-900 tabular-nums">
                      {count}
                    </span>
                  )}
                </Link>

                <Link
                  to="/login"
                  onClick={() => {
                    closeMobileMenu();
                    scrollToTopIfCurrent("/login")();
                  }}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-2xl px-4 py-3.5 text-lg font-semibold tracking-tight transition-colors ${
                    path === "/login"
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-600 hover:bg-neutral-900/5 hover:text-neutral-900"
                  }`}
                >
                  <User className="h-4 w-4" /> {c.signIn}
                </Link>
              </nav>

              <div className="mt-auto flex items-center justify-between px-10 pb-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
                {c.madeIn}
                <LanguagePicker />
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-neutral-900/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
          <div>
            <img src={icon} alt={c.logoAlt} className="h-4 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
              {c.tagline}
            </p>
          </div>

          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
              {c.shop}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm font-medium text-neutral-600">
              <li>
                <Link
                  to="/products"
                  className="cursor-pointer transition-colors hover:text-neutral-900"
                >
                  {c.nav["/products"]}
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="cursor-pointer transition-colors hover:text-neutral-900"
                >
                  {c.bag}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="cursor-pointer transition-colors hover:text-neutral-900"
                >
                  {c.nav["/contact"]}
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="cursor-pointer transition-colors hover:text-neutral-900"
                >
                  {c.signIn}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
              {c.policies}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm font-medium text-neutral-600">
              <li>
                <Link
                  to="/refund-policy"
                  className="cursor-pointer transition-colors hover:text-neutral-900"
                >
                  {c.refund}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="cursor-pointer transition-colors hover:text-neutral-900"
                >
                  {c.privacy}
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  className="cursor-pointer transition-colors hover:text-neutral-900"
                >
                  {c.cookies}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-900/10 py-6 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
          © {new Date().getFullYear()} VUIS · {c.madeIn}
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
}
