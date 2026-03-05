"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const links = [
  { label: "Work",      href: "#experience" },
  { label: "Projects",  href: "#projects"   },
  { label: "Skills",    href: "#skills"     },
  { label: "Education", href: "#education"  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted]   = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 h-16 transition-all duration-400"
        style={{
          background:   scrolled ? "var(--bg-glass)"     : "transparent",
          backdropFilter: scrolled ? "var(--blur-md)"    : "none",
          WebkitBackdropFilter: scrolled ? "var(--blur-md)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="#"
          className="text-sm font-semibold tracking-tight transition-opacity hover:opacity-70"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
        >
          Leeon Israel
        </Link>

        {/* Center nav — desktop */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Site sections">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-normal transition-all duration-200"
              style={{
                color: "var(--text-secondary)",
                letterSpacing: "-0.01em",
                opacity: 0.7,
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right: theme + CTA */}
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {resolvedTheme === "dark"
                ? <Sun  size={15} strokeWidth={1.5} />
                : <Moon size={15} strokeWidth={1.5} />
              }
            </button>
          )}

          <a
            href="mailto:leeoniisrael@gmail.com"
            className="hidden md:flex items-center text-xs font-medium px-4 h-8 rounded-full transition-all duration-200"
            style={{
              color:  "var(--text-primary)",
              border: "1px solid var(--border-medium)",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background      = "var(--accent-muted)";
              (e.currentTarget as HTMLElement).style.borderColor     = "var(--accent)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background  = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-medium)";
            }}
          >
            Let&apos;s talk
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center"
            aria-label="Toggle menu"
            style={{ color: "var(--text-primary)" }}
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            style={{ background: "var(--bg-base)" }}
            onClick={() => setOpen(false)}
          >
            <nav className="flex flex-col items-center gap-8">
              {[...links, { label: "Resume", href: "/screenshots/resume.pdf" }].map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="font-display italic text-3xl"
                  style={{ color: "var(--text-primary)" }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
