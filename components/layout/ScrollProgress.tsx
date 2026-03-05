"use client";
import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgress() {
  const scaleX = useScrollProgress();

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "0%",
        background:      "var(--accent)",
      }}
      className="fixed top-0 left-0 right-0 h-px z-[100]"
    />
  );
}
