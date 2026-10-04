"use client";

import { useRef } from "react";
import { PhoneScreen } from "./phone-screen";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { Project } from "@/lib/portfolio";
import { projectScreens } from "@/lib/project-screens";

export function ProjectShowcase({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (screen?: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const stepped = project.id === "onhand";
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "center 0.4"],
  });
  const leftX = useTransform(
    scrollYProgress,
    [0, 0.85],
    stepped ? ["-12%", "-88%"] : ["-55%", "-94%"],
  );
  const rightX = useTransform(
    scrollYProgress,
    [0, 0.85],
    stepped ? ["12%", "88%"] : ["55%", "94%"],
  );
  const leftY = useTransform(
    scrollYProgress,
    [0, 0.85],
    stepped ? [60, -38] : [36, 0],
  );
  const rightY = useTransform(
    scrollYProgress,
    [0, 0.85],
    stepped ? [100, 38] : [36, 0],
  );
  const centerY = useTransform(scrollYProgress, [0, 0.85], [70, 0]);
  const centerScale = useTransform(scrollYProgress, [0, 0.85], [0.9, 1]);
  const screens = projectScreens[project.id];
  return (
    <div
      ref={ref}
      className={`mobile-showcase showcase-${project.id}`}
      data-showcase={project.id}
    >
      <div className="showcase-inner">
        <div className="scroll-heading showcase-copy">
          <span className="project-category">
            Mobile product / {project.status}
          </span>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <p className="feature-detail">
            {stepped
              ? "A guided repair experience, from describing the problem to choosing a specialist. Built around both sides of the job: the person who needs help and the person who provides it."
              : "Translation, conversation, and a phrasebook in one mobile experience. Exploring how hand gestures and speech can make everyday communication easier."}
          </p>
          <button className="text-link" onClick={() => onOpen()}>
            Inside the project <ArrowRight size={19} />
          </button>
        </div>
        <div className="showcase-stage">
          {screens.map((screen, i) => {
            // Home/Translate anchors the composition; the other two screens reveal its surrounding workflows.
            const left = i === 1;
            const center = i === 0;
            return (
              <motion.button
                key={screen.src}
                type="button"
                className={`showcase-phone iphone-frame ${center ? "showcase-phone-center" : "showcase-phone-side"}`}
                aria-label={`View ${project.title} ${screen.name.toLowerCase()} screen`}
                onClick={() => onOpen(i)}
                style={{
                  x: center
                    ? 0
                    : reduced
                      ? left
                        ? stepped
                          ? "-88%"
                          : "-94%"
                        : stepped
                          ? "88%"
                          : "94%"
                      : left
                        ? leftX
                        : rightX,
                  y: reduced
                    ? stepped && !center
                      ? left
                        ? -38
                        : 38
                      : 0
                    : center
                      ? centerY
                      : left
                        ? leftY
                        : rightY,
                  scale: center && !reduced ? centerScale : 1,
                }}
              >
                <PhoneScreen screen={screen} title={project.title} />
              </motion.button>
            );
          })}
          <span className="capture-caption">
            {project.title} · Select a screen to explore
          </span>
        </div>
      </div>
    </div>
  );
}
