"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll } from "framer-motion";
import React from "react";

export const ScrollProgress = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[100] h-1 origin-left bg-gradient-to-r from-blue-600 via-blue-500/80 to-blue-400/50 dark:from-blue-400 dark:via-blue-500/50 dark:to-blue-600/80"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "left",
        backdropFilter: "blur(8px)",
      }}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";
