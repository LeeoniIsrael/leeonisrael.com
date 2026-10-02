"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
import { career } from "@/lib/career";
import { Reveal } from "@/components/ui/motion";
export default function Experience() {
  const [expanded, setExpanded] = useState<number[]>([0]);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const allOpen = expanded.length === career.length;
  return (
    <section
      ref={ref}
      id="experience"
      className="experience-section section-wrap"
    >
      <div className="experience-heading">
        <Reveal>
          <p className="section-label">The work, and what I took from it</p>
          <h2>Along the way.</h2>
          <p>
            Startups, research labs, and a few much bigger teams.
            <br />
            Learning how to build, what to prioritize, and who it’s for.
          </p>
          <button
            className="text-link expand-all"
            onClick={() => setExpanded(allOpen ? [] : career.map((_, i) => i))}
          >
            {allOpen ? "Collapse all stories" : "Read all stories"}
            <Plus size={16} />
          </button>
          <a
            className="text-link"
            href="/resume/leeon-israel.pdf"
            target="_blank"
            rel="noreferrer"
          >
            One-page resume <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </div>
      <div className="experience-list">
        <motion.div className="career-progress" style={{ scaleY: progress }} />
        {career.map((e, i) => {
          const open = expanded.includes(i);
          return (
            <article
              className={`experience-item ${open ? "is-open" : ""}`}
              key={e.company + e.role}
            >
              <button
                className="experience-trigger"
                aria-expanded={open}
                aria-controls={`experience-${i}`}
                onClick={() =>
                  setExpanded((prev) =>
                    open ? prev.filter((n) => n !== i) : [...prev, i],
                  )
                }
              >
                <span className="career-dot" />
                <span className="experience-meta">
                  <span>{e.dates}</span>
                  <span>{e.location}</span>
                </span>
                <span className="experience-title">
                  <strong>{e.company}</strong>
                  <span>{e.role}</span>
                </span>
                <Plus size={20} className="experience-plus" />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`experience-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="experience-reveal"
                  >
                    <div className="experience-body">
                      {e.story ? (
                        e.story.split("\n\n").map((p, j) => <p key={j}>{p}</p>)
                      ) : (
                        <p>{e.summary}</p>
                      )}
                      {e.bullets.length > 0 && (
                        <>
                          <h4>Selected contributions</h4>
                          <ul>
                            {e.bullets.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {e.note && (
                        <blockquote>
                          <span>What I took from it</span>
                          {e.note}
                        </blockquote>
                      )}
                      {e.tags.length > 0 && (
                        <div className="project-tags">
                          {e.tags.map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
}
