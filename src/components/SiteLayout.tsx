import * as React from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { CookieBanner } from "@/components/CookieBanner";
import icon from "@/assets/vuis-icon.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Collection" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout() {
  const { count } = useCart();
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

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
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
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={scrollToTopIfCurrent(n.to)}
                className={`cursor-pointer transition-colors hover:text-neutral-900 ${
                  path === n.to ? "text-neutral-900" : "text-neutral-500"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              onClick={scrollToTopIfCurrent("/login")}
              aria-label="Sign in"
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
              <span className="tabular-nums">Bag · {count}</span>
            </Link>

            <button
              type="button"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
          aria-label="Close menu"
          tabIndex={mobileMenuOpen ? 0 : -1}
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-[82vw] max-w-sm flex-col rounded-l-[2rem] border-l border-white/60 bg-[#FAF7F1]/95 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
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
              aria-label="Close menu"
              tabIndex={mobileMenuOpen ? 0 : -1}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-6 py-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => {
                  closeMobileMenu();
                  scrollToTopIfCurrent(n.to)();
                }}
                tabIndex={mobileMenuOpen ? 0 : -1}
                className={`cursor-pointer rounded-2xl px-4 py-3.5 text-lg font-semibold tracking-tight transition-colors ${
                  path === n.to
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:bg-neutral-900/5 hover:text-neutral-900"
                }`}
              >
                {n.label}
              </Link>
            ))}

            <Link
              to="/cart"
              onClick={() => {
                closeMobileMenu();
                scrollToTopIfCurrent("/cart")();
              }}
              tabIndex={mobileMenuOpen ? 0 : -1}
              className={`flex cursor-pointer items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold tracking-tight transition-colors ${
                path === "/cart"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-900/5 hover:text-neutral-900"
              }`}
            >
              <span>Bag</span>
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
              tabIndex={mobileMenuOpen ? 0 : -1}
              className={`flex cursor-pointer items-center gap-2.5 rounded-2xl px-4 py-3.5 text-lg font-semibold tracking-tight transition-colors ${
                path === "/login"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-900/5 hover:text-neutral-900"
              }`}
            >
              <User className="h-4 w-4" /> Sign in
            </Link>
          </nav>

          <div className="mt-auto px-10 pb-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
            Made in the Azores
          </div>
        </aside>
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-neutral-900/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
          <div>
            <img
              src={icon}
              alt="VUIS — minimal eyewear handcrafted in the Azores"
              className="h-4 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
              Minimal eyewear, handcrafted in the Azores. Atlantic light,
              tailored.
            </p>
          </div>

          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
              Shop
            </div>
            <ul className="mt-4 space-y-2.5 text-sm font-medium text-neutral-600">
              <li>
                <Link
                  to="/products"
                  className="cursor-pointer transition-colors hover:text-neutral-900"
                >
                  Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="cursor-pointer transition-colors hover:text-neutral-900"
                >
                  Bag
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="cursor-pointer transition-colors hover:text-neutral-900"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="cursor-pointer transition-colors hover:text-neutral-900"
                >
                  Sign in
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
              Policies
            </div>
            <ul className="mt-4 space-y-2.5 text-sm font-medium text-neutral-600">
              <li>
                <Link
                  to="/refund-policy"
                  className="cursor-pointer transition-colors hover:text-neutral-900"
                >
                  Refund policy
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="cursor-pointer transition-colors hover:text-neutral-900"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  className="cursor-pointer transition-colors hover:text-neutral-900"
                >
                  Cookie policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-900/10 py-6 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
          © {new Date().getFullYear()} VUIS · Made in the Azores
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
}
