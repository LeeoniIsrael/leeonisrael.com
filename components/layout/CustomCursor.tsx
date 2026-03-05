"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a, button, [role='button'], [data-cursor='hover']"));
    };
    const down = () => setClicking(true);
    const up   = () => setClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup",   up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup",   up);
    };
  }, [mouseX, mouseY]);

  const ringSize    = hovering ? 48 : clicking ? 18 : 24;
  const ringOpacity = hovering ? 0.8 : 0.4;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          x:               springX,
          y:               springY,
          width:           ringSize,
          height:          ringSize,
          opacity:         ringOpacity,
          border:          "1px solid var(--text-primary)",
          backgroundColor: hovering ? "var(--accent-muted)" : "transparent",
          transition:      "width 0.18s ease, height 0.18s ease, opacity 0.18s ease, background-color 0.18s ease",
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9998] w-1 h-1 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          x:               mouseX,
          y:               mouseY,
          backgroundColor: "var(--accent)",
        }}
      />
    </>
  );
}
