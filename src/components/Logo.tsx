export default function Logo() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div id="logo" className="flex w-[60px] justify-start z-10 items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
          <img
            src="/3m-logo-black.png"
            alt="Logo version oscura de three mangos"
            width={80}
            height={80}
            className="dark:hidden hover:rotate-3 hover:scale-125 duration-500 cursor-pointer"
          />
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
          <img
            src="/3m-logo-white.png"
            alt="Logo version clara de three mangos"
            width={80}
            height={80}
            className="hidden dark:block hover:rotate-3 hover:scale-125 duration-500 cursor-pointer"
          />
        </a>
      </div>
    </>
  );
}
