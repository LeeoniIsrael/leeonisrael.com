export type ProjectScreen = {
  name: string;
  src: string;
  width: number;
  height: number;
  format?: "mobile" | "web";
  caption?: string;
};

export const projectScreens: Record<string, ProjectScreen[]> = {
  apex: [
    {
      name: "Project site",
      src: "/images/apex-site.webp",
      width: 3599,
      height: 2089,
      format: "web",
      caption: "Original APEX project site capture",
    },
  ],
  ocean: [
    {
      name: "Income",
      src: "/images/ocean-reports.png",
      width: 1440,
      height: 900,
      format: "web",
      caption: "Local Ocean Vacations interface · Sample data",
    },
  ],
  kimo: [
    {
      name: "Workflow",
      src: "/images/kimo-preview.png",
      width: 1440,
      height: 900,
      format: "web",
      caption: "Conceptual workflow visualization · KiMO research",
    },
  ],
  cocky: [
    {
      name: "Game",
      src: "/images/cocky-preview.png",
      width: 390,
      height: 844,
      caption: "Styled game concept · Cocky Clicker",
    },
  ],
  rentconnect: [
    {
      name: "Home",
      src: "/images/rentconnect-home.webp",
      width: 1206,
      height: 2622,
    },
    {
      name: "Map",
      src: "/images/rentconnect-map.webp",
      width: 1206,
      height: 2622,
    },
    {
      name: "Chat",
      src: "/images/rentconnect-chat.webp",
      width: 1206,
      height: 2622,
    },
  ],
  kavanah: [
    {
      name: "Home",
      src: "/images/kavanah-home.webp",
      width: 1206,
      height: 2622,
    },
    {
      name: "Siddur",
      src: "/images/kavanah-siddur.webp",
      width: 1206,
      height: 2622,
    },
    {
      name: "Prayer reader",
      src: "/images/kavanah-reader.webp",
      width: 1206,
      height: 2622,
    },
  ],
  onhand: [
    { name: "Home", src: "/images/onhand-home.webp", width: 860, height: 2200 },
    {
      name: "Specialist profile",
      src: "/images/onhand-specialist.webp",
      width: 860,
      height: 2200,
    },
    {
      name: "Worker dashboard",
      src: "/images/onhand-worker.webp",
      width: 860,
      height: 2500,
    },
  ],
  signify: [
    {
      name: "Translate",
      src: "/images/signify-translate.webp",
      width: 1206,
      height: 2622,
    },
    {
      name: "Conversation",
      src: "/images/signify-conversation.webp",
      width: 1206,
      height: 2622,
    },
    {
      name: "Phrasebook",
      src: "/images/signify-phrasebook.webp",
      width: 1206,
      height: 2622,
    },
  ],
};
