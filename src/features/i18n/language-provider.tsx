"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Language } from "./translations";

type TranslationSet = { [Key in keyof typeof translations.en]: string };
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; text: TranslationSet };
const LanguageContext = createContext<LanguageContextValue>({ language: "en", setLanguage: () => {}, text: translations.en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  useEffect(() => { const saved = window.localStorage.getItem("my40plus:language"); if (saved === "te") setLanguageState("te"); }, []);
  const setLanguage = (next: Language) => { setLanguageState(next); window.localStorage.setItem("my40plus:language", next); document.documentElement.lang = next; };
  return <LanguageContext.Provider value={{ language, setLanguage, text: translations[language] }}>{children}</LanguageContext.Provider>;
}
export const useLanguage = () => useContext(LanguageContext);
