import { Tabs } from "./ui/tabs";
import { useLanguage } from "@/i18n/LanguageContext";
import { getDictionary } from "@/i18n/dictionaries";

export function TabsServices() {
  const { locale } = useLanguage();
  const dictionary = getDictionary(locale);

  const tabs = [
    {
      title: dictionary.services.tabs[0].title,
      value: dictionary.services.tabs[0].value,
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-3xl font-bold text-white bg-gradient-to-br from-primary to-secondary dark:bg-primary">
          <img
            src="/mango.png"
            alt="dummy image"
            width="600"
            height="600"
            className="object-cover object-center-center relative w-full rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: dictionary.services.tabs[1].title,
      value: dictionary.services.tabs[1].value,
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-3xl font-bold text-white bg-gradient-to-br from-primary to-secondary dark:bg-primary">
          <img
            src="/mango.png"
            alt="dummy image"
            width="600"
            height="600"
            className="object-cover object-right-center relative w-full rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: dictionary.services.tabs[2].title,
      value: dictionary.services.tabs[2].value,
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-primary to-secondary dark:bg-primary">
          <img
            src="/mango.png"
            alt="dummy image"
            width="600"
            height="600"
            className="object-cover object-right-center relative w-full rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: dictionary.services.tabs[3].title,
      value: dictionary.services.tabs[3].value,
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-primary to-secondary dark:bg-primary">
          <img
            src="/mango.png"
            alt="dummy image"
            width="600"
            height="600"
            className="object-cover object-center-center relative w-full rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: dictionary.services.tabs[4].title,
      value: dictionary.services.tabs[4].value,
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-primary to-secondary dark:bg-primary">
          <img
            src="/mango.png"
            alt="dummy image"
            width="600"
            height="600"
            className="object-cover object-center-center relative w-full rounded-xl mx-auto"
          />
        </div>
      ),
    }
  ];

  return (
    <div className="h-[35rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl w-full text-xl text-center">
      <Tabs tabs={tabs} />
    </div>
  );
}
