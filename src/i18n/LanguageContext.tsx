import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type LanguageContextType = {
  locale: "en" | "es";
  setLocale: (locale: "en" | "es") => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

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
    document.documentElement.lang = newLocale; // Actualiza el atributo lang del HTML
  };

  // Asegura que el atributo lang del documento se actualice
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
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
