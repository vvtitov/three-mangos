import ContactFormPreview from "./ui/contact-form";
import CustomShapeTop from "./ui/custom-shape-top";
import CustomShapeBottom from "./ui/custom-shape-bottom";
import { CardContainer } from "./ui/3d-card";

export default function Contact() {
  return (
    <section
      id="contact"
      className="contact relative flex flex-col my-10 mx-auto w-full h-full justify-center bg-fixed bg-repeat-x bg-center bg-secondary/80 py-5"
      style={{ backgroundImage: "url('/mango.png')" }}
    >
      <CustomShapeTop />

      <div className="relative z-[3] py-20 mx-6">
        <CardContainer>
          <ContactFormPreview />
        </CardContainer>
      </div>

      <CustomShapeBottom />
    </section>
  );
}
