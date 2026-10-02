"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { Reveal } from "@/components/ui/motion";
export default function Contact() {
  const [copied, setCopied] = useState(false),
    [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText("leeoniisrael@gmail.com");
      setCopied(true);
      setMessage("Email copied.");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setCopied(false);
        setMessage("");
      }, 3000);
    } catch {
      setMessage("Email: leeoniisrael@gmail.com");
    }
  }
  return (
    <section id="contact" className="contact-section">
      <div className="section-wrap">
        <Reveal>
          <p className="section-label">
            Let’s talk product, engineering, or opportunities at their
            intersection.
          </p>
          <a className="contact-title" href="mailto:leeoniisrael@gmail.com">
            Say hello.
            <span className="contact-arrow">
              <ArrowUpRight strokeWidth={1} />
            </span>
          </a>
        </Reveal>
        <div className="contact-bottom">
          <div className="contact-actions">
            <a className="contact-email" href="mailto:leeoniisrael@gmail.com">
              leeoniisrael@gmail.com
            </a>
            <button
              className="icon-button"
              onClick={copy}
              aria-label="Copy email address"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "copied" : "copy"}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <span className="copy-status" role="status">
              {message}
            </span>
          </div>
          <div className="contact-links">
            <a
              href="https://github.com/LeeoniIsrael"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight size={16} />
            </a>
            <a
              href="https://linkedin.com/in/leeoniisrael"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ArrowUpRight size={16} />
            </a>
            <a href="/resume/leeon-israel.pdf" target="_blank" rel="noreferrer">
              Resume <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
