"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const courses = [
  "Algorithmic Design I & II",
  "Data Structures & Algorithms",
  "Advanced Programming Techniques",
  "Software Engineering",
  "Web Applications",
  "Database System Design",
  "Computer Networks",
  "Computer Security",
  "Information Security Principles",
  "Discrete Mathematics for CS",
  "UNIX/Linux Fundamentals",
  "Statistical Methods I & II",
  "Mobile Application Development",
  "Capstone Computing Project",
];

export default function Education() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <section id="education" className="py-28 md:py-36" aria-label="Education">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="eyebrow mb-3">Education</p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl p-10 md:p-12"
          style={{
            background:   "var(--bg-raised)",
            border:       "1px solid var(--border-subtle)",
            boxShadow:    "var(--shadow-md)",
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
            <div>
              <h2
                style={{ fontSize: "1.375rem", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text-primary)", marginBottom: "6px" }}
              >
                University of South Carolina
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.55, fontWeight: 300 }}>
                B.S. Computer Information Systems &nbsp;·&nbsp; 3.65 GPA &nbsp;·&nbsp;
                Minor: Business Information Management &nbsp;·&nbsp; Expected May 2026
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-10">
            {[
              { label: "Dean's List ×7",       fill: true  },
              { label: "First-Generation Scholar", fill: false },
              { label: "USC AI Institute",         fill: false },
            ].map((b) => (
              <span
                key={b.label}
                style={{
                  fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.03em",
                  padding: "5px 12px", borderRadius: "5px",
                  background: b.fill ? "var(--accent)" : "transparent",
                  color:      b.fill ? "var(--bg-base)" : "var(--text-secondary)",
                  border:     b.fill ? "none" : "1px solid var(--border-medium)",
                }}
              >
                {b.label}
              </span>
            ))}
          </div>

          {/* Coursework */}
          <div>
            <p
              style={{ fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: "10px" }}
            >
              Relevant Coursework
            </p>
            <div className="flex flex-wrap gap-2">
              {courses.map((c) => (
                <span
                  key={c}
                  style={{
                    fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 400,
                    background: "var(--bg-base)",
                    border: "1px solid var(--border-subtle)",
                    padding: "4px 12px", borderRadius: "5px",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
