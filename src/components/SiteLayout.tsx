import * as React from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import banner from "@/assets/banner.png";

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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" aria-label="VUIS — Home" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src={banner} alt="VUIS" className="h-20 w-auto object-contain" />
          </Link>

          {/* Desktop nav stays unchanged */}
          <nav className="hidden items-center gap-10 text-xs uppercase tracking-[0.25em] md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`transition-colors hover:text-foreground ${
                  path === n.to ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Right actions: cart + mobile hamburger */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em]"
            >
              <span className="relative">
                <ShoppingBag className="h-4 w-4" />
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] leading-none text-primary-foreground tabular-nums" style={{ paddingTop: "1px" }}>
                    {count}
                  </span>
                )}
              </span>
              <span className="hidden sm:inline">Bag</span>
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center bg-transparent text-foreground transition-colors hover:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar with right-side open + close sliding animation */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Overlay */}
        <button
          type="button"
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
          aria-label="Close menu"
          tabIndex={mobileMenuOpen ? 0 : -1}
        />

        {/* Sidebar */}
        <aside
          className={`absolute right-0 top-0 flex h-full w-[82vw] max-w-sm flex-col border-l border-border/60 bg-background shadow-2xl transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-border/60 px-6">
            <Link to="/" aria-label="VUIS — Home" onClick={closeMobileMenu}>
              <img src={banner} alt="VUIS" className="h-20 w-auto object-contain" />
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center bg-transparent text-foreground transition-colors hover:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={closeMobileMenu}
              aria-label="Close menu"
              tabIndex={mobileMenuOpen ? 0 : -1}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex flex-col px-6 py-8">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={closeMobileMenu}
                tabIndex={mobileMenuOpen ? 0 : -1}
                className={`border-b border-border/60 py-5 text-sm uppercase tracking-[0.25em] transition-colors hover:text-foreground ${
                  path === n.to ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {n.label}
              </Link>
            ))}

            <Link
              to="/cart"
              onClick={closeMobileMenu}
              tabIndex={mobileMenuOpen ? 0 : -1}
              className={`flex items-center justify-between border-b border-border/60 py-5 text-sm uppercase tracking-[0.25em] transition-colors hover:text-foreground ${
                path === "/cart" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <span>Bag</span>

              {count > 0 && (
                <span className="rounded-full bg-primary px-2 py-1 text-[10px] text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
          </nav>

          <div className="mt-auto px-6 pb-8 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Made in the Azores
          </div>
        </aside>
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/60 bg-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
          <div>
            <img src={banner} alt="VUIS" className="h-20 w-auto object-contain" />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Minimal eyewear, handcrafted in the Azores. Atlantic light,
              tailored.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Shop
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/products" className="hover:underline">
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:underline">
                  Bag
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Policies
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/refund-policy" className="hover:underline">
                  Refund policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:underline">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 py-6 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          © {new Date().getFullYear()} VUIS · Made in the Azores
        </div>
      </footer>
    </div>
  );
}