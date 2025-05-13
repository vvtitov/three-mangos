import { useState, useEffect, useRef } from "react";
import { ModeSwitch } from "./ui/dark-toggle-button";
import NavMenu from "./NavMenu";
import BurguerMenu from "./BurguerMenu";
import Logo from "./Logo";
import { useLanguage } from "@/i18n/LanguageContext";
import { getDictionary } from "@/i18n/dictionaries";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { locale, setLocale } = useLanguage();
  const [dictionary, setDictionary] = useState({
    header: {
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
      language: "Language",
      offer: "<strong>We have 100% positive reviews 🏆</strong>",
    }
  });
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > lastScrollY && currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (locale) {
      try {
        const dict = getDictionary(locale);
        setDictionary(dict);
      } catch (error) {
        console.error("Error loading dictionary:", error);
      }
    }
  }, [locale]);

  return (
    <>
      <header
        id="header"
        className={`header fixed top-0 left-0 w-full transition-transform duration-300 bg-background ${
          isScrolled ? "-translate-y-full" : "translate-y-0 fade-out-100"
        } flex justify-between items-center max-w-full px-4 py-3 select-none dark:border-gray-200 z-[10]`}
      >
        <div id="leftHeader" className="flex items-center">
          <Logo />
        </div>

        <div id="rightHeader" className="flex items-center gap-2">
          <div id="navMenu" className="hidden lg:block mr-10">
            <NavMenu />
          </div>
          <div
            className="flex items-center pr-5 relative"
            ref={languageMenuRef}
          >
            <div
              className="flex items-center px-2 py-2 rounded-md text-foreground transition-colors duration-300 bg-transparent cursor-pointer"
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            >
              {locale === "en" ? "EN" : "ES"}
              <ChevronDown
                className={`w-4 transition-transform duration-300 ${
                  isLanguageMenuOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {isLanguageMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '-1.3rem',
                  zIndex: 10,
                  width: 'auto',
                  backgroundColor: 'rgba(var(--primary), 0.7)',
                  borderBottomLeftRadius: '0.5rem',
                  borderBottomRightRadius: '0.5rem',
                  borderTopLeftRadius: '0.5rem',
                  borderTopRightRadius: '0.5rem',
                  marginLeft: '0.75rem',
                  marginRight: '0.75rem',
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem'
                }}
              >
                <div
                  onClick={() => {
                    setLocale("en");
                    setIsLanguageMenuOpen(false);
                  }}
                  className="flex flex-row items-center text-foreground font-light hover:bg-primary/90 px-4 cursor-pointer rounded-t-xl py-3 transition-all duration-300"
                >
                  EN
                </div>
                <div
                  onClick={() => {
                    setLocale("es");
                    setIsLanguageMenuOpen(false);
                  }}
                  className="flex flex-row items-center text-foreground font-light hover:bg-primary/90 px-4 cursor-pointer rounded-b-xl py-3"
                >
                  ES
                </div>
              </motion.div>
            )}
          </div>
          <div className="flex items-center justify-end mr-3">
            <BurguerMenu />
          </div>
          <div className="relative hidden lg:flex">
            <ModeSwitch />
          </div>
        </div>
      </header>
      {!isScrolled && (
        <div className="absolute mt-[5.1rem] p-3 text-center text-sm w-full h-auto bg-primary/70 flex justify-center items-center mx-auto top-0 left-0 right-0 shadow-lg shadow-primary/30">
          <span
            className="w-full text-balance font-medium text-foreground"
            dangerouslySetInnerHTML={{
              __html: dictionary.header.offer,
            }}
          />
        </div>
      )}
    </>
  );
}
