import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "vuis-cookie-consent";

/**
 * Consent categories. `necessary` covers the bag and the future auth session
 * and cannot be switched off; the rest stay off until the visitor opts in.
 */
export type ConsentChoices = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export type StoredConsent = ConsentChoices & {
  /** ISO-8601 timestamp of the decision, e.g. "2026-08-25T09:12:00.000Z" */
  decidedAt: string;
  version: number;
};

/** Bump when the cookie categories change so visitors are asked again. */
const CONSENT_VERSION = 1;

const DENY_ALL: ConsentChoices = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const ACCEPT_ALL: ConsentChoices = {
  necessary: true,
  analytics: true,
  marketing: true,
};

type CookieConsentValue = {
  consent: StoredConsent | null;
  /** True until the visitor has made a choice — drives the banner. */
  needsDecision: boolean;
  bannerOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (choices: Omit<ConsentChoices, "necessary">) => void;
  /** Re-opens the banner so a visitor can change their mind. */
  openPreferences: () => void;
  closeBanner: () => void;
};

const CookieConsentContext = createContext<CookieConsentValue | null>(null);

function readStoredConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed?.version !== CONSENT_VERSION) return null;

    return parsed;
  } catch {
    // Unreadable or corrupted value — treat as no decision yet
    return null;
  }
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<StoredConsent | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [reopened, setReopened] = useState(false);

  // Read on the client only — localStorage does not exist during SSR
  useEffect(() => {
    setConsent(readStoredConsent());
    setHydrated(true);
  }, []);

  const persist = useCallback((choices: ConsentChoices) => {
    const record: StoredConsent = {
      ...choices,
      decidedAt: new Date().toISOString(),
      version: CONSENT_VERSION,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      // Storage unavailable (private mode) — keep the choice for this session
    }

    setConsent(record);
    setReopened(false);
  }, []);

  const value = useMemo<CookieConsentValue>(() => {
    const needsDecision = hydrated && consent === null;

    return {
      consent,
      needsDecision,
      bannerOpen: needsDecision || reopened,
      acceptAll: () => persist(ACCEPT_ALL),
      rejectAll: () => persist(DENY_ALL),
      save: (choices) => persist({ necessary: true, ...choices }),
      openPreferences: () => setReopened(true),
      closeBanner: () => setReopened(false),
    };
  }, [consent, hydrated, reopened, persist]);

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider",
    );
  }
  return ctx;
}
