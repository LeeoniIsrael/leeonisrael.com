import history from "./experience-history.json";
import { experiences } from "./portfolio";

const historyFor = (company: string, role: string) =>
  history.find(
    (h) =>
      h.company === company && (company !== "UBS" || role.includes("Intern")),
  );
export const career = [
  ...experiences.map((e) => {
    const previous = historyFor(e.company, e.role);
    return {
      ...e,
      story: previous?.body?.replace("Being one of the first engineers at a healthcare AI startup means doing a bit of everything — and that's exactly what I do.", "As one of the first engineers at a healthcare AI startup, I did a bit of everything.").replace("I spend time", "I spent time").replace("Those conversations directly shape what I build next", "Those conversations shaped what I built next").replace("and am on call for production issues when they come up", "and handled production issues as they came up") ?? "",
      note: previous?.note ?? "",
      tags: [...new Set([...e.tags, ...(previous?.tags ?? [])])],
    };
  }),
  ...history
    .filter(
      (h) => !experiences.some((e) => historyFor(e.company, e.role) === h),
    )
    .map((h) => ({
      company: h.company,
      role: h.role,
      dates: h.dates,
      location: h.where,
      summary: h.body,
      story: h.body,
      note: h.note ?? "",
      bullets: [] as string[],
      tags: h.tags,
    })),
];
export const courses = [
  "Algorithmic Design I & II",
  "Data Structures & Algorithms",
  "Advanced Programming Techniques",
  "Software Engineering",
  "Web Applications",
  "Database System Design",
  "Computer Networks",
  "Computer Security",
  "Information Security Principles",
  "Discrete Mathematics for CS",
  "UNIX/Linux Fundamentals",
  "Statistical Methods I & II",
  "Mobile Application Development",
  "Capstone Computing Project",
];
