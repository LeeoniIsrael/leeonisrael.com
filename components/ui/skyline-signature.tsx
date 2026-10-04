"use client";
import { useEffect, useId, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import wordmark from "@/lib/footer-wordmark.json";

export function SkylineSignature() {
  const id = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const travel = useMotionValue(0);
  const progress = useSpring(travel, {
    stiffness: 120,
    damping: 30,
    mass: 0.45,
  });
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 1"],
  });
  useEffect(() => {
    if (reduced) {
      travel.set(1);
      progress.jump(1);
      return;
    }
    travel.set(scrollYProgress.get());
    return scrollYProgress.on("change", (value) => travel.set(value));
  }, [progress, travel, reduced, scrollYProgress]);
  const ease = { ease: (t: number) => t * t * (3 - 2 * t) };
  const ink = useTransform(progress, [0, 0.75], [0.45, 1], ease);
  const nameOpacity = useTransform(progress, [0, 0.65], [0.3, 1], ease);
  const nameY = useTransform(progress, [0, 0.65], [10, 0], ease);
  return (
    <div
      ref={ref}
      className="footer-panorama skyline-signature"
      aria-hidden="true"
    >
      <motion.svg
        className="footer-signature-name"
        viewBox={wordmark.viewBox}
        focusable="false"
        style={{ opacity: nameOpacity, y: nameY }}
      >
        <title>Leeon Israel</title>
        <defs>
          <pattern
            id={`${id}-letter-engraving`}
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(24)"
          >
            <path
              d="M0 0V16M7 0V16"
              stroke="currentColor"
              strokeWidth="2.5"
              opacity=".65"
            />
          </pattern>
        </defs>
        <path d={wordmark.path} fill="currentColor" opacity=".16" />
        <path
          d={wordmark.path}
          fill={`url(#${id}-letter-engraving)`}
          stroke="currentColor"
          strokeWidth="5"
        />
      </motion.svg>
      <motion.svg
        className="signature-city"
        viewBox="0 0 2172 660"
        preserveAspectRatio="xMinYMin slice"
        focusable="false"
        style={{ opacity: ink }}
      >
        <image
          className="signature-sketch"
          href="/images/footer-manhattan-reference.webp"
          x="0"
          y="0"
          width="2172"
          height="724"
        />
      </motion.svg>
    </div>
  );
}
