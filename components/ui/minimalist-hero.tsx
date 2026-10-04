"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PortraitDoodle } from "@/components/ui/portrait-doodle";

interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: { part1: string; part2: string };
  socialLinks: { icon: LucideIcon; href: string; label: string }[];
  locationText: string;
  className?: string;
  /** Use the site's existing navigation when embedded in the portfolio. */
  showHeader?: boolean;
}

export function MinimalistHero({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
  showHeader = true,
}: MinimalistHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const circleY = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const reveal = (delay: number) => ({
    initial: reduced ? (false as const) : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0 : 0.65,
      delay: reduced ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });
  return (
    <section
      ref={ref}
      id="home"
      className={cn("minimalist-hero", className)}
      aria-label={`${overlayText.part1} ${overlayText.part2}, introduction`}
    >
      <div className="minimalist-shell">
        {showHeader && (
          <header className="minimalist-header">
            <a href="#home" className="minimalist-logo">
              {logoText}
            </a>
            <nav className="minimalist-navigation" aria-label="Hero navigation">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
            <button
              className="minimalist-menu icon-button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="hero-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            {menuOpen && (
              <nav
                id="hero-menu"
                className="minimalist-mobile-menu"
                aria-label="Hero mobile navigation"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}
          </header>
        )}
        <div className="minimalist-composition">
          <motion.div className="minimalist-intro" {...reveal(0.35)}>
            <p>{mainText}</p>
            <a href={readMoreLink} className="minimalist-read-more">
              More about me <ArrowUpRight size={16} />
            </a>
          </motion.div>
          <div className="minimalist-art">
            <motion.div
              className="minimalist-circle-travel"
              style={{ y: reduced ? 0 : circleY }}
            >
              <PortraitDoodle hero>
                <motion.div
                  className="minimalist-circle"
                  initial={reduced ? false : { scale: 0.86, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: reduced ? 0 : 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.div
                    className="minimalist-portrait-travel"
                    style={{ y: reduced ? 0 : portraitY }}
                  >
                    <motion.div
                      className="minimalist-portrait"
                      {...reveal(0.12)}
                    >
                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={1254}
                        height={1254}
                        priority
                        sizes="(max-width:700px) 80vw, (max-width:1000px) 48vw, 490px"
                        draggable={false}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </PortraitDoodle>
            </motion.div>
          </div>
          <motion.div className="minimalist-name" {...reveal(0.2)}>
            <h1>
              <span>{overlayText.part1}</span> <span>{overlayText.part2}</span>
            </h1>
          </motion.div>
        </div>
        <motion.div className="minimalist-baseline" {...reveal(0.5)}>
          <div className="minimalist-socials">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={19} />
              </a>
            ))}
            <a
              className="minimalist-resume"
              href="/resume/leeon-israel.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Resume <ArrowUpRight size={14} />
            </a>
          </div>
          <a className="minimalist-explore" href="#projects">
            <ArrowDown size={16} /> Explore my work
          </a>
          <span className="minimalist-location">{locationText}</span>
        </motion.div>
      </div>
    </section>
  );
}
