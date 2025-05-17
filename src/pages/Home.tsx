import Header from "@/components/HeaderSection";
import Hero from "@/components/HeroSection";
import About from "@/components/AboutSection";
import Services from "@/components/ServicesSection";
import Contact from "@/components/ContactSection";
import Footer from "@/components/FooterSection";

export default function Home() {
    return (
        <main id="main" className="bg-background min-h-screen min-w-auto w-full h-full">
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
    )
}