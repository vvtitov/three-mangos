import Carrousel from "@/components/ui/carrousel";

export default function ServicesCarrousel() {
  return (
    <>
      <div className="relative justify-center p-3 h-[600px] w-[70vmin]">
        <Carrousel interval={5000} autoPlay={true} loop={true}
          items={[
            {
              title: "Diseño Web",
              image: "/mango-2000x1440.png",
            },
            {
              title: "Desarrollo Frontend",
              image: "/mango-2000x1440.png",
            },
            {
              title: "Desarrollo Backend",
              image: "/mango-2000x1440.png",
            },
            {
              title: "E-commerce",
              image: "/mango-2000x1440.png",
            },
            {
              title: "SEO",
              image: "/mango-2000x1440.png",
            },
            {
              title: "Branding",
              image: "/mango-2000x1440.png",
            },
          ]}
        />
      </div>
    </>
  );
}
