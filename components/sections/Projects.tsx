"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    title:   "APEX Trading",
    desc:    "A 30-day live experiment: a Claude-powered autonomous trading agent making disciplined, risk-managed decisions in real markets. Momentum strategy backtested across SPY, QQQ, AAPL, MSFT, NVDA (2020–2024). Sharpe ratio 1.447 · 271.8% total return.",
    learned: "How to wire real financial data pipelines, backtest strategies rigorously, and think about risk — not just returns. The model is only as good as the data it acts on.",
    image:   "/screenshots/apex-ui.png",
    tags:    ["Python", "Claude API", "LightGBM", "DuckDB", "Alpaca"],
    github:  "https://github.com/LeeoniIsrael/apex-trading",
    live:    null,
  },
  {
    title:   "Spotify Splitter",
    desc:    "AI-powered playlist optimizer. Splits any Spotify playlist into vibe-based sub-playlists via Groq LLM classification, or reorders for seamless DJ transitions using Camelot harmonic mixing. Handles 700+ track playlists.",
    learned: "Prompt engineering at scale isn't magic — it's schema design. Structuring the classification task correctly had more impact than model choice.",
    image:   "/screenshots/spotify-splitter.png",
    tags:    ["Python", "Flask", "React 19", "Groq API", "Spotify API"],
    github:  "https://github.com/LeeoniIsrael/spotify-splitter",
    live:    null,
  },
  {
    title:   "Signify",
    desc:    "Real-time ASL hand gesture recognition — Best Overall Project at SEO 2024. A CNN reads hand landmarks from MediaPipe, maps to letters, and streams to speech via Google TTS. Zero lag, fully offline inference.",
    learned: "ML models feel abstract until you see someone use them in real time. Building the full stack — data → model → inference → UI — gave me appreciation for every layer.",
    image:   "/screenshots/signify-img.png",
    tags:    ["Python", "TensorFlow", "MediaPipe", "OpenCV", "Flask"],
    github:  "https://github.com/LeeoniIsrael/sign-language-interpreter",
    live:    null,
  },
  {
    title:   "Instagram Clone",
    desc:    "Full-featured Instagram clone — 10,500+ lines replicating auth, image/video posting, real-time comments, follows, and an explore feed. React, Vite, Firebase. Live on Vercel.",
    learned: "Scale in code accumulates fast. Faithfully replicating a complex product's core UX taught me how to manage complexity across a large codebase.",
    image:   "/screenshots/instagramclone-img.png",
    tags:    ["React", "Firebase", "Vite", "Vercel"],
    github:  "https://github.com/LeeoniIsrael/instagram-clone",
    live:    "https://leeon-israel-ig-clone.vercel.app/auth",
  },
  {
    title:   "Weather App",
    desc:    "Immersive weather app with live sky backgrounds that shift with current conditions. Real-time data: UV index, wind, precipitation — rendered cinematically against live sky photography.",
    learned: "Constraints drive creativity. Working purely with vanilla JS and a single API forced clean DOM thinking with no shortcuts or framework crutches.",
    image:   "/screenshots/weather-img.png",
    tags:    ["JavaScript", "Weather API", "HTML/CSS"],
    github:  "https://github.com/LeeoniIsrael/weather-app",
    live:    null,
  },
  {
    title:   "Dorm Dish",
    desc:    "AI-powered recipe suggestions for college students — list your ingredients, get step-by-step recipes tuned to dorm-friendly equipment via OpenAI. Built in a team of four at SEO Tech Developers 2024.",
    learned: "Team dynamics matter as much as the code. Building under a deadline with four people taught me to scope, prioritize, and communicate clearly.",
    image:   "/screenshots/dormdish-img.png",
    tags:    ["Python", "Flask", "OpenAI API"],
    github:  "https://github.com/LeeoniIsrael/dorm-dish",
    live:    null,
  },
  {
    title:   "RentConnect",
    desc:    "A cross-platform mobile app that helps students and landlords discover, list, and match on housing and roommates. Built with Expo and React Native — features AI-powered roommate matching, interactive property maps, real-time messaging, and property reviews.",
    learned: "Mobile product development requires thinking about the whole experience — state, navigation, real-time data, and the moments between screens. Every detail compounds at the app level.",
    image:   "/screenshots/rent-connect.png",
    contain: true,
    tags:    ["React Native", "Expo", "AI Matching", "Real-time Messaging"],
    github:  "https://github.com/LeeoniIsrael/rent-connect-agent",
    live:    null,
  },
  {
    title:   "Calculator",
    desc:    "A clean, minimal calculator — arithmetic operations, keyboard support, dark UI with sharp operator accents. A focused exercise in pure DOM manipulation and UX clarity.",
    learned: "No framework teaches you how the DOM actually works. A reminder of why fundamentals matter — and why simple things are often harder to do well than complex ones.",
    image:   "/screenshots/calc-img.png",
    tags:    ["JavaScript", "HTML", "CSS"],
    github:  "https://github.com/LeeoniIsrael/calculator",
    live:    null,
  },
  {
    title:   "Coin:Flipper",
    desc:    "Full-stack budgeting app with multi-currency support. Tracks income, expenses, and savings goals with live exchange-rate conversion. Deployed to Heroku with a persistent SQLite backend.",
    learned: "Full-stack has a lot of surface area. Connecting a Flask API to a persistent backend with real currency conversion gave me a clear picture of how data flows end to end.",
    image:   "/screenshots/financetracker-img.png",
    tags:    ["Python", "Flask", "SQLite", "Currency API"],
    github:  "https://github.com/LeeoniIsrael/personal-finance-tracker",
    live:    null,
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduce = useReducedMotion();

  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX  = useSpring(mouseX,  { stiffness: 120, damping: 20 });
  const springY  = useSpring(mouseY,  { stiffness: 120, damping: 20 });
  const springRX = useSpring(rotateX, { stiffness: 100, damping: 18 });
  const springRY = useSpring(rotateY, { stiffness: 100, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const nx = (e.clientX - cx) / (rect.width  / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);
    mouseX.set(nx * 5);
    mouseY.set(ny * 5);
    rotateX.set(-ny * 10);
    rotateY.set( nx * 14);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  return (
    <div style={{ perspective: "900px" }}>
    <motion.div
      ref={ref}
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ x: springX, y: springY, rotateX: springRX, rotateY: springRY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="rounded-2xl group"
      data-cursor="hover"
    >
      {/* Image — clean, no overlays */}
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{
          aspectRatio: "16/9",
          background: project.contain ? "#0a0a0a" : undefined,
        }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="transition-transform duration-700 ease-out"
            style={{
              objectFit:      project.contain ? "contain" : "cover",
              objectPosition: project.contain ? "center" : "top",
              transform:      hovered ? "scale(1.04)" : "scale(1)",
              opacity:        hovered ? 1 : 0.88,
            }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 30% 50%, var(--accent-muted) 0%, var(--bg-raised) 70%)`,
            }}
          />
        )}
      </div>

      {/* Title + tech tags — always visible */}
      <div className="pt-4 pb-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            style={{
              fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.02em",
              color: "var(--text-primary)", lineHeight: 1.3,
            }}
          >
            {project.title}
          </h3>
          <div className="flex gap-2 flex-shrink-0 pt-0.5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub`}
                className="flex items-center gap-1.5 h-7 px-3 rounded-full text-xs font-medium transition-all duration-150"
                style={{
                  color: "var(--text-tertiary)",
                  border: "1px solid var(--border-medium)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color       = "var(--text-primary)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-medium)";
                  (e.currentTarget as HTMLElement).style.background  = "var(--bg-raised)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color       = "var(--text-tertiary)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-medium)";
                  (e.currentTarget as HTMLElement).style.background  = "transparent";
                }}
              >
                <Github size={12} strokeWidth={1.5} />
                <span>Code</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live`}
                className="flex items-center gap-1.5 h-7 px-3 rounded-full text-xs font-medium transition-all duration-150"
                style={{
                  color: "var(--bg-base)",
                  background: "var(--accent)",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                <ArrowUpRight size={12} strokeWidth={1.5} />
                <span>Live</span>
              </a>
            )}
          </div>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.07em",
                textTransform: "uppercase", color: "var(--text-tertiary)",
                border: "1px solid var(--border-subtle)",
                padding: "2px 7px", borderRadius: "4px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Expandable details on hover */}
      <motion.div
        initial={false}
        animate={hovered ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ overflow: "hidden" }}
      >
        <div
          className="rounded-xl p-4 mb-2"
          style={{
            background: "var(--bg-raised)",
            border:     "1px solid var(--border-subtle)",
          }}
        >
          <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.68, fontWeight: 300, marginBottom: "0.75rem" }}>
            {project.desc}
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", lineHeight: 1.6, fontWeight: 300, paddingLeft: "10px", borderLeft: "1.5px solid var(--border-medium)" }}>
            <span style={{ color: "var(--accent)", fontWeight: 500 }}>Learned: </span>
            {project.learned}
          </p>
        </div>
      </motion.div>
    </motion.div>
    </div>
  );
}

export default function Projects() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true });

  return (
    <section id="projects" className="py-28 md:py-36" aria-label="Projects">
      <div className="section-wrap">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-14 flex-wrap gap-4"
        >
          <div>
            <p className="eyebrow mb-3">Selected work</p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em", color: "var(--text-primary)", lineHeight: 1.1 }}
            >
              Things I&apos;ve built.
            </h2>
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
            {projects.length} projects
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
