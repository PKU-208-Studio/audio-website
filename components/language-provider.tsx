"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Locale, LocalizedText } from "@/lib/types";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  text: (value: LocalizedText) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("reel-locale");
    if (saved === "zh" || saved === "en") setLocaleState(saved);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: (next) => {
        setLocaleState(next);
        localStorage.setItem("reel-locale", next);
        document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
      },
      text: (content) => content[locale],
    }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
