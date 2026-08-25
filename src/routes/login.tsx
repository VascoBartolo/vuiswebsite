import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — VUIS" },
      // Account pages carry no indexable content
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LoginPage,
});

/** Official Google "G" mark. */
function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

/** Apple mark. */
function AppleMark() {
  return (
    <svg
      viewBox="0 0 384 512"
      className="h-4 w-4 fill-current"
      aria-hidden="true"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState<string | null>(null);

  // No auth provider is wired yet — every path reports "coming soon" rather
  // than pretending to sign anyone in.
  const notYetAvailable = (label: string) => {
    setPending(label);
    setTimeout(() => {
      setPending(null);
      toast("Accounts are coming soon", {
        description: `${label} will be enabled once checkout goes live.`,
      });
    }, 600);
  };

  const isSignUp = mode === "signup";

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 -top-24 h-[440px] w-[440px] animate-orb rounded-full bg-[#EAD9BC] opacity-60 blur-[110px]" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-[400px] w-[400px] animate-orb-slow rounded-full bg-[#D7E3EE] opacity-50 blur-[110px]" />

      <div className="relative mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6 pb-24 pt-32">
        <div className="animate-fade-up text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A98B54]">
            {isSignUp ? "Create account" : "Welcome back"}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em]">
            {isSignUp ? (
              <>
                Join <span className="text-gradient-warm">VUIS.</span>
              </>
            ) : (
              <>
                Sign <span className="text-gradient-warm">in.</span>
              </>
            )}
          </h1>
          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
            {isSignUp
              ? "Save your bag, track orders, and hear about numbered releases first."
              : "Access your orders, saved bag, and numbered series registry."}
          </p>
        </div>

        <div className="glass animate-fade-up delay-100 mt-9 rounded-[1.75rem] p-6 md:p-7">
          {/* Social providers */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => notYetAvailable("Google sign-in")}
              disabled={pending !== null}
              className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-neutral-900/15 bg-white/80 py-3.5 text-sm font-semibold text-neutral-800 transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending === "Google sign-in" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <GoogleMark />
              )}
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => notYetAvailable("Apple sign-in")}
              disabled={pending !== null}
              className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-neutral-900 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending === "Apple sign-in" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <AppleMark />
              )}
              Continue with Apple
            </button>
          </div>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-neutral-900/10" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
              or
            </span>
            <span className="h-px flex-1 bg-neutral-900/10" />
          </div>

          {/* Email + password */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              notYetAvailable(isSignUp ? "Account creation" : "Email sign-in");
            }}
            className="space-y-4"
          >
            {isSignUp && (
              <div>
                <label
                  htmlFor="name"
                  className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-2 h-12 w-full rounded-2xl border border-neutral-900/10 bg-white/70 px-4 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="mt-2 h-12 w-full rounded-2xl border border-neutral-900/10 bg-white/70 px-4 text-sm backdrop-blur-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400"
              >
                Password
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  required
                  minLength={8}
                  className="h-12 w-full rounded-2xl border border-neutral-900/10 bg-white/70 px-4 pr-12 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-neutral-400 transition-colors hover:text-neutral-800"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {isSignUp && (
                <p className="mt-2 text-xs text-neutral-400">
                  At least 8 characters.
                </p>
              )}
            </div>

            {!isSignUp && (
              <button
                type="button"
                onClick={() => notYetAvailable("Password reset")}
                className="cursor-pointer text-xs font-semibold text-neutral-500 underline underline-offset-4 transition-colors hover:text-neutral-900"
              >
                Forgot your password?
              </button>
            )}

            <button
              type="submit"
              disabled={pending !== null}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-neutral-900 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending === "Email sign-in" || pending === "Account creation" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
              {isSignUp ? "Create account" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-neutral-500">
            {isSignUp ? "Already have an account?" : "New to VUIS?"}{" "}
            <button
              type="button"
              onClick={() => setMode(isSignUp ? "signin" : "signup")}
              className="cursor-pointer font-semibold text-neutral-900 underline underline-offset-4"
            >
              {isSignUp ? "Sign in" : "Create one"}
            </button>
          </p>
        </div>

        <p className="animate-fade-up delay-200 mx-auto mt-6 max-w-xs text-center text-xs leading-relaxed text-neutral-400">
          By continuing you agree to our{" "}
          <Link
            to="/privacy-policy"
            className="cursor-pointer underline underline-offset-2 hover:text-neutral-700"
          >
            privacy policy
          </Link>{" "}
          and{" "}
          <Link
            to="/cookie-policy"
            className="cursor-pointer underline underline-offset-2 hover:text-neutral-700"
          >
            cookie policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
