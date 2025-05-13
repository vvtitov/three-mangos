"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // thanks for the fix Julian - https://github.com/Julian-AT
  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <div
        style={{
          opacity: 1,
          transform: 'translateY(0px)',
          position: isAnimating ? 'absolute' : 'relative',
        }}
        className={cn(
          "z-10 inline-block relative text-center text-neutral-900 dark:text-neutral-100 px-2",
          className
        )}
        key={currentWord}
      >
        {/* edit suggested by Sajal: https://x.com/DewanganSajal */}
        {currentWord.split(" ").map((word, wordIndex) => (
          <span
            key={word + wordIndex}
            style={{
              opacity: 1,
              transform: 'translateY(0px)',
              filter: "blur(0px)",
              transition: `opacity 0.3s ${wordIndex * 0.3}s, transform 0.3s ${wordIndex * 0.3}s, filter 0.3s ${wordIndex * 0.3}s`
            }}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <span
                key={word + letterIndex}
                style={{
                  opacity: 1,
                  transform: 'translateY(0px)',
                  filter: "blur(0px)",
                  transition: `opacity 0.2s ${wordIndex * 0.3 + letterIndex * 0.05}s, transform 0.2s ${wordIndex * 0.3 + letterIndex * 0.05}s, filter 0.2s ${wordIndex * 0.3 + letterIndex * 0.05}s`
                }}
                className="inline-block"
              >
                {letter}
              </span>
            ))}
            <span className="inline-block items-center">&nbsp;</span>
          </span>
        ))}
      </div>
    </AnimatePresence>
  );
};
