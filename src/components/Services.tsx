import { TabsServices } from "./AnimatedTab";
import AcordionServices from "./AcordionServices";
import ServicesCarousel from "./ServicesCarrousel";
import { FlipWords } from "./ui/flip-words";
import { useLanguage } from "@/i18n/LanguageContext";
import { getDictionary } from "@/i18n/dictionaries";
import { Separator } from "@radix-ui/react-separator";

export default function Services() {
  const { locale } = useLanguage();
  const dictionary = getDictionary(locale);

  const words = [
    dictionary.services.words[0],
    dictionary.services.words[1],
    dictionary.services.words[2],
    dictionary.services.words[3],
  ];

  return (
    <section id="services" className="flex flex-col w-full">
      <div className="flex flex-col justify-center items-center align-middle mx-auto  overflow-hidden p-10">
        <h1 className="uppercase font-semibold text-3xl md:text-5xl text-secondary-foreground flex justify-center items-center hover:rotate-2 -rotate-3 transition-transform duration-500 gap-1">
          {dictionary.services.title}{" "}
          <FlipWords
            words={words}
            className="text-primary dark:text-primary text-3xl md:text-5xl overflow-hidden uppercase font-semibold"
          />{" "}
        </h1>
      </div>
      <div className="flex flex-col h-full items-center justify-center p-10 my-4">
        <TabsServices />
      </div>

      <Separator className="h-px bg-foreground/50 mt-20 mx-auto w-2/4" />
      <div className="flex flex-col items-center max-w-5xl w-full mx-auto px-10 pt-20">
        <h2 className="text-3xl lg:text-4xl text-center mb-10 animate-fade-in">
          {dictionary.services.carouselTitle}
        </h2>
      </div>
      <ServicesCarousel />
      <Separator className="h-px bg-foreground/50 mt-20 mx-auto w-2/4" />

      <div className="flex flex-col items-center max-w-5xl w-full mx-auto px-10 py-20">
        <h1 className="text-3xl lg:text-5xl font-semibold text-left mb-8 w-full uppercase">
          {dictionary.services.faqTitle}
        </h1>
        <AcordionServices />
      </div>
    </section>
  );
}
