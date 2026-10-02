import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import "@fontsource-variable/inter";
import MotionProvider from "@/components/layout/MotionProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://leeonisrael.com"),
  title: "Leeon Israel — Software Engineering & Product",
  description:
    "Forward Deployed AI Engineer at UBS, bringing an engineering foundation into product management. Explore my work in applied AI, full-stack systems, and product development.",
  openGraph: {
    title: "Leeon Israel — Software Engineering & Product",
    description:
      "Software engineering, applied AI, and a growing focus on product management.",
    images: [
      {
        url: "/images/leeon-israel.webp",
        width: 1400,
        height: 1400,
        alt: "Leeon Israel",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/leeon-israel.webp"],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <MotionProvider>
            <Nav />
            <main id="main-content">{children}</main>
            <Footer />
          </MotionProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Leeon Israel",
                jobTitle: "Forward Deployed AI Engineer",
                worksFor: { "@type": "Organization", name: "UBS" },
                url: "https://leeonisrael.com",
                sameAs: [
                  "https://github.com/LeeoniIsrael",
                  "https://linkedin.com/in/leeoniisrael",
                ],
              }),
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
