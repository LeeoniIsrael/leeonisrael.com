"use client";
import { useEffect, useRef, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("@/components/ui/ParticleField"), {
  ssr: false,
  loading: () => null,
});

const chars = (str: string) => str.split("").map((c, i) => ({ c, i }));

export default function Hero() {
  const shouldReduce = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.03 } },
  };

  const charVariants = {
    hidden:  shouldReduce ? { opacity: 0 } : { opacity: 0, y: "100%", rotateX: -15 },
    visible: (i: number) => ({
      opacity: 1,
      y: "0%",
      rotateX: 0,
      transition: {
        delay:    i * 0.03,
        duration: 0.5,
        ease:     [0.25, 0.46, 0.45, 0.94] as [number,number,number,number],
      },
    }),
  };

  const fadeUp = {
    hidden:  shouldReduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  const name = "Leeon Israel";

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-svh overflow-hidden"
      aria-label="Introduction"
    >
      {/* Particle canvas — desktop only */}
      <div className="absolute inset-0 hidden md:block" aria-hidden="true">
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

        {/* Eyebrow */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="eyebrow mb-8"
          style={{ color: "var(--text-tertiary)" }}
        >
          Software Engineer
        </motion.p>

        {/* Display name — character split */}
        <motion.h1
          className="font-display italic overflow-hidden"
          style={{
            fontSize:      "clamp(4rem, 10vw, 9rem)",
            lineHeight:    0.95,
            letterSpacing: "-0.025em",
            color:         "var(--text-primary)",
            marginBottom:  "1.5rem",
          }}
          aria-label={name}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {chars(name).map(({ c, i }) => (
            <motion.span
              key={i}
              custom={i}
              variants={charVariants}
              style={{ display: "inline-block", whiteSpace: c === " " ? "pre" : undefined }}
            >
              {c}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="max-w-lg mx-auto mb-10"
          style={{
            fontSize:   "1.125rem",
            lineHeight: 1.65,
            color:      "var(--text-secondary)",
            fontWeight: 300,
          }}
        >
          I love building things that work —{" "}
          <span style={{ color: "var(--text-primary)", fontWeight: 400 }}>
            products that feel thoughtful
          </span>
          , systems that hold up, and code that actually matters to the people using it.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="flex items-center gap-5 flex-wrap justify-center"
        >
          <a
            href="#experience"
            className="inline-flex items-center h-11 px-7 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              background: "var(--text-primary)",
              color:      "var(--bg-base)",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            View work
          </a>

          <a
            href="/screenshots/resume.pdf"
            download
            className="inline-flex items-center h-11 px-7 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              border:        "1px solid var(--border-medium)",
              color:         "var(--text-secondary)",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background   = "var(--accent-muted)";
              (e.currentTarget as HTMLElement).style.borderColor  = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color        = "var(--text-primary)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background   = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor  = "var(--border-medium)";
              (e.currentTarget as HTMLElement).style.color        = "var(--text-secondary)";
            }}
          >
            Resume
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-8"
            style={{ background: `linear-gradient(to bottom, var(--accent), transparent)` }}
          />
        </motion.div>
      </div>
    </section>
  );
}
