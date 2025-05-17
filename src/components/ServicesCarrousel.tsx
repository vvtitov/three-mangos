import Carrousel from "@/components/ui/carrousel";

export default function ServicesCarrousel() {
  return (
    <>
      <div className="relative justify-center p-3">
        <Carrousel
          slides={[
            {
              title: "",
              src: "/mango-2000x1440.png",
              button: "",
            },
            {
              title: "",
              src: "/mango-2000x1440.png",
              button: "",
            },
            {
              title: "",
              src: "/mango-2000x1440.png",
              button: "",
            },
            {
              title: "",
              src: "/mango-2000x1440.png",
              button: "",
            },
            {
              title: "",
              src: "/mango-2000x1440.png",
              button: "",
            },
            {
              title: "",
              src: "/mango-2000x1440.png",
              button: "",
            },
          ]}
        />
      </div>
    </>
  );
}
