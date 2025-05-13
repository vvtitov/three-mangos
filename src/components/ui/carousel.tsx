import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type CarouselProps = {
  items: {
    title: string;
    image: string;
  }[];
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
};

// Exportación con nombre para los componentes que la importan con { Carousel }
export const Carousel = ({
  items,
  loop = true,
  autoPlay = true,
  interval = 5000,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return loop ? items.length - 1 : 0;
      }
      return prevIndex - 1;
    });
  }, [isAnimating, items.length, loop]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prevIndex) => {
      if (prevIndex === items.length - 1) {
        return loop ? 0 : items.length - 1;
      }
      return prevIndex + 1;
    });
  }, [isAnimating, items.length, loop]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoPlay) {
      timer = setTimeout(goToNext, interval);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentIndex, autoPlay, interval, goToNext]);

  return (
    <div className="relative overflow-hidden w-full h-full">
      <div className="absolute inset-0 flex items-center justify-between z-20 px-4">
        <button
          onClick={goToPrevious}
          className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {items.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              index === currentIndex
                ? "bg-white"
                : "bg-white/50 hover:bg-white/80"
            )}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>

      <AnimatePresence
        initial={false}
        custom={direction}
        onExitComplete={() => setIsAnimating(false)}
      >
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0
          }}
        >
          <Slide item={items[currentIndex]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const Slide = ({ item }: { item: { title: string; image: string } }) => {
  return (
    <div className="relative w-full h-full">
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-10 left-10 text-white">
        <h3 className="text-2xl font-bold">{item.title}</h3>
      </div>
    </div>
  );
};

// Exportación predeterminada para compatibilidad con los componentes existentes
export default Carousel;
