"use client";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { PhoneScreen } from "./phone-screen";
import { projectScreens } from "@/lib/project-screens";
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
    <div ref={ref} className="container-scroll" data-showcase="kavanah">
      <div className="scroll-feature">
        <div className="scroll-heading">{titleComponent}</div>
        <div className="scroll-stage">
          <motion.div
            className="scroll-card"
            style={{ scale: reduced ? 1 : scale }}
          >
            <motion.button
              type="button"
              aria-label="View Kavanah siddur screen"
              onClick={() => onOpenScreen?.(1)}
              className="app-screen iphone-frame app-screen-left"
              style={{
                x: reduced ? "-58%" : leftX,
                rotate: reduced ? -12 : leftR,
              }}
            >
              <PhoneScreen screen={projectScreens.kavanah[1]} title="Kavanah" />
            </motion.button>
            <motion.button
              type="button"
              aria-label="View Kavanah prayer reader screen"
              onClick={() => onOpenScreen?.(2)}
              className="app-screen iphone-frame app-screen-right"
              style={{
                x: reduced ? "58%" : rightX,
                rotate: reduced ? 12 : rightR,
              }}
            >
              <PhoneScreen screen={projectScreens.kavanah[2]} title="Kavanah" />
            </motion.button>
            <motion.button
              type="button"
              aria-label="View Kavanah home screen"
              onClick={() => onOpenScreen?.(0)}
              className="app-screen iphone-frame app-screen-center"
              style={{ y: reduced ? 0 : centerY }}
            >
              <PhoneScreen screen={projectScreens.kavanah[0]} title="Kavanah" />
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
