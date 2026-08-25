import { createFileRoute, Link } from "@tanstack/react-router";
import { useCookieConsent } from "@/lib/cookie-consent";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — VUIS" },
      {
        name: "description",
        content:
          "How VUIS uses cookies: strictly necessary, analytics and marketing categories, and how to change your choices at any time.",
      },
    ],
  }),
  component: CookiePolicy,
});

const categories = [
  {
    name: "Strictly necessary",
    always: true,
    purpose:
      "Keeps your bag between visits, holds your sign-in session once accounts go live, and protects forms against abuse.",
    examples: "vuis-cart, vuis-cookie-consent, sign-in session token",
  },
  {
    name: "Analytics",
    always: false,
    purpose:
      "Anonymous, aggregated statistics about which pages and frames people look at, so we know what to photograph and stock next.",
    examples: "Page views, product views, referral source",
  },
  {
    name: "Marketing",
    always: false,
    purpose:
      "Measures whether a campaign led to a purchase. Set only if you opt in, and never used to build a profile of you across other sites.",
    examples: "Campaign attribution identifiers",
  },
];

function CookiePolicy() {
  const { consent, openPreferences } = useCookieConsent();

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <div className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
        Policy
      </div>
      <h1 className="mt-4 text-5xl font-semibold tracking-[-0.03em]">
        Cookie Policy
      </h1>
      <p className="mt-6 text-sm leading-relaxed text-neutral-500">
        This page explains the cookies and similar browser storage VUIS uses,
        why we use them, and how to change your mind at any point. It sits
        alongside our{" "}
        <Link
          to="/privacy-policy"
          className="cursor-pointer font-semibold text-neutral-700 underline underline-offset-2 hover:text-neutral-900"
        >
          privacy policy
        </Link>
        .
      </p>

      {/* Current choice + re-open the banner */}
      <div className="glass mt-10 rounded-2xl p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
          Your current choice
        </p>
        <p className="mt-2 text-sm font-medium text-neutral-700">
          {consent
            ? `Analytics ${consent.analytics ? "on" : "off"} · Marketing ${
                consent.marketing ? "on" : "off"
              }`
            : "No choice recorded yet."}
        </p>
        <button
          type="button"
          onClick={openPreferences}
          className="mt-5 cursor-pointer rounded-full bg-neutral-900 px-6 py-3 text-xs font-semibold text-white transition-transform duration-300 hover:scale-[1.04]"
        >
          Manage cookie preferences
        </button>
      </div>

      <div className="mt-12 space-y-6 text-sm leading-relaxed text-neutral-500">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900">
          What a cookie is
        </h2>
        <p>
          A cookie is a small file a site stores in your browser. We also use
          local storage, which works the same way for our purposes — your bag,
          for example, lives there so it survives a refresh. Everything below
          applies to both.
        </p>

        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900">
          The categories we use
        </h2>

        <div className="space-y-4">
          {categories.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border border-white/70 bg-white/60 p-5 backdrop-blur-sm"
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-bold text-neutral-900">{c.name}</p>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${
                    c.always
                      ? "bg-neutral-900 text-white"
                      : "bg-[#EAD9BC] text-neutral-800"
                  }`}
                >
                  {c.always ? "Always on" : "Opt in"}
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-neutral-500">
                {c.purpose}
              </p>
              <p className="mt-2 text-xs text-neutral-400">
                <span className="font-semibold uppercase tracking-[0.2em]">
                  Examples:
                </span>{" "}
                {c.examples}
              </p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900">
          Accounts and sign-in
        </h2>
        <p>
          When accounts launch you will be able to sign in with an email and
          password, or with Google or Apple. Signing in sets a strictly
          necessary session cookie so the site can recognise you between pages.
          That cookie only exists once you choose to sign in, and it is removed
          when you sign out.
        </p>

        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900">
          Changing or withdrawing consent
        </h2>
        <p>
          Use the button above to reopen the preferences panel at any time. You
          can also clear cookies and site data in your browser settings, which
          resets your choice and makes the banner appear again on your next
          visit.
        </p>

        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900">
          Questions
        </h2>
        <p>
          Write to{" "}
          <span className="font-semibold text-neutral-700">
            atelier@vuis.pt
          </span>{" "}
          and we will answer within two working days.
        </p>
      </div>
    </article>
  );
}
