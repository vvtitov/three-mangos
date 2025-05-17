import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { getDictionary } from './dictionaries';

type LanguageContextType = {
  locale: "en" | "es";
  setLocale: (locale: "en" | "es") => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<"en" | "es">(() => {
    try {
      // Intenta obtener el idioma almacenado o usar el del navegador
      const savedLocale = localStorage.getItem("user-locale") as "en" | "es";
      if (savedLocale) return savedLocale;
      
      // Detecta el idioma del navegador
      const browserLang = navigator.language.split('-')[0];
      return browserLang === "es" ? "es" : "en";
    } catch (e) {
      return "en"; // Idioma predeterminado
    }
  });

  const setLocale = (newLocale: "en" | "es") => {
    setLocaleState(newLocale);
    localStorage.setItem("user-locale", newLocale);
    document.documentElement.lang = newLocale;
  };

  // Función de traducción
  const t = useMemo(() => {
    const dict = getDictionary(locale);
    return (key: string) => {
      const keys = key.split('.');
      let value: any = { ...dict };
      
      for (const k of keys) {
        if (value === undefined || value === null) break;
        value = value[k];
      }
      
      return value !== undefined ? value : key;
    };
  }, [locale]);

  // Asegura que el atributo lang del documento se actualice
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    t
  }), [locale, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
