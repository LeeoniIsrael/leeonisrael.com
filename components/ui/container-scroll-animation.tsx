"use client";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
export function ContainerScroll({
  titleComponent,
  children,
  onOpenScreen,
}: {
  titleComponent: ReactNode;
  children?: ReactNode;
  onOpenScreen?: (screen: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "center 0.4"],
  });
  const leftX = useTransform(scrollYProgress, [0, 0.85], ["20%", "-58%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.85], ["-20%", "58%"]);
  const leftR = useTransform(scrollYProgress, [0, 0.85], [-3, -12]);
  const rightR = useTransform(scrollYProgress, [0, 0.85], [3, 12]);
  const centerY = useTransform(scrollYProgress, [0, 0.8], [70, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.85], [0.82, 1]);
  return (
    <div ref={ref} className="container-scroll">
      <div className="scroll-feature">
        <div className="scroll-heading">{titleComponent}</div>
        <div className="scroll-stage">
          <motion.div
            className="scroll-card"
            style={{ scale: reduced ? 1 : scale }}
          >
            <motion.button
              type="button"
              aria-label="View Kavanah reading preferences screen"
              onClick={() => onOpenScreen?.(1)}
              className="app-screen app-screen-left"
              style={{
                x: reduced ? "-58%" : leftX,
                rotate: reduced ? -12 : leftR,
              }}
            >
              <Image
                src="/images/kavanah-preferences.webp"
                alt="Kavanah reading preferences, captured from the app"
                width={780}
                height={1688}
                sizes="(max-width:700px) 42vw, 22vw"
              />
            </motion.button>
            <motion.button
              type="button"
              aria-label="View Kavanah prayer tradition screen"
              onClick={() => onOpenScreen?.(2)}
              className="app-screen app-screen-right"
              style={{
                x: reduced ? "58%" : rightX,
                rotate: reduced ? 12 : rightR,
              }}
            >
              <Image
                src="/images/kavanah-tradition.webp"
                alt="Kavanah prayer tradition selection, captured from the app"
                width={780}
                height={1688}
                sizes="(max-width:700px) 42vw, 22vw"
              />
            </motion.button>
            <motion.button
              type="button"
              aria-label="View Kavanah welcome screen"
              onClick={() => onOpenScreen?.(0)}
              className="app-screen app-screen-center"
              style={{ y: reduced ? 0 : centerY }}
            >
              <Image
                src="/images/kavanah-welcome.webp"
                alt="Kavanah welcome screen, captured from the app"
                width={780}
                height={1688}
                sizes="(max-width:700px) 42vw, 22vw"
              />
            </motion.button>
          </motion.div>
          <span className="capture-caption">
            Kavanah · Select a screen to explore
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
