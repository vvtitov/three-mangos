import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ModeSwitch } from "./ui/dark-toggle-button";
import { useLanguage } from "@/i18n/LanguageContext";
import { getDictionary } from "@/i18n/dictionaries";


export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useLanguage();
  const dictionary = getDictionary(locale);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      id="burgerMenu"
      className="w-full h-full lg:hidden flex flex-col items-end"
    >
      {/* Mobile Menu Button */}
      <button
        className="dark:text-foreground text-foreground flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <img
          src="/burguer-menu-light.svg"
          alt="Burger Menu"
          width={18}
          height={18}
          className="dark:hidden"
        />
        <img
          src="/burguer-menu-dark.svg"
          alt="Burger Menu"
          width={18}
          height={18}
          className="hidden dark:block"
        />
      </button>
      {/* Mobile Menu */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-background z-[2] flex items-center justify-center overflow-hidden"
        style={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? '100vh' : 0,
          transition: 'opacity 0.3s ease-in-out, height 0.3s ease-in-out',
          pointerEvents: isOpen ? "auto" : "none"
        }}
      >
        <div className="flex flex-col text-center w-1/3 space-y-5">
          <div className="mb-20">
            <ModeSwitch />
          </div>
          {[
            { name: dictionary.header.about, link: "#about" },
            { name: dictionary.header.services, link: "#services" },
            { name: dictionary.header.contact, link: "#contact" },
          ].map((item) => (
            <a href={item.link} key={item.name} onClick={(e) => { e.preventDefault(); handleClose(); window.location.href = item.link; }}>
              <p
                className="text-2xl text-foreground transition-colors hover:text-primary duration-300 cursor-pointer uppercase"
              >
                {item.name}
              </p>
            </a>
          ))}
          <div className="flex justify-center items-center pt-20">
            <button
              className="text-primary-foreground focus:outline-none hover:scale-105 border border-primary/60 rounded-full p-3 bg-primary hover:-z-2  transition-transform duration-700 justify-center items-center text-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Close menu"
            >
              <X size={28} className="mx-auto"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
