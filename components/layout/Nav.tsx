"use client";
import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react";
const links = [
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
];
export default function Nav() {
  const [open, setOpen] = useState(false),
    [mounted, setMounted] = useState(false),
    [active, setActive] = useState("home");
  const { resolvedTheme, setTheme } = useTheme();
  const reduced = useReducedMotion();
  const themeTransition = useRef<{ skipTransition: () => void } | null>(null);
  function toggleTheme() {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    if (reduced || !document.startViewTransition) return setTheme(next);
    themeTransition.current?.skipTransition();
    const transition = document.startViewTransition(() =>
      flushSync(() => setTheme(next)),
    );
    themeTransition.current = transition;
    transition.finished
      .catch(() => {})
      .finally(() => {
        if (themeTransition.current === transition)
          themeTransition.current = null;
      });
  }
  const toggle = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 35 });
  useEffect(() => {
    setMounted(true);
    const update = () => {
      const ids = ["home", "projects", "experience", "about", "contact"];
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < innerHeight * 0.35)
          current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    if (open) window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-inner">
        <a
          href="#home"
          className="wordmark"
          aria-label="Leeon Israel, back to top"
          onClick={() => setOpen(false)}
        >
          li<span>↗</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href.slice(1) ? "location" : undefined}
            >
              {l.label}
              {active === l.href.slice(1) && (
                <motion.span
                  className="nav-indicator"
                  layoutId="nav-indicator"
                />
              )}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button theme-toggle"
            aria-label={
              mounted && resolvedTheme === "dark"
                ? "Use light theme"
                : "Use dark theme"
            }
            onClick={toggleTheme}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mounted && resolvedTheme === "dark" ? "dark" : "light"}
                className="theme-icon"
                initial={{
                  opacity: 0,
                  rotate: reduced ? 0 : -35,
                  scale: reduced ? 1 : 0.85,
                }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  rotate: reduced ? 0 : 35,
                  scale: reduced ? 1 : 0.85,
                }}
                transition={{ duration: reduced ? 0 : 0.12 }}
              >
                {mounted && resolvedTheme === "dark" ? (
                  <Sun size={17} />
                ) : (
                  <Moon size={17} />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
          <a className="nav-contact text-link" href="#contact">
            Get in touch <ArrowUpRight size={15} />
          </a>
          <button
            ref={toggle}
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {[
              ...links,
              { label: "Resume", href: "/resume/leeon-israel.pdf" },
              { label: "Contact", href: "#contact" },
            ].map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
                <ArrowUpRight size={20} />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
      <motion.div className="reading-progress" style={{ scaleX: progress }} />
    </header>
  );
}
