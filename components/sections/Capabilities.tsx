"use client";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Brain, Server, Code2, Database, Globe, Layers, type LucideIcon
} from "lucide-react";

const cells = [
  {
    icon:  Brain,
    title: "AI & Machine Learning",
    desc:  "LLMs, RAG pipelines, CNNs, sentiment agents, XGBoost. Built production ML systems in healthcare, finance, and agriculture.",
    wide:  true,
  },
  {
    icon:  Code2,
    title: "Full Stack Engineering",
    desc:  "React, Django, Node.js, Flask. End-to-end product development across 9 shipped applications.",
    wide:  false,
  },
  {
    icon:  Database,
    title: "Data & Cloud",
    desc:  "AWS, Azure, MongoDB, DynamoDB, OpenSearch, Databricks. Building and maintaining data infrastructure at scale.",
    wide:  false,
  },
  {
    icon:  Server,
    title: "Backend & APIs",
    desc:  "RESTful APIs, MCP servers, LangChain agents, Python microservices. From solo systems to enterprise integrations.",
    wide:  false,
  },
  {
    icon:  Globe,
    title: "Developer Tooling",
    desc:  "GitHub Actions, Kubernetes, Nginx, Selenium. Automation, CI/CD, and the infrastructure that makes teams faster.",
    wide:  false,
  },
  {
    icon:  Layers,
    title: "Research & Prototyping",
    desc:  "USC AI Institute — knowledge graphs, Q&A systems, deception detection. Rigorous experimentation, honest evaluation.",
    wide:  true,
  },
];

interface BentoCellProps {
  icon:         LucideIcon;
  title:        string;
  desc:         string;
  wide:         boolean;
  i:            number;
  hoveredIdx:   number | null;
  setHoveredIdx: (idx: number | null) => void;
}

function BentoCell({ icon: Icon, title, desc, wide, i, hoveredIdx, setHoveredIdx }: BentoCellProps) {
  const ref          = useRef<HTMLDivElement>(null);
  const inView       = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduce = useReducedMotion();
  const isHovered    = hoveredIdx === i;
  const otherHovered = hoveredIdx !== null && hoveredIdx !== i;

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: otherHovered ? 0.55 : 1, y: 0 } : { opacity: 0 }}
      transition={{
        delay:    i * 0.07,
        duration: 0.5,
        opacity:  { duration: otherHovered ? 0.15 : 0.5 },
      }}
      className={`rounded-2xl p-7 transition-all duration-300 ${wide ? "sm:col-span-2 lg:col-span-1" : ""}`}
      style={{
        background: "var(--bg-raised)",
        border:     "1px solid var(--border-subtle)",
        boxShadow:  isHovered ? "var(--shadow-glow)" : "var(--shadow-sm)",
        cursor:     "default",
      }}
      onMouseEnter={() => setHoveredIdx(i)}
      onMouseLeave={() => setHoveredIdx(null)}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
        style={{ background: "var(--accent-muted)" }}
      >
        <Icon size={18} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
      </div>

      <h3
        style={{
          fontSize:      "1.125rem",
          fontWeight:    500,
          letterSpacing: "-0.015em",
          color:         "var(--text-primary)",
          marginBottom:  "8px",
          lineHeight:    1.3,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize:   "0.8125rem",
          lineHeight: 1.68,
          color:      "var(--text-secondary)",
          fontWeight: 300,
        }}
      >
        {desc}
      </p>
    </motion.div>
  );
}

export default function Capabilities() {
  const headRef  = useRef<HTMLDivElement>(null);
  const inView   = useInView(headRef, { once: true });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="skills" className="py-28 md:py-36" aria-label="Skills and capabilities">
      <div className="section-wrap">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="eyebrow mb-3">Capabilities</p>
          <h2
            className="font-display italic"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em", color: "var(--text-primary)", lineHeight: 1.1 }}
          >
            What I bring to the table.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {cells.map((cell, i) => (
            <BentoCell
              key={cell.title}
              {...cell}
              i={i}
              hoveredIdx={hoveredIdx}
              setHoveredIdx={setHoveredIdx}
            />
          ))}
        </div>

        {/* Detailed skill rows */}
        <div className="mt-16" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          {[
            { cat: "Languages",    items: ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL"] },
            { cat: "Frameworks",   items: ["React", "Django", "Node.js", "Express.js", "LangChain", "LlamaIndex", "Flask"] },
            { cat: "Cloud & Infra",items: ["AWS", "Microsoft Azure", "Firebase", "Kubernetes", "Nginx", "Git"] },
            { cat: "Data & AI",    items: ["MongoDB", "OpenSearch", "DynamoDB", "Databricks", "RAG", "NLP", "Grafana"] },
            { cat: "Tools",        items: ["Postman", "Selenium", "GitHub Actions", "Vercel", "Datadog", "Jira"] },
          ].map(({ cat, items }) => (
            <div
              key={cat}
              className="flex items-baseline gap-0 py-4"
              style={{ borderBottom: "1px solid var(--border-subtle)" }}
            >
              <span
                style={{
                  width: "160px", flexShrink: 0,
                  fontSize: "0.6875rem", fontWeight: 600,
                  letterSpacing: "0.11em", textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                }}
              >
                {cat}
              </span>
              <span
                style={{ fontSize: "0.875rem", fontWeight: 300, color: "var(--text-secondary)", lineHeight: 1.85 }}
              >
                {items.map((item, j) => (
                  <span key={item}>
                    <span
                      style={{ transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                    >
                      {item}
                    </span>
                    {j < items.length - 1 && (
                      <span style={{ color: "var(--text-tertiary)", margin: "0 6px" }}>·</span>
                    )}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
