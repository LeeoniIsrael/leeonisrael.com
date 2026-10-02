"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("leeoniisrael@gmail.com");
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = "mailto:leeoniisrael@gmail.com";
    }
  }
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-content section-wrap">
        <div className="footer-invitation">
          <h2>Have something in mind?</h2>
          <a href="mailto:leeoniisrael@gmail.com" className="footer-cta">
            Let’s talk <ArrowUpRight size={25} />
          </a>
        </div>
        <div className="footer-columns">
          <div className="footer-identity">
            <a href="#home" className="footer-wordmark">
              Leeon Israel<span aria-hidden="true">↗</span>
            </a>
            <p>
              Software engineering, <br />
              with a product perspective.
            </p>
            <span className="footer-location">New York, NY</span>
          </div>
          <nav aria-label="Footer navigation">
            <h3>Explore</h3>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#about">About</a>
            <a href="/resume/leeon-israel.pdf" target="_blank" rel="noreferrer">
              Resume <ArrowUpRight size={13} />
            </a>
          </nav>
          <nav aria-label="Social links">
            <h3>Elsewhere</h3>
            <a
              href="https://github.com/LeeoniIsrael"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight size={13} />
            </a>
            <a
              href="https://linkedin.com/in/leeoniisrael"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ArrowUpRight size={13} />
            </a>
          </nav>
          <div className="footer-contact">
            <h3>Start a conversation</h3>
            <p>Product, engineering, or the interesting space between.</p>
            <div className="footer-email-row">
              <a href="mailto:leeoniisrael@gmail.com">leeoniisrael@gmail.com</a>
              <button
                onClick={copyEmail}
                aria-label={copied ? "Email copied" : "Copy email address"}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <span className="footer-copy-status" role="status">
              {copied ? "Copied to clipboard" : ""}
            </span>
          </div>
        </div>
        <div className="footer-baseline">
          <span>© {new Date().getFullYear()} Leeon Israel</span>
          <a href="#home">
            Back to top <ArrowUp size={16} />
          </a>
        </div>
      </div>
      <div className="footer-panorama" aria-hidden="true">
        <Image
          src="/images/footer-waterfront.webp"
          alt=""
          width={1536}
          height={512}
          sizes="100vw"
        />
        <span className="footer-art-caption">A view from New York.</span>
      </div>
    </footer>
  );
}
