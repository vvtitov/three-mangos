import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { Button } from "./button";
import { useLanguage } from "@/i18n/LanguageContext";
import { getDictionary } from "@/i18n/dictionaries";
import { BackgroundLines } from "./background-lines";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 50, bounce: 80 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-900, 0]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[110rem] lg:h-[93rem] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1600px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
          zIndex: -2
        }}
      >
        <motion.div style={{ display: "flex", flexDirection: "row-reverse", marginBottom: "1.25rem", transform: "rotate(3deg)", columnGap: "3.75rem" }}>
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div style={{ display: "flex", flexDirection: "row", marginBottom: "1.25rem", transform: "rotate(-2deg)", columnGap: "3.75rem" }}>
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div style={{ display: "flex", flexDirection: "row-reverse", transform: "rotate(3deg)", columnGap: "3.75rem" }}>
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const { locale } = useLanguage();
  const dictionary = getDictionary(locale);

  const handleClick = () => {
    const url = "https://wa.me/5491160463521";
    window.open(url, "_blank");
  };

  return (
    <section
      id="hero"
      className="flex flex-col md:flex-row max-w-6xl relative mx-auto w-full items-center select-none justify-between pt-[10rem] md:pt-[3rem] lg:pt-[6rem]"
    >
      <BackgroundLines className="absolute z-[-10] bg-primary/60 dark:bg-transparent min-w-screen h-full mt-20">
        <div />
      </BackgroundLines>
      <div className="flex flex-col gap-4 max-w-4xl px-10 w-full mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-6xl font-medium max-w-md md:max-w-3xl w-[25rem] lg:w-[40rem] text-balance min-w-[10rem] md:min-w-[34rem]">
          <strong className="text-balance bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary/80">
            {dictionary.hero.title}
          </strong>
        </h1>
        <p className="text-foreground text-xl md:text-xl lg:text-2xl dark:text-foreground text-balance max-w-sm md:max-w-xl pl-1">
          <span
            className="w-full text-balance"
            dangerouslySetInnerHTML={{
              __html: dictionary.hero.subtitle,
            }}
          />
        </p>
        <div className="flex justify-start pl-1 mt-4">
          <Button
            variant="default"
            size="lg"
            className="py-8 px-10 text-2xl capitalize rounded-full bg-gradient-to-bl from-primary/60 via-primary/80 to-primary text-foreground items-center justify-center hover:bg-gradient-to-br hover:from-primary/80 hover:via-primary/90 hover:to-primary/80 transition-all duration-300"
            onClick={handleClick}
          >
            {dictionary.hero.cta}
          </Button>
        </div>
      </div>
      <div className="shrink-0">
        <img
          src="/mango-hero3.png"
          alt="Floating Mango"
          width={400}
          height={400}
          className="rotate-[5deg] lg:rotate-[-20deg] duration-1000 scale-75 md:scale-100 md:pt-60 -translate-y-10 translate-x-10 md:-translate-y-10 md:-translate-x-20 pointer-events-none"
        />
      </div>
    </section>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
        height: "24rem",
        width: "30rem",
        position: "relative",
        flexShrink: 0
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <img
          src={product.thumbnail}
          height={500}
          width={500}
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full rotate-12">
        <p className="text-foreground text-xl md:text-xl lg:text-2xl dark:text-foreground text-balance max-w-sm md:max-w-xl pl-1"></p>
      </div>
    </motion.div>
  );
};
