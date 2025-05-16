import { useEffect, useState } from "react";

export default function Logo() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Función para verificar si estamos en modo oscuro
  const checkDarkMode = () => {
    return document.documentElement.classList.contains('dark');
  };
  
  // Detecta el tema actual y actualiza el estado
  useEffect(() => {
    // Verificar tema inicial
    setIsDarkMode(checkDarkMode());
    
    // Crear un observer para detectar cambios en las clases del HTML
    const observer = new MutationObserver(() => {
      setIsDarkMode(checkDarkMode());
    });
    
    // Observar cambios en las clases del documento HTML
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="logo" className="flex w-[60px] justify-start z-10 items-center">
      <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
        {isDarkMode ? (
          // Logo blanco para modo oscuro
          <img
            src="/3m-logo-white.png"
            alt="Logo version clara de three mangos"
            width={80}
            height={80}
            className="hover:rotate-3 hover:scale-125 duration-500 cursor-pointer"
          />
        ) : (
          // Logo negro para modo claro
          <img
            src="/3m-logo-black.png"
            alt="Logo version oscura de three mangos"
            width={80}
            height={80}
            className="hover:rotate-3 hover:scale-125 duration-500 cursor-pointer"
          />
        )}
      </a>
    </div>
  );
}
