"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { courses } from "@/lib/career";
import { Reveal } from "@/components/ui/motion";
const capabilities = [
  [
    "Product & discovery",
    "User workflows, requirements, roadmap planning, prioritization, prototyping, demos, and Agile/Scrum. Connecting product decisions to technical tradeoffs, informed by work with clinical staff and business stakeholders.",
  ],
  [
    "AI & machine learning",
    "LLMs, RAG pipelines, CNNs, sentiment agents, XGBoost, and AI evaluation. Research in knowledge graphs, Q&A systems, and deception detection; production work in healthcare, finance, and agriculture.",
  ],
  [
    "Full-stack engineering",
    "React, React Native, Django, Node.js, Flask, Java, JavaScript, TypeScript, and SQL. Interfaces, services, and everything between.",
  ],
  [
    "Data & cloud",
    "AWS, Azure, MongoDB, DynamoDB, OpenSearch, Databricks, and Denodo. Building and maintaining the data behind the product.",
  ],
  [
    "Backend & APIs",
    "REST APIs, MCP servers, LangChain agents, Python microservices, and autonomous agent orchestration.",
  ],
  [
    "Developer tooling",
    "GitHub Actions, Kubernetes, Nginx, Selenium, CI/CD, and automation that gives the team time back.",
  ],
];
export default function About() {
  const [open, setOpen] = useState(false);
  return (
    <section id="about" className="about-section section-wrap">
      <Reveal className="about-grid">
        <div>
          <p className="section-label">A little more personal</p>
          <h2>
            An engineer’s perspective.
            <br />A product mindset.
          </h2>
        </div>
        <div className="about-copy">
          <p>
            I’m a software engineer and a University of South Carolina graduate.
            I started in a production codebase at Empowered Buildings, spent
            three years at the USC AI Institute, and helped build Qatalyst
            Health as a founding engineer.
          </p>
          <p>
            Today I’m at UBS in New York, and I’m working toward a move into
            product management. I want to bring the judgment I’ve developed as
            an engineer to understanding users, choosing priorities, and shaping
            what a team builds.
          </p>
          <p>
            At Qatalyst, conversations with nurses and care coordinators helped
            shape the features I built. That connection between a user’s
            workflow and a technical decision is the part of the work I want to
            do more of.
          </p>
          <p>
            Outside work, that curiosity turns into projects: a prayer
            companion, a playlist tool, a student-housing agent, and whatever I
            can’t stop thinking about next.
          </p>
          <a
            className="text-link"
            href="https://github.com/LeeoniIsrael"
            target="_blank"
            rel="noreferrer"
          >
            See what I’m working on <ArrowUpRight size={17} />
          </a>
        </div>
      </Reveal>
      <div className="skills-grid" id="skills">
        {capabilities.map(([title, body]) => (
          <div key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
      <div className="education-block" id="education">
        <div>
          <p className="section-label">University of South Carolina, 2026</p>
          <h3>B.S. Computer Science</h3>
          <p>Minor in Business Information Management</p>
          <span>4.0 major GPA · Dean’s List ×7 · First-Generation Scholar</span>
        </div>
        <button
          className="text-link"
          aria-expanded={open}
          aria-controls="coursework"
          onClick={() => setOpen(!open)}
        >
          Coursework{" "}
          <Plus
            size={18}
            style={{ transform: open ? "rotate(45deg)" : undefined }}
          />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="coursework"
            className="coursework"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div>
              {courses.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
