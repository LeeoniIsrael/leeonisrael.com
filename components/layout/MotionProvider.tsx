"use client";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { MotionConfig, useReducedMotion } from "framer-motion";
export default function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -90 },
      prevent: (node) => node.closest("dialog") !== null,
    });
    // Let native keyboard scrolling take over immediately, even during wheel easing.
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        ![
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
          " ",
        ].includes(event.key)
      )
        return;
      if (
        event.target instanceof HTMLElement &&
        event.target.closest(
          "input, textarea, select, [contenteditable], dialog",
        )
      )
        return;
      lenis.stop();
      lenis.start();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      lenis.destroy();
    };
  }, [reduced]);
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
