import Hero         from "@/components/sections/Hero";
import About        from "@/components/sections/About";
import Experience   from "@/components/sections/Experience";
import Projects     from "@/components/sections/Projects";
import Capabilities from "@/components/sections/Capabilities";
import Education    from "@/components/sections/Education";
import Contact      from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Capabilities />
      <Education />
      <Contact />
    </>
  );
}
