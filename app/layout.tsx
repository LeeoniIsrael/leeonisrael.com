import type { Metadata } from "next";
import { Inter, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import Nav            from "@/components/layout/Nav";
import Footer         from "@/components/layout/Footer";
import LenisProvider  from "@/components/layout/LenisProvider";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CustomCursor   from "@/components/layout/CustomCursor";

const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",
  weight:   ["300", "400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  subsets:  ["latin"],
  variable: "--font-dm-serif",
  display:  "swap",
  style:    ["normal", "italic"],
  weight:   "400",
});

const jetbrains = JetBrains_Mono({
  subsets:  ["latin"],
  variable: "--font-jetbrains",
  display:  "swap",
  weight:   ["400", "500"],
});

export const metadata: Metadata = {
  title:       "Leeon Israel — Software Engineer",
  description: "Software Engineer and AI Researcher. Founding Engineer at Qatalyst Health. Previously UBS, John Deere.",
  openGraph: {
    title:       "Leeon Israel — Software Engineer",
    description: "Building intelligent systems at the intersection of AI and software engineering.",
    images:      [{ url: "/screenshots/leeoniisrael.png" }],
    type:        "website",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Leeon Israel — Software Engineer",
    description: "Building intelligent systems at the intersection of AI and software engineering.",
    images:      ["/screenshots/leeoniisrael.png"],
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context":   "https://schema.org",
      "@type":      "Person",
      name:         "Leeon Israel",
      jobTitle:     "Software Engineer",
      url:          "https://leeonisrael.com",
      sameAs: [
        "https://github.com/leeoniisrael",
        "https://linkedin.com/in/leeoniisrael",
      ],
    }),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${dmSerif.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LenisProvider>
            <ScrollProgress />
            <CustomCursor />
            <Nav />
            <main id="main-content">{children}</main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
