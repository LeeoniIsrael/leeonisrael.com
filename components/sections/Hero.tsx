"use client";
import { useRef, useEffect, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("@/components/ui/ParticleField"), {
  ssr: false,
  loading: () => null,
});

/* ── 3D name that tilts with the mouse ──────────────────────── */
function Name3D({ name }: { name: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Disable tilt on touch devices — no mouse, and transforms cause overflow issues
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rx = ((e.clientY / window.innerHeight) - 0.5) * -14;
      const ry = ((e.clientX / window.innerWidth)  - 0.5) *  18;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };

    const onLeave = () => {
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <h1
      ref={ref}
      aria-label={name}
      style={{
        fontFamily:    "var(--font-dm-serif), Georgia, serif",
        fontStyle:     "italic",
        fontSize:      "clamp(3rem, 10vw, 9rem)",
        lineHeight:    0.95,
        letterSpacing: "-0.025em",
        color:         "var(--text-primary)",
        marginBottom:  "1.5rem",
        willChange:    "transform",
        transition:    "transform 0.12s ease-out",
        textShadow: `
          1px 1px 0px var(--accent),
          2px 2px 0px var(--accent),
          3px 3px 0px var(--accent),
          4px 4px 0px var(--accent),
          5px 5px 0px var(--accent),
          6px 6px 0px var(--accent),
          7px 7px 16px rgba(0,0,0,0.18)
        `,
        display: "block",
        width: "100%",
      }}
    >
      {name}
    </h1>
  );
}

export default function Hero() {
  const shouldReduce = useReducedMotion();

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
      {/* Subtle particle field — desktop only */}
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

        {/* 3D Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Name3D name={name} />
        </motion.div>

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
              background:    "var(--text-primary)",
              color:         "var(--bg-base)",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
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
              const el = e.currentTarget as HTMLElement;
              el.style.background  = "var(--accent-muted)";
              el.style.borderColor = "var(--accent)";
              el.style.color       = "var(--text-primary)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background  = "transparent";
              el.style.borderColor = "var(--border-medium)";
              el.style.color       = "var(--text-secondary)";
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
