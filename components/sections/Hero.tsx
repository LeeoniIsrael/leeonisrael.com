"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Name3D } from "@/components/ui/name-3d";
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  return (
    <section ref={ref} id="home" className="hero section-wrap">
      <div className="hero-topline">
        <span>Software engineering & product thinking</span>
        <span>Based in New York</span>
      </div>
      <div className="hero-main">
        <motion.div
          className="hero-name"
          style={{ y: reduced ? 0 : nameY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65 }}
        >
          <Name3D />
        </motion.div>
        <p className="hero-personal">
          I build software, and I care just as much about deciding what’s worth
          building.
        </p>
      </div>
      <div className="hero-bottom">
        <a href="#projects" className="scroll-invitation">
          <span className="arrow-disc">
            <ArrowDown size={20} />
          </span>
          <span>Take a look around</span>
        </a>
        <p>
          Forward Deployed AI Engineer at <strong>UBS.</strong>
          <br />
          Bringing an engineering foundation into product management.
        </p>
        <a
          className="text-link"
          href="/resume/leeon-israel.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Resume <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
