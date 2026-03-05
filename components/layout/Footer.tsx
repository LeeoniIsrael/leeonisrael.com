"use client";
const navLinks = ["Work", "Projects", "Skills", "Education"];

export default function Footer() {
  return (
    <footer
      className="py-6 px-10"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="section-wrap flex flex-wrap items-center justify-between gap-4">
        <span
          className="text-xs font-semibold"
          style={{ color: "var(--text-secondary)", letterSpacing: "-0.01em" }}
        >
          Leeon Israel
        </span>

        <nav className="hidden sm:flex items-center gap-6" aria-label="Footer navigation">
          {navLinks.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-xs transition-colors duration-150"
              style={{ color: "var(--text-tertiary)", letterSpacing: "0.04em" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-tertiary)")}
            >
              {l}
            </a>
          ))}
        </nav>

        <span
          className="text-xs"
          style={{ color: "var(--text-tertiary)" }}
        >
          © 2026
        </span>
      </div>
    </footer>
  );
}
