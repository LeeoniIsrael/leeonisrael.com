"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { slideInLeft, fadeUp } from "@/lib/animations";

const stats = [
  { value: 3,  suffix: "+", label: "Years building" },
  { value: 9,  suffix: "",  label: "Projects shipped" },
  { value: 1,  suffix: "",  label: "Published paper" },
];

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });
  const counted = useCountUp(value, 1200, inView);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span
        className="font-display"
        style={{ fontSize: "3.5rem", lineHeight: 1, color: "var(--accent)", letterSpacing: "-0.03em" }}
      >
        {counted}{suffix}
      </span>
      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>
        {label}
      </span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-100px" });
  const shouldReduce = useReducedMotion();

  const leftVariants  = shouldReduce ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : slideInLeft;
  const rightVariants = shouldReduce ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : fadeUp;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-28 md:py-36"
      aria-label="About"
    >
      <div className="section-wrap">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-20 items-start">

          {/* Left — photo */}
          <motion.div
            className="md:col-span-2"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={leftVariants}
            transition={{ duration: 0.7 }}
          >
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ boxShadow: "var(--shadow-lg)", aspectRatio: "4/5" }}
            >
              <Image
                src="/screenshots/leeoniisrael.png"
                alt="Leeon Israel"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top"
                style={{ filter: "sepia(0.12) contrast(1.04)" }}
                priority
              />
            </div>
          </motion.div>

          {/* Right — bio + stats */}
          <motion.div
            className="md:col-span-3 flex flex-col justify-center"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={rightVariants}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="eyebrow mb-5">The person behind the work</p>

            <h2
              className="font-display mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, color: "var(--text-primary)", letterSpacing: "-0.02em" }}
            >
              Engineer, builder,<br />first-generation everything.
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.72, fontWeight: 300, maxWidth: "540px" }}>
              <p>
                I&apos;m a software engineer studying Computer Science at the University of South
                Carolina. Currently Founding Engineer at Qatalyst Health — building AI-powered
                products used by clinical staff every day.
              </p>
              <p>
                Previously at UBS, John Deere, and the USC AI Institute. I care about the full
                stack — from system design to the interactions users never have to think about.
                I&apos;m drawn to hard problems, real constraints, and software that holds up in
                production.
              </p>
            </div>

            {/* Divider */}
            <div
              className="my-10"
              style={{ height: "1px", background: "var(--border-medium)" }}
              role="separator"
            />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
