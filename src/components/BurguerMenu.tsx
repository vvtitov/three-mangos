import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ModeSwitch } from "@/components/ui/dark-toggle-button";
import { useLanguage } from "@/i18n/LanguageContext";
import { getDictionary } from "@/i18n/dictionaries";
import { motion, AnimatePresence } from "framer-motion";

// Definición de tipos para mejorar la tipificación y mantenibilidad
type MenuItem = {
  name: string;
  link: string;
};

type BurgerMenuProps = {
  // Propiedades para permitir extensibilidad futura
  className?: string;
};

export default function BurgerMenu({ className = "" }: BurgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useLanguage();
  const dictionary = getDictionary(locale);

  // Handle para cerrar el menú
  const handleClose = () => setIsOpen(false);
  
  // Handle para navegar a secciones sin recargar la página
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    handleClose();
    
    // Navegación suave a las secciones
    const element = document.querySelector(href);
    if (element) {
      // Reducir el delay para una respuesta más rápida
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // Efecto para bloquear el scroll cuando el menú está abierto
  useEffect(() => {
    // Usar una clase en lugar de manipular directamente el estilo
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    
    // Cleanup
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  // Generar dinámicamente los elementos del menú
  const menuItems: MenuItem[] = [
    { name: dictionary.header.about, link: "#about" },
    { name: dictionary.header.services, link: "#services" },
    { name: dictionary.header.contact, link: "#contact" },
  ];

  return (
    <div
      id="burgerMenu"
      className={`w-full h-full lg:hidden flex flex-col items-end ${className}`}
      aria-label="Mobile navigation menu"
      role="navigation"
    >
      {/* Botón del menú móvil */}
      <button
        className="text-foreground flex items-center justify-center p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {/* Usar SVG directo en lugar de imágenes externas para mejor control */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="24" 
          viewBox="0 0 28 24" 
          fill="none" 
          stroke="currentColor" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="dark:hidden"
          aria-hidden="true"
        >
          <line x1="2" y1="8" x2="26" y2="8"></line>
          <line x1="2" y1="16" x2="26" y2="16"></line>
        </svg>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="24" 
          viewBox="0 0 28 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="hidden dark:block"
          aria-hidden="true"
        >
          <line x1="2" y1="8" x2="26" y2="8"></line>
          <line x1="2" y1="16" x2="26" y2="16"></line>
        </svg>
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      </button>
      
      {/* Menú móvil con animaciones */} 
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            style={{
              position: "fixed",
              inset: "0",
              backgroundColor: "hsl(var(--background))",
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <motion.div
              style={{
                y: 20,
                opacity: 0,
              }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative mb-30 left-0 right-0">
                <ModeSwitch />
              </div>
              
              <nav className="flex flex-col space-y-3">
                {menuItems.map((item) => (
                  <a 
                    href={item.link} 
                    key={item.name} 
                    onClick={(e) => handleNavigation(e, item.link)}
                    className="text-2xl text-foreground transition-colors hover:text-primary duration-300 uppercase font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              
              <motion.div 
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "7rem",
                }}
              >
                <button
                  className="text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary/70 border border-primary/60 rounded-full p-3 bg-primary transition-all duration-300 flex justify-center items-center"
                  onClick={handleClose}
                  aria-label="Close menu"
                >
                  <X size={28} />
                </button>
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
