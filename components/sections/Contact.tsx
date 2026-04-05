"use client";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Linkedin, Github, Mail, Check } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const EMAIL = "leeoniisrael@gmail.com";

export default function Contact() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success("Email copied to clipboard", { description: EMAIL, duration: 3000 });
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback: just open mailto
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const socials = [
    { icon: Github,   href: "https://github.com/leeoniisrael",          label: "GitHub"   },
    { icon: Linkedin, href: "https://linkedin.com/in/leeoniisrael",     label: "LinkedIn" },
    { icon: Mail,     href: `mailto:${EMAIL}`,                           label: "Email"    },
  ];

  return (
    <>
      <Toaster position="bottom-center" />
      <section
        id="contact"
        className="min-h-svh flex flex-col items-center justify-center py-28 text-center px-6"
        aria-label="Contact"
      >
        <div ref={ref} className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-8"
            style={{ color: "var(--text-tertiary)" }}
          >
            Get in touch
          </motion.p>

          <motion.h2
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display mb-12"
            style={{
              fontSize:      "clamp(2.5rem, 6vw, 6rem)",
              lineHeight:    1.05,
              letterSpacing: "-0.025em",
              color:         "var(--text-primary)",
            }}
          >
            Let&apos;s build something.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Primary CTA */}
            <button
              onClick={handleEmail}
              className="inline-flex items-center gap-3 h-14 px-10 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: "var(--accent)",
                color:      "var(--bg-base)",
                letterSpacing: "-0.01em",
                fontSize: "0.9375rem",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              aria-label="Copy email or open mail client"
            >
              {copied ? (
                <><Check size={16} strokeWidth={2} /> Copied!</>
              ) : (
                <>{EMAIL}</>
              )}
            </button>

            {/* Social links */}
            <div className="flex items-center gap-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
                  style={{ color: "var(--text-tertiary)", border: "1px solid var(--border-subtle)" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color       = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color       = "var(--text-tertiary)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
                  }}
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>

            <p
              style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)", letterSpacing: "0.04em" }}
            >
              © 2026 Leeon Israel
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
