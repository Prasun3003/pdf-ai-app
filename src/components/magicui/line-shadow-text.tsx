"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface LineShadowTextProps {
  children: string;
  shadowColor?: string;
  className?: string;
}

export function LineShadowText({
  children,
  shadowColor = "black",
  className,
}: LineShadowTextProps) {
  if (typeof children !== "string") {
    throw new Error("LineShadowText only accepts string content");
  }

  return (
    <motion.span
      style={{ "--shadow-color": shadowColor } as React.CSSProperties}
      className={cn(
        "relative z-0 inline-flex",
        "after:absolute after:left-[0.04em] after:top-[0.04em] after:content-[attr(data-text)]",
        "after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]",
        "after:-z-10 after:bg-[length:0.06em_0.06em] after:bg-clip-text after:text-transparent",
        "after:animate-line-shadow",
        className
      )}
      data-text={children}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.span>
  );
}
