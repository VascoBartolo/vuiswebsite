import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "pt";

const STORAGE_KEY = "vuis-lang";

/** First of the browser's preferred languages we support; English otherwise. */
function browserLang(): Lang {
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().split("-")[0];
    if (base === "pt" || base === "en") return base;
  }
  return "en";
}

type LangContextValue = { lang: Lang; setLang: (lang: Lang) => void };

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // shortcut: server renders English, so PT visitors see a brief EN flash; detect from Accept-Language on the server if that matters
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // storage blocked — fall back to the browser setting
    }
    setLangState(stored === "pt" || stored === "en" ? stored : browserLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage blocked — the choice lasts for this visit only
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

/** Picks the active language's entry from a `{ en, pt }` copy object. */
export function useCopy<T>(copy: Record<Lang, T>): T {
  return copy[useLang().lang];
}
