"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const experiences = [
  {
    company: "Qatalyst Health",
    role:    "Founding Engineer",
    dates:   "Nov 2024 – Present",
    where:   "Columbia, SC",
    body:    `Being one of the first engineers at a healthcare AI startup means doing a bit of everything — and that's exactly what I do. I spend time with MDS nurses, care coordinators, and clinical staff to understand how the product actually fits into their workflow. Those conversations directly shape what I build next, whether that's a new AI feature, a frontend interface that has to work under pressure, a backend service handling sensitive health data, or the DevOps infrastructure that keeps it all running.\n\nThe flagship product is a document intelligence platform that reads clinical records and surfaces the findings that matter most for Medicare and Medicaid form completion — turning hours of manual review into something fast and dependable. I've shipped features across the entire stack: built the core AI pipeline, designed interfaces used by clinical staff daily, structured the architecture of new features, and am on call for production issues when they come up. Being a founding engineer means the product's quality is personal — there's no one else to blame, and no problem too small or too large to own.`,
    note:    "What it actually means to make AI work for real users — not just building the model, but building everything around it so it's reliable, understandable, and genuinely useful in the hands of someone doing critical work.",
    tags:    ["Python", "Django", "React", "AWS", "DynamoDB", "Datadog"],
  },
  {
    company: "UBS",
    role:    "Software Engineering Intern",
    dates:   "Jun – Aug 2025",
    where:   "New York City, NY",
    body:    `Led development of a live market risk AI system that reads financial news in real time, runs it through sentiment agents, and feeds predictions into an XGBoost model — presented directly to the company CTO. Built Python and Java MCP servers that let GitHub Copilot agents autonomously navigate an internal data lake, and designed a resume screening platform that cut hiring research time significantly.`,
    note:    "How to deliver high-stakes AI systems under enterprise constraints — where auditability and reliability matter as much as accuracy.",
    tags:    ["Python", "TypeScript", "React", "LangChain", "XGBoost", "Azure SQL"],
  },
  {
    company: "USC AI Institute",
    role:    "AI Research Intern",
    dates:   "Jan 2023 – Jan 2026",
    where:   "Columbia, SC",
    body:    `Across three years and three research projects, I worked with different teams at the USC AI Institute on problems at the frontier of applied ML.\n\nThe most significant was KiMO: Knowledge-infused Multi-agent Orchestrator — accepted to AAMAS 2026 Demo Track. KiMO addresses a core limitation in multi-agent systems: agents can communicate, but don't understand task semantics or coordination constraints. KiMO solves this through structured knowledge infusion — planning ontologies encode domain-specific task decompositions, and agent registries formalize capability constraints for heterogeneous agents. The result is a two-stage pipeline (PlanGen → AgentGen) that produces interpretable, expert-modifiable workflows, demonstrated on a real-time manufacturing pipeline.\n\nPreviously, I built and benchmarked two RAG-based Q&A systems — one using LangChain, one using LlamaIndex — outperforming a prior custom model significantly. And earlier, I contributed the React frontend for a mental health AI chatbot and processed 10,000+ Reddit posts with Python Transformers and spaCy to build training data for a deception detection classifier.`,
    note:    "The rigor of academic AI research, and how the hardest part isn't building the model — it's building something that can be evaluated, reproduced, and explained.",
    tags:    ["LangChain", "LlamaIndex", "React", "Python Transformers", "spaCy", "Knowledge Graphs"],
  },
  {
    company: "John Deere",
    role:    "AI Engineering Intern",
    dates:   "May – Aug 2024",
    where:   "Chicago, IL",
    body:    `Shipped multiple AI features into a production system used at scale. The most impactful was a Retrieval Augmented Generation tool that transformed user support — turning generic search into context-aware, pre-populated support forms. Also built an automated system to continuously purge stale data from the OpenSearch vector store, fixing invisible infrastructure decay that was silently degrading every AI response.`,
    note:    "The operational reality of AI at scale — indexing, data freshness, and how invisible infrastructure problems manifest as product quality issues.",
    tags:    ["Python", "LangChain", "OpenSearch", "RAG"],
  },
  {
    company: "SEO",
    role:    "Software Engineering Intern",
    dates:   "May – Jul 2024",
    where:   "Remote",
    body:    `Completed SEO's competitive engineering program — full-stack development, data structures, and algorithms, delivered through SCRUM-based team projects with real deadlines. Built three full-stack applications over the course of the program. Also trained a CNN for real-time sign language recognition from scratch, winning Best Overall Project at SEO 2024.`,
    note:    "Team-based engineering under real deadlines and a deep appreciation for the fundamentals of how ML models actually learn.",
    tags:    ["Python", "React", "MySQL", "CNN"],
  },
  {
    company: "Empowered Buildings",
    role:    "Full Stack SWE Intern",
    dates:   "Jun – Sep 2023",
    where:   "New York City, NY",
    body:    `My first professional engineering role. Built a full-stack financial data platform for an energy management company — connecting 300,000+ MongoDB documents to a custom React interface, building a RESTful API across 12+ files, and using Selenium to automate third-party financial data scraping done previously by hand.`,
    note:    "How to navigate a real production codebase and ship features end-to-end without hand-holding. The foundation for everything that came after.",
    tags:    ["JavaScript", "React", "MongoDB", "Node.js", "Selenium"],
  },
  {
    company: "Bank of America",
    role:    "Global Technology Fellow",
    dates:   "January 2024",
    where:   "Remote",
    body:    `Selected for BofA's Early Insights technology program — structured exposure to enterprise-scale engineering practices and leadership at one of the world's largest financial institutions.`,
    tags:    [],
  },
  {
    company: "DE Shaw & Co.",
    role:    "Connect Fellow",
    dates:   "September 2023",
    where:   "Remote",
    body:    `Chosen for DE Shaw's Connect Fellowship — engaged directly with researchers and engineers at one of the most rigorous quantitative investment firms in the world.`,
    tags:    [],
  },
  {
    company: "HeadStart Fellowship",
    role:    "Technology Fellow",
    dates:   "Jan – Apr 2023",
    where:   "Remote",
    body:    `A semester-long virtual fellowship with weekly education sessions, bi-weekly vertical training, and direct access to industry professionals and corporate partners. Participated in the Spring 2023 cohort — building skills across the startup ecosystem through structured learning and community while in my freshman year.`,
    tags:    [],
  },
];

function ExpItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={shouldReduce ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : fadeUp}
      transition={{ delay: index * 0.04, duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-[176px_1fr] gap-6 md:gap-10 py-10"
      style={{ borderBottom: "1px solid var(--border-subtle)" }}
      aria-label={exp.company}
    >
      <div className="pt-0.5">
        <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px", letterSpacing: "-0.01em" }}>
          {exp.company}
        </div>
        <div style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--accent)", marginBottom: "4px" }}>
          {exp.role}
        </div>
        <div style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)", letterSpacing: "0.03em", lineHeight: 1.6 }}>
          {exp.dates}<br />{exp.where}
        </div>
      </div>

      <div>
        <p style={{ fontSize: "0.9375rem", lineHeight: 1.76, color: "var(--text-secondary)", fontWeight: 300, marginBottom: exp.note ? "0.875rem" : 0 }}>
          {exp.body}
        </p>

        {exp.note && (
          <p
            style={{
              fontSize: "0.8125rem", lineHeight: 1.65,
              color: "var(--text-tertiary)",
              paddingLeft: "13px",
              borderLeft: "1.5px solid var(--border-medium)",
              marginBottom: exp.tags.length ? "1rem" : 0,
            }}
          >
            <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>What I took from it: </span>
            {exp.note}
          </p>
        )}

        {exp.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {exp.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "0.625rem", fontWeight: 600,
                  letterSpacing: "0.07em", textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                  border: "1px solid var(--border-medium)",
                  padding: "3px 9px", borderRadius: "4px",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Experience() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true });

  return (
    <section id="experience" className="py-28 md:py-36" aria-label="Work experience">
      <div className="section-wrap">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="eyebrow mb-3">Experience</p>
        </motion.div>

        <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
          {experiences.map((exp, i) => (
            <ExpItem key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
