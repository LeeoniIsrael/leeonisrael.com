"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/** The pointer-driven extruded name used on the original production site. */
export function Name3D() {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!element || reduced || !pointer.matches) return;
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      element.style.removeProperty("transform");
      element.style.removeProperty("text-shadow");
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !pointer.matches) return;
      const hero = element.closest("section")?.getBoundingClientRect();
      if (!hero || hero.bottom <= 0 || event.clientY > hero.bottom)
        return reset();
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.transform = `perspective(800px) rotateX(${y * -28}deg) rotateY(${x * 36}deg)`;
        element.style.textShadow =
          Array.from(
            { length: 8 },
            (_, i) =>
              `${(-x * 6 * (i + 1)) / 8}px ${(-y * 4 * (i + 1)) / 8}px 0 var(--name-depth)`,
          ).join(", ") + ", 0 12px 24px rgba(0,0,0,.10)";
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    pointer.addEventListener("change", reset);
    return () => {
      reset();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      pointer.removeEventListener("change", reset);
    };
  }, [reduced]);
  return (
    <h1 ref={ref} className="name-3d">
      Leeon <span>Israel</span>
    </h1>
  );
}
