"use client";

import React from "react";
import Carousel from "./ui/carousel";

export default function ServicesCarousel() {
  return (
    <>
      <div className="flex overflow-hidden justify-center p-3">
        <Carousel
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
