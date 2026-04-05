"use client";
import { useRef, useState } from "react";

const PHRASE = "thoughtful craft  ◆  intentional detail  ◆  built to last  ◆  intelligent systems  ◆  ";
const REPEAT  = 4;

export default function Marquee() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative overflow-hidden py-5"
      style={{
        borderTop:    "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, var(--bg-base), transparent)` }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, var(--bg-base), transparent)` }}
      />

      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{
          animation:       `marquee 60s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {Array.from({ length: REPEAT }).map((_, i) => (
          <span
            key={i}
            className="font-display pr-0"
            style={{ fontSize: "1.75rem", color: "var(--text-secondary)", letterSpacing: "-0.01em" }}
          >
            {PHRASE}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
