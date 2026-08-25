import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import { useCookieConsent } from "@/lib/cookie-consent";

type ToggleRowProps = {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
};

function ToggleRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl bg-white/50 px-4 py-3">
      <div>
        <p className="text-xs font-bold text-neutral-800">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`mt-0.5 h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors duration-300 ${
          checked ? "bg-neutral-900" : "bg-neutral-300"
        } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      >
        <span
          className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export function CookieBanner() {
  const { bannerOpen, acceptAll, rejectAll, save, consent } =
    useCookieConsent();

  const [customising, setCustomising] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);

  // Re-opening from the cookie policy should show the current selections
  React.useEffect(() => {
    if (!bannerOpen) return;
    setCustomising(false);
    setAnalytics(consent?.analytics ?? false);
    setMarketing(consent?.marketing ?? false);
  }, [bannerOpen, consent]);

  if (!bannerOpen) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="animate-fade-up fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 md:px-5 md:pb-5"
    >
      <div className="glass-strong mx-auto max-w-4xl rounded-[1.75rem] p-5 shadow-[0_24px_60px_-20px_rgba(60,45,20,0.45)] md:p-6">
        <div className="flex items-start gap-3.5">
          <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white sm:flex">
            <Cookie className="h-5 w-5" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-neutral-900">
              We use a few cookies
            </p>
            <p className="mt-1 text-xs leading-relaxed text-neutral-600 md:text-sm">
              Essential cookies keep your bag and your sign-in working. With
              your permission we would also use analytics to understand what
              people look at, and marketing cookies to measure our campaigns.
              Read the{" "}
              <Link
                to="/cookie-policy"
                className="cursor-pointer font-semibold underline underline-offset-2 hover:text-neutral-900"
              >
                cookie policy
              </Link>
              .
            </p>

            {customising && (
              <div className="mt-4 space-y-2">
                <ToggleRow
                  title="Strictly necessary"
                  description="Bag contents, sign-in session and security. Always on."
                  checked
                  disabled
                />
                <ToggleRow
                  title="Analytics"
                  description="Anonymous page and product statistics."
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <ToggleRow
                  title="Marketing"
                  description="Measures campaigns and ad performance."
                  checked={marketing}
                  onChange={setMarketing}
                />
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={acceptAll}
                className="cursor-pointer rounded-full bg-neutral-900 px-6 py-3 text-xs font-semibold text-white transition-transform duration-300 hover:scale-[1.04] md:text-sm"
              >
                Accept all
              </button>

              {customising ? (
                <button
                  type="button"
                  onClick={() => save({ analytics, marketing })}
                  className="cursor-pointer rounded-full border border-neutral-900 px-6 py-3 text-xs font-semibold text-neutral-900 transition-colors duration-300 hover:bg-neutral-900 hover:text-white md:text-sm"
                >
                  Save choices
                </button>
              ) : (
                <button
                  type="button"
                  onClick={rejectAll}
                  className="cursor-pointer rounded-full border border-neutral-900 px-6 py-3 text-xs font-semibold text-neutral-900 transition-colors duration-300 hover:bg-neutral-900 hover:text-white md:text-sm"
                >
                  Necessary only
                </button>
              )}

              <button
                type="button"
                onClick={() => setCustomising((c) => !c)}
                className="cursor-pointer px-3 py-3 text-xs font-semibold text-neutral-500 underline underline-offset-4 transition-colors hover:text-neutral-900 md:text-sm"
              >
                {customising ? "Hide options" : "Customise"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
