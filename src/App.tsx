import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function App() {

  return (
    <>
      <main id="main" className="bg-background min-w-auto w-full h-full">
      <Header />
      <Hero />
      <About />
      <img
        src="/arrow.svg"
        alt="Flecha para abajo"
        width={400}
        height={400}
        className="mx-auto pointer-events-none pt-8 select-none"
        style={{
          filter: "drop-shadow(3px 10px 2px hsl(var(--primary)))",
        }}
      />
      <Services />
      <Contact />
      <Footer />
    </main>
    </>
  )
}

export default App
