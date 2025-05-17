import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | unknown;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          "block [perspective:1000px] relative no-visible-scrollbar max-w-full w-full px-10",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative mx-2 px-4 py-3 rounded-xl", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to top left, var(--primary), rgba(var(--primary-rgb), 0.8))',
                  borderRadius: '0.5rem',
                  zIndex: 0
                }}
              />
            )}

            <span className="relative block text-foreground dark:text-foreground">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-16", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <div key={tab.value} className={cn("w-full h-full absolute top-0 left-0", className)}>
          <motion.div
            layoutId={tab.value}
            style={{
              position: 'absolute',
              top: hovering ? idx * -30 : 0,
              left: 0,
              right: 0,
              bottom: 0,
              scale: 1 - idx * 0.1,
              zIndex: -idx,
              opacity: idx < 3 ? 1 - idx * 0.1 : 0,
            }}
            animate={{
              y: isActive(tab) ? [0, 40, 0] : 0,
            }}
          >
            {tab.content as React.ReactNode}
          </motion.div>
        </div>
      ))}
    </div>
  );
};
