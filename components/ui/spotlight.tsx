"use client";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useReducedMotion,
  type SpringOptions,
} from "framer-motion";
import { cn } from "@/lib/utils";
export function Spotlight({
  className,
  size = 350,
  springOptions = { stiffness: 130, damping: 25 },
}: {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const x = useSpring(0, springOptions),
    y = useSpring(0, springOptions);
  const left = useTransform(x, (v) => v - size / 2),
    top = useTransform(y, (v) => v - size / 2);
  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent || reduced) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = parent.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    const enter = () => setHovered(true),
      leave = () => setHovered(false);
    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerenter", enter);
    parent.addEventListener("pointerleave", leave);
    return () => {
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerenter", enter);
      parent.removeEventListener("pointerleave", leave);
    };
  }, [x, y, reduced]);
  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={cn("spotlight", className)}
      style={{
        width: size,
        height: size,
        left,
        top,
        opacity: hovered && !reduced ? 1 : 0,
      }}
    />
  );
}
