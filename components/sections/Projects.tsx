"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projects, type Project } from "@/lib/portfolio";
import { ProjectDialog } from "@/components/ui/project-dialog";
import { ProjectPeek } from "@/components/ui/project-peek";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ProjectVisual, previewFormat } from "@/components/ui/project-visual";
import { Reveal } from "@/components/ui/motion";
import { ProjectShowcase } from "@/components/ui/project-showcase";
const filters = ["All", "AI & agents", "Products", "Experiments"] as const;
export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [initialScreen, setInitialScreen] = useState<number | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  function open(p: Project, screen: number | null = null) {
    returnFocus.current = document.activeElement as HTMLElement;
    setInitialScreen(screen);
    setSelected(p);
  }
  function dismiss() {
    setSelected(null);
    setInitialScreen(null);
    returnFocus.current?.focus({ preventScroll: true });
  }
  const visible = projects.filter(
    (p) => filter === "All" || p.category === filter,
  );
  return (
    <section id="projects" className="projects-section">
      <div className="section-wrap">
        <Reveal className="section-intro">
          <h2>Selected projects</h2>
          <p>
            From choosing the problem to building the solution. Products and
            experiments I’ve taken on myself.
          </p>
        </Reveal>
      </div>
      <ContainerScroll
        onOpenScreen={(screen) => open(projects[0], screen)}
        titleComponent={
          <>
            <span className="project-category">
              Mobile product / In development
            </span>
            <h3>Kavanah</h3>
            <p>
              A Jewish prayer companion I’m building for the moments between
              everything else.
            </p>
            <p className="feature-detail">
              Offline prayer, on-device prayer times, and a private daily
              practice. Designed and built from the first screen to the
              underlying services.
            </p>
            <button className="text-link" onClick={() => open(projects[0])}>
              Inside the project <ArrowRight size={19} />
            </button>
          </>
        }
      />
      {["onhand", "signify"].map((id) => {
        const project = projects.find((p) => p.id === id)!;
        return (
          <ProjectShowcase
            key={id}
            project={project}
            onOpen={(screen) => open(project, screen ?? null)}
          />
        );
      })}
      <div className="section-wrap">
        <div className="project-heading">
          <div>
            <h2>The project index.</h2>
            <p>
              Current builds, older experiments, and the lessons that stayed.
            </p>
          </div>
          <a
            href="https://github.com/LeeoniIsrael"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            GitHub <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="project-toolbar">
          <div className="filter-group" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {filter === f && (
                  <motion.span
                    className="filter-active"
                    layoutId="filter-active"
                  />
                )}
                <span>{f}</span>
              </button>
            ))}
          </div>
          <span aria-live="polite">{visible.length} projects</span>
        </div>
        <ProjectPeek enabled={!selected}>
          <motion.div layout className="project-index">
            {visible.map((p) => (
              <motion.article
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={p.id}
                className="project-card"
              >
                <button
                  className="project-cover"
                  data-project={p.id}
                  onClick={() => open(p)}
                  aria-label={`Read about ${p.title}`}
                >
                  <div className={`index-thumb index-${previewFormat(p)}`}>
                    <ProjectVisual project={p} />
                  </div>
                  <div className="index-title">
                    <h3>{p.title}</h3>
                    <p>{p.summary}</p>
                  </div>
                  <span className="index-status">{p.status}</span>
                  <span className="index-arrow">
                    <ArrowUpRight size={24} />
                  </span>
                </button>
              </motion.article>
            ))}
          </motion.div>
        </ProjectPeek>
      </div>
      <ProjectDialog
        project={selected}
        initialScreen={initialScreen}
        onChange={(project) => {
          setInitialScreen(null);
          setSelected(project);
        }}
        onDismiss={dismiss}
        projects={
          visible.some((p) => p.id === selected?.id) ? visible : projects
        }
      />
    </section>
  );
}
