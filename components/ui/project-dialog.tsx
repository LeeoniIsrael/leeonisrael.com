"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  X,
  Maximize2,
} from "lucide-react";
import type { Project } from "@/lib/portfolio";
import history from "@/lib/project-history.json";
import { ProjectVisual, previewFormat } from "./project-visual";
import { projectScreens } from "@/lib/project-screens";

export function ProjectDialog({
  project,
  projects,
  initialScreen,
  onChange,
  onDismiss,
}: {
  project: Project | null;
  projects: Project[];
  initialScreen: number | null;
  onChange: (project: Project) => void;
  onDismiss: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const inspectButton = useRef<HTMLButtonElement>(null);
  const restoreInspectFocus = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [closing, setClosing] = useState(false);
  const [inspect, setInspect] = useState(false);
  const [screen, setScreen] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();
  const screens = project ? (projectScreens[project.id] ?? []) : [];
  const isOpen = Boolean(project);
  useEffect(() => {
    if (!isOpen) return;
    const element = dialog.current;
    element?.showModal();
    closeButton.current?.focus();
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = before;
    };
  }, [isOpen]);
  useEffect(() => {
    restoreInspectFocus.current = false;
    setClosing(false);
    setInspect(initialScreen !== null);
    setScreen(initialScreen ?? 0);
    if (dialog.current) dialog.current.scrollTop = 0;
  }, [project?.id, initialScreen]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function close() {
    if (closing) return;
    setClosing(true);
    timer.current = setTimeout(
      () => {
        dialog.current?.close();
        setClosing(false);
        onDismiss();
      },
      reduced ? 0 : 180,
    );
  }
  function back() {
    restoreInspectFocus.current = true;
    setInspect(false);
    closeButton.current?.focus();
  }
  function navigate(step: number) {
    if (!project || closing) return;
    if (inspect && screens.length > 1) {
      setScreen((index) => (index + step + screens.length) % screens.length);
      return;
    }
    if (inspect || projects.length < 2) return;
    setDirection(step);
    const index = projects.findIndex((p) => p.id === project.id);
    onChange(projects[(index + step + projects.length) % projects.length]);
  }
  const index = projects.findIndex((p) => p.id === project?.id);
  const reflection = history.find(
    (p) =>
      p.title === project?.title ||
      (project?.id === "apex" && p.title === "APEX Trading") ||
      (project?.id === "weather" && p.title === "Weather App"),
  );
  return (
    <dialog
      ref={dialog}
      className={`project-dialog ${inspect ? "is-inspecting" : ""} ${closing ? "is-closing" : ""}`}
      aria-labelledby="project-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        if (inspect) back();
        else close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      onKeyDown={(event) => {
        if (
          event.altKey ||
          event.ctrlKey ||
          event.metaKey ||
          (event.target instanceof HTMLElement &&
            event.target.closest("input, textarea, select, [contenteditable]"))
        )
          return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          navigate(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      {project && (
        <>
          <div className="dialog-controls">
            {inspect ? (
              <button className="text-link inspection-back" onClick={back}>
                <ArrowLeft size={16} /> Back to project
              </button>
            ) : (
              <div className="project-pagination" aria-label="Browse projects">
                <button
                  className="icon-button"
                  aria-label="Previous project"
                  onClick={() => navigate(-1)}
                  disabled={projects.length < 2}
                >
                  <ArrowLeft size={18} />
                </button>
                <span>
                  {index + 1} <span>/ {projects.length}</span>
                </span>
                <button
                  className="icon-button"
                  aria-label="Next project"
                  onClick={() => navigate(1)}
                  disabled={projects.length < 2}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
            <h2 id="project-dialog-title">{project.title}</h2>
            <button
              ref={closeButton}
              autoFocus
              className="dialog-close icon-button"
              aria-label="Close project details"
              onClick={close}
            >
              <X size={21} />
            </button>
          </div>
          <span className="sr-only" role="status">
            {project.title}
            {inspect
              ? `, screen view${screens.length ? `, ${screens[screen]?.name}` : ""}`
              : ", project details"}
          </span>
          <AnimatePresence mode="wait" initial={false}>
            {inspect ? (
              <motion.div
                key="inspection"
                className="project-inspection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.14 }}
              >
                {screens.length > 1 && (
                  <div
                    className="screen-switcher"
                    role="group"
                    aria-label={`${project.title} screens`}
                  >
                    {screens.map(({ name }, i) => (
                      <button
                        key={name}
                        aria-pressed={screen === i}
                        onClick={() => setScreen(i)}
                      >
                        {screen === i && (
                          <motion.span
                            layoutId="screen-active"
                            className="screen-active"
                          />
                        )}
                        <span>{name}</span>
                      </button>
                    ))}
                  </div>
                )}
                <div
                  className={`inspection-media inspection-${previewFormat(project)}`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={screen}
                      initial={{ opacity: 0, scale: reduced ? 1 : 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.16 }}
                    >
                      <ProjectVisual project={project} screenIndex={screen} />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <p className="inspection-caption">
                  {screens[screen]?.caption ??
                    (screens.length > 1
                      ? "App screens · Use ← → to explore"
                      : "Application screenshot")}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={project.id}
                className="dialog-inner"
                onAnimationComplete={() => {
                  if (restoreInspectFocus.current) {
                    inspectButton.current?.focus();
                    restoreInspectFocus.current = false;
                  }
                }}
                initial={{ opacity: 0, x: reduced ? 0 : direction * 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduced ? 0 : direction * -10 }}
                transition={{
                  duration: reduced ? 0 : 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {previewFormat(project) === "logo" ? (
                  <div className="dialog-visual dialog-logo">
                    <ProjectVisual project={project} />
                  </div>
                ) : (
                  <button
                    ref={inspectButton}
                    className={`dialog-visual dialog-${previewFormat(project)} dialog-preview-button`}
                    aria-label={`View ${project.title} screens`}
                    onClick={() => {
                      setInspect(true);
                      if (dialog.current) dialog.current.scrollTop = 0;
                    }}
                  >
                    <ProjectVisual project={project} />
                    <span className="inspect-invitation">
                      <Maximize2 size={15} /> View screens
                    </span>
                  </button>
                )}
                <div className="dialog-copy">
                  <p className="project-category">
                    {project.category} / {project.status}
                  </p>
                  <h2>{project.title}</h2>
                  <p className="dialog-description">{project.description}</p>
                  <h3>What I built</h3>
                  <ul>
                    {project.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  {reflection && (
                    <>
                      <h3>What I learned</h3>
                      <p>{reflection.learned}</p>
                    </>
                  )}
                  <h3>Product & engineering decisions</h3>
                  <p>{project.focus}</p>
                  <div className="project-tags">
                    {project.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="dialog-links">
                    {project.publication && (
                      <a
                        className="text-link"
                        href={project.publication}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Read paper (PDF) <ArrowUpRight size={16} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        className="button-primary"
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Github size={16} />
                        View code <ArrowUpRight size={16} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        className="text-link"
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {project.id === "weather"
                          ? "Watch demo"
                          : "Visit project"}
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>{" "}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </dialog>
  );
}
