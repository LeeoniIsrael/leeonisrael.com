import Image from "next/image";
import type { Project } from "@/lib/portfolio";

export function previewFormat(project: Project) {
  if (project.id === "kavanah") return "mobile";
  if (project.image && project.id !== "rentconnect") return "web";
  return "logo";
}

const marks: Record<string, React.ReactNode> = {
  apex: (
    <>
      <path d="M12 48 32 12l20 36M21 35h22" />
      <path d="M12 54c8-7 12 7 20 0s12 7 20 0" />
    </>
  ),
  onhand: (
    <>
      <path d="m18 48 20-20m-9-9a13 13 0 0 0 16 16l8-8-10 1-7-7 1-10-8 8Z" />
      <path d="m18 38-9 9a5 5 0 0 0 7 7l9-9" />
    </>
  ),
  ocean: (
    <>
      <path d="m14 31 18-16 18 16v19H14V31Zm12 19V36h12v14" />
      <path d="M8 57c8-6 12 6 20 0s12 6 20 0h8" />
    </>
  ),
  kimo: (
    <>
      <path d="M16 14v36m0-17L43 14M27 26l20 24" />
      <circle cx="47" cy="50" r="4" />
      <circle cx="47" cy="14" r="4" />
    </>
  ),
  cocky: (
    <>
      <path d="M19 25h27v12c0 10-8 17-16 17S16 47 16 38V25Zm6 0-4-11m11 11V10m7 15 6-11" />
      <path d="m46 28 10 6-10 5M24 43h15" />
    </>
  ),
  rentconnect: (
    <>
      <path d="m9 28 15-13 15 13v20H9V28Zm13 20V35h8v13" />
      <path d="m36 19 5-4 15 13v20H43" />
      <path d="M14 56h36" />
    </>
  ),
};

export function ProjectVisual({
  project,
  screenIndex = 0,
}: {
  project: Project;
  screenIndex?: number;
}) {
  const format = previewFormat(project);
  if (format === "mobile")
    return (
      <div className="project-preview preview-mobile" data-preview="mobile">
        <div className="preview-phone">
          <Image
            src={
              "/images/kavanah-" +
              ["welcome", "preferences", "tradition"][screenIndex] +
              ".webp"
            }
            alt={
              "Kavanah " +
              ["welcome", "reading preferences", "prayer tradition"][
                screenIndex
              ] +
              " screen"
            }
            width={780}
            height={1688}
            sizes="(max-width:700px) 55vw, 260px"
          />
        </div>
      </div>
    );
  if (format === "web")
    return (
      <div className="project-preview preview-web" data-preview="web">
        <Image
          src={project.image!}
          alt={`${project.title} application screenshot`}
          width={1440}
          height={850}
          sizes="(max-width:700px) 90vw, 760px"
        />
      </div>
    );
  return (
    <div className="project-preview preview-logo" data-preview="logo">
      <div className="project-logo" aria-label={`${project.title} logo`}>
        <svg
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {marks[project.id] ?? <path d="M18 14v36h28M28 14v25h18" />}
        </svg>
      </div>
      <span className="project-logo-name">{project.title}</span>
    </div>
  );
}
