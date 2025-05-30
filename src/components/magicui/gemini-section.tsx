"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GoogleGeminiEffect } from "../ui/google-gemini-effect";

export const GeminiSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengths = Array.from({ length: 5 }, (_, i) =>
    useTransform(scrollYProgress, [0, 0.8], [0.15, 1])
  );

  return (
    <div ref={ref} className="h-[400vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <GoogleGeminiEffect
          title="Intelligent Document Analysis"
          description="Our AI processes your PDFs with state-of-the-art natural language understanding"
          pathLengths={pathLengths}
          className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black"
        />
      </div>
    </div>
  );
};
