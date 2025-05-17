import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/i18n/LanguageContext";
import { getDictionary } from "@/i18n/dictionaries";

export default function AcordionServices() {
  const { locale } = useLanguage();
  const dictionary = getDictionary(locale);

  return (
    <div className="w-full h-full">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-foreground font-light text-2xl lg:text-2xl">
            {dictionary.services.faq[0].question}
          </AccordionTrigger>
          <AccordionContent className="text-lg text-balance md:text-lg font-medium pl-2 pr-10">
            {dictionary.services.faq[0].answer}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-foreground font-light text-2xl lg:text-2xl">
            {dictionary.services.faq[1].question}
          </AccordionTrigger>
          <AccordionContent className="text-lg text-balance md:text-lg font-medium pl-2 pr-10">
            {dictionary.services.faq[1].answer}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-foreground font-light text-2xl lg:text-2xl">
            {dictionary.services.faq[2].question}
          </AccordionTrigger>
          <AccordionContent className="text-lg text-balance md:text-lg font-medium pl-2 pr-10">
            {dictionary.services.faq[2].answer}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-foreground font-light text-2xl lg:text-2xl">
            {dictionary.services.faq[3].question}
          </AccordionTrigger>
          <AccordionContent className="text-lg text-balance md:text-lg font-medium pl-2 pr-10">
            {dictionary.services.faq[3].answer}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5" className="border-none">
          <AccordionTrigger className="text-foreground font-light text-2xl lg:text-2xl">
            {dictionary.services.faq[4].question}
          </AccordionTrigger>
          <AccordionContent className="text-lg text-balance md:text-lg font-medium pl-2 pr-10">
            {dictionary.services.faq[4].answer}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
