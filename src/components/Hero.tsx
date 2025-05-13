import { HeroParallax } from "./ui/hero-parallax";

export default function Hero() {
  return (
    <>
      <section
        id="hero"
        className="select-none w-full bg-background animate-in fade-in-0 duration-300"
      >
        <HeroParallax
          products={[
            {
              title: "1",
              link: "#",
              thumbnail: "/mango-2000x1440.png",
            },
            {
              title: "2",
              link: "#",
              thumbnail: "/mango-2000x1440.png",
            },
            {
              title: "3",
              link: "#",
              thumbnail: "/mango-2000x1440.png",
            },

            {
              title: "4",
              link: "#",
              thumbnail: "/mango-2000x1440.png",
            },
            {
              title: "5",
              link: "#",
              thumbnail: "/mango-2000x1440.png",
            },
            {
              title: "6",
              link: "#",
              thumbnail: "/mango-2000x1440.png",
            },

            {
              title: "7",
              link: "#",
              thumbnail: "/mango-2000x1440.png",
            },
            {
              title: "8",
              link: "#",
              thumbnail: "/mango-2000x1440.png",
            },
            {
              title: "9",
              link: "#",
              thumbnail: "/mango-2000x1440.png",
            },
            {
              title: "10",
              link: "#",
              thumbnail: "/mango-2000x1440.png",
            },
            {
              title: "11",
              link: "#",
              thumbnail: "/mango-2000x1440.png",
            },
            {
              title: "12",
              link: "#",
              thumbnail: "/mango-2000x1440.png",
            },
            {
              title: "13",
              link: "#",
              thumbnail: "/mango-2000x1440.png",
            },
            {
              title: "14",
              link: "#",
              thumbnail: "/mango-2000x1440.png",
            },
            {
              title: "15",
              link: "#",
              thumbnail: "/mango-2000x1440.png",
            },
          ]}
        />
      </section>
    </>
  );
}
