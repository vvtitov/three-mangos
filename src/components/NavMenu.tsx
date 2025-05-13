import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { Button } from "./ui/button";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { useLanguage } from "@/i18n/LanguageContext";
import { getDictionary } from "@/i18n/dictionaries";

export default function NavMenu() {
  const { locale } = useLanguage();
  const dictionary = getDictionary(locale);

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div id="navmenu" className="w-full bg-primary">
        <NavigationMenu>
          <NavigationMenuList className="flex justify-end">
            <NavigationMenuItem>
              <Button
                variant="transparent"
                size="lg"
                onClick={() => scrollToSection("#about")}
              >
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} text-foreground dark:text-foreground`}
                >
                  {dictionary.header.about}
                </NavigationMenuLink>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                variant="transparent"
                size="lg"
                onClick={() => scrollToSection("#services")}
              >
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} text-foreground dark:text-foreground`}
                >
                  {dictionary.header.services}
                </NavigationMenuLink>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                variant="transparent"
                size="lg"
                onClick={() => scrollToSection("#contact")}
              >
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} text-foreground dark:text-foreground`}
                >
                  {dictionary.header.contact}
                </NavigationMenuLink>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
