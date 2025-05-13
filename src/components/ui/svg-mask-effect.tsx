"use client";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 700,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateMousePosition = (e: any) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("mousemove", updateMousePosition);
    return () => {
      if (container) {
        container.removeEventListener("mousemove", updateMousePosition);
      }
    };
  }, []);
  const maskSize = isHovered ? revealSize : size;

  return (
    <div
      ref={containerRef}
      className={cn("w-full relative", className)}
    >
      <div
        className="w-full h-full flex items-center justify-center text-6xl absolute px-20 [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] animate-in duration-100 fade-in-100"
        style={{
          maskPosition: `${(mousePosition.x ?? 0) - maskSize / 2}px ${
            (mousePosition.y ?? 0) - maskSize / 2
          }px`,
          maskSize: `${maskSize}px`,
          transition: 'mask-position 0ms, mask-size 0ms'
        }}
      >
        <div className="absolute inset-0 bg-background h-full w-full z-0" />
        <div
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          className="max-w-4xl mx-auto text-center text-secondary-foreground text-xl font-bold relative z-20 px-2 select-none text-balance"
        >
          {children}
        </div>
      </div>

      <div className="w-full h-full flex items-center justify-center mx-2">
        {revealText}
      </div>
    </div>
  );
};
