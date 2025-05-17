import { useState, useEffect, useRef } from "react";
import { ModeSwitch } from "./ui/dark-toggle-button";
import NavMenu from "./NavMenu";
import BurguerMenu from "./BurguerMenu";
import Logo from "./Logo";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { ArrowDownRightIcon } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { locale, setLocale } = useLanguage();
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

  return (
    <>
      <section
        className={`fixed left-0 right-0 top-3 rounded-2xl mx-auto w-6xl transition-transform
          duration-300 bg-background/90 shadow-sm shadow-black/20 ${
          isScrolled ? "-translate-y-[8rem]" : "translate-y-0 fade-out-100"
        } flex justify-between items-center max-w-full px-6 py-3 select-none z-[10]`}
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
              className="flex items-center py-2 rounded-md text-foreground transition-colors duration-300 cursor-pointer"
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            >
              {locale === "en" ? "EN" : "ES"}
              <ArrowDownRightIcon
                size={24}
                strokeWidth={1.6}
                className={`w-auto transition-transform duration-300 ${
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
                  left: '-1.7rem',
                  zIndex: 10,
                  width: 'auto',
                  backgroundColor: 'hsl(var(--background))',
                  borderBottomLeftRadius: '0.5rem',
                  borderBottomRightRadius: '0.5rem',
                  borderTopLeftRadius: '0.5rem',
                  borderTopRightRadius: '0.5rem',
                  marginLeft: '0.75rem',
                  marginRight: '0.75rem',
                  marginTop: '150px',
                }}
              >
                <div
                  onClick={() => {
                    setLocale("en");
                    setIsLanguageMenuOpen(false);
                  }}
                  className="flex flex-row items-center text-foreground font-medium hover:bg-primary px-4 
                  cursor-pointer rounded-t-xl py-3 transition-all duration-300 border border-foreground/40 border-b-0"
                  >
                    EN
                </div>
                <div
                  onClick={() => {
                    setLocale("es");
                    setIsLanguageMenuOpen(false);
                  }}
                  className="flex flex-row items-center text-foreground font-medium hover:bg-primary hover:text-foreground px-4 
                  cursor-pointer rounded-b-xl py-3 border border-foreground/40"
                >
                  ES
                </div>
              </motion.div>
            )}
          </div>
          <div className="flex items-center justify-end">
            <BurguerMenu />
          </div>
          <div className="relative hidden lg:flex">
            <ModeSwitch />
          </div>
        </div>
      </section>
    </>
  );
}
