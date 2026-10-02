"use client";
import {
  useEffect,
  useState,
  useRef,
  type ReactNode,
  type PointerEvent,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { projects, type Project } from "@/lib/portfolio";
import { ProjectVisual, previewFormat } from "./project-visual";

/** One shared preview for the index, rather than an animation on every row. */
export function ProjectPeek({
  children,
  enabled,
}: {
  children: ReactNode;
  enabled: boolean;
}) {
  const [project, setProject] = useState<Project | null>(null);
  const activeRow = useRef<string | null>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const reduced = useReducedMotion();
  const targetY = useMotionValue(100);
  const y = useSpring(targetY, { stiffness: 420, damping: 42, mass: 0.6 });
  function hide() {
    activeRow.current = null;
    setProject(null);
  }
  useEffect(() => {
    const onScroll = () => {
      const element = pointer.current
        ? document.elementFromPoint(pointer.current.x, pointer.current.y)
        : document.activeElement;
      const row = element?.closest<HTMLElement>("[data-project]");
      if (row?.dataset.project !== activeRow.current) hide();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", hide);
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);
  function preview(element: HTMLElement, clientY: number) {
    if (
      !enabled ||
      !matchMedia("(min-width: 1100px) and (hover: hover) and (pointer: fine)")
        .matches
    )
      return;
    const trigger = element.closest<HTMLElement>("[data-project]");
    const next = projects.find((p) => p.id === trigger?.dataset.project);
    if (!next) return hide();
    const height = previewFormat(next) === "mobile" ? 345 : 245;
    const position = Math.max(
      100,
      Math.min(clientY - height / 2, innerHeight - height - 25),
    );
    if (!project) y.jump(position);
    targetY.set(position);
    activeRow.current = next.id;
    setProject(next);
  }
  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") {
      pointer.current = { x: event.clientX, y: event.clientY };
      preview(event.target as HTMLElement, event.clientY);
    }
  }
  return (
    <div
      onPointerMove={move}
      onPointerLeave={hide}
      onBlurCapture={hide}
      onFocusCapture={(event) => {
        if (event.target.matches(":focus-visible")) {
          pointer.current = null;
          preview(event.target, event.target.getBoundingClientRect().top + 45);
        }
      }}
    >
      {children}
      <AnimatePresence>
        {enabled && project && (
          <motion.aside
            className={`project-peek peek-${previewFormat(project)}`}
            aria-hidden="true"
            style={{ y: reduced ? targetY : y }}
            initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduced ? 1 : 0.97 }}
            transition={{
              duration: reduced ? 0 : 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.1 }}
              >
                <div className="peek-media">
                  <ProjectVisual project={project} />
                </div>
                <div className="peek-caption">
                  <span>{project.title}</span>
                  <span>View project ↗</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
