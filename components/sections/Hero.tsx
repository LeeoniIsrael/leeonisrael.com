"use client";

import { Github, Linkedin } from "lucide-react";
import { MinimalistHero } from "@/components/ui/minimalist-hero";

export default function Hero() {
  return (
    <MinimalistHero
      logoText="Leeon Israel"
      navLinks={[
        { label: "Work", href: "#projects" },
        { label: "Experience", href: "#experience" },
        { label: "About", href: "#about" },
      ]}
      showHeader={false}
      mainText="I’m a software engineer at UBS, bringing an engineering foundation into product management. I build with users in mind, from deciding what matters to making it work."
      readMoreLink="#about"
      imageSrc="/images/leeon-hero-cutout.webp"
      imageAlt="Leeon Israel"
      overlayText={{ part1: "Leeon", part2: "Israel" }}
      socialLinks={[
        {
          icon: Github,
          href: "https://github.com/LeeoniIsrael",
          label: "GitHub",
        },
        {
          icon: Linkedin,
          href: "https://linkedin.com/in/leeoniisrael",
          label: "LinkedIn",
        },
      ]}
      locationText="New York, NY"
    />
  );
}
