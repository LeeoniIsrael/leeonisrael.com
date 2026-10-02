export type Project = {
  id: string;
  title: string;
  category: "AI & agents" | "Products" | "Experiments";
  status: string;
  summary: string;
  description: string;
  features: string[];
  focus: string;
  tags: string[];
  image?: string;
  github?: string;
  live?: string;
  visual?: "kavanah" | "apex" | "onhand" | "ocean" | "cocky" | "kimo";
};
export const projects: Project[] = [
  {
    id: "kavanah",
    title: "Kavanah",
    category: "Products",
    status: "In development",
    visual: "kavanah",
    summary: "A calmer, more personal way to make space for prayer.",
    description:
      "A local-first Jewish prayer companion for iOS and Android, designed to remove friction between an intention and a daily practice. Prayer reading works without an account; optional assistance and social features sit around that private core.",
    features: [
      "Intent-based prayer search with Hebrew text, translation, transliteration, and bookmarks.",
      "On-device prayer times, local reminders, offline reading, and optional biometric lock.",
      "A consent-based, source-bounded assistant and an optional Circle experience. Content review and release safeguards are still in progress.",
    ],
    focus:
      "Designing a useful daily ritual while keeping privacy, accessibility, and content provenance central to the product.",
    tags: ["React Native", "Expo", "TypeScript", "Zustand", "Supabase"],
    github: "https://github.com/LeeoniIsrael/kavanah",
  },
  {
    id: "apex",
    title: "APEX Weather",
    category: "AI & agents",
    status: "Research · paper trading",
    visual: "apex",
    summary: "Weather data into explainable, risk-aware market research.",
    description:
      "An experimental weather-market research and autonomous paper-trading system. APEX reads contract settlement rules, brings together weather observations, simulates the remaining day, and records an auditable decision trail.",
    features: [
      "Contract discovery and settlement parsing, with NWS, METAR, and other weather data sources.",
      "Monte Carlo simulation, executable order-book pricing, portfolio limits, and realistic paper fills.",
      "SQLite research records and evidence gates; unknown rules, stale data, or insufficient liquidity produce a skip. Live execution is disabled by default.",
    ],
    focus:
      "Treating uncertainty and data quality as first-class engineering constraints. No profitability claim is made.",
    tags: ["Python", "Monte Carlo", "SQLite", "Kalshi API"],
    github: "https://github.com/LeeoniIsrael/apex-trading",
  },
  {
    id: "onhand",
    title: "ONHAND",
    category: "Products",
    status: "Prototype in progress",
    visual: "onhand",
    summary: "From “something broke” to finding the right help.",
    description:
      "An in-progress mobile product exploring on-demand home repair. The concept brings issue identification, service selection, and worker matching into one guided experience.",
    features: [
      "A React Native / Expo mobile app currently being built.",
      "Planned photo-assisted issue recognition to help describe a repair.",
      "Planned live worker matching and a guided service-request flow; these are product goals, not a claim of a launched service.",
    ],
    focus:
      "Reducing the uncertainty between noticing a household problem and knowing the next step.",
    tags: ["React Native", "Expo", "TypeScript", "Product design"],
    github: "https://github.com/LeeoniIsrael/onhand",
  },
  {
    id: "ocean",
    title: "Ocean Vacations",
    category: "Products",
    status: "Business software",
    visual: "ocean",
    summary: "One workspace for property reporting and owner operations.",
    description:
      "A unified vacation-rental operations system replacing separate reports and owner-portal applications. The product brings reservation data, invoices, saved reports, and role-based access into a single workflow.",
    features: [
      "Server-side Guesty reservation integration with normalized data cached in MongoDB.",
      "Admin and owner access, Cloudinary invoices, and shareable report snapshots.",
      "Date-range reporting, including a split-cleaning report for owner cleaning fees and reservation totals.",
    ],
    focus:
      "Turning fragmented operational workflows into a consistent interface with clear reporting and access boundaries.",
    tags: ["Next.js", "React", "MongoDB", "Guesty API", "Cloudinary"],
  },
  {
    id: "spotify",
    title: "Spotify Splitter",
    category: "AI & agents",
    status: "Personal project",
    image: "/screenshots/spotify-splitter.png",
    summary: "Find the mood in a playlist. Then find its flow.",
    description:
      "An AI-powered playlist organizer with two modes: split a collection into vibe-based playlists, or reorder tracks for smoother DJ transitions. Built with a React interface and Python API.",
    features: [
      "Custom vibe descriptions and large-playlist processing, tested with more than 700 tracks.",
      "Camelot harmonic key matching, BPM compatibility, and energy-arc optimization.",
      "Spotify OAuth, playlist creation, and transition guidance with optional playlist reordering.",
    ],
    focus:
      "Combining structured model output with musical heuristics and a usable end-to-end workflow.",
    tags: ["Python", "Flask", "React", "Groq", "Spotify API"],
    github: "https://github.com/LeeoniIsrael/spotify-splitter",
  },
  {
    id: "kimo",
    title: "KiMO",
    category: "AI & agents",
    status: "AAMAS 2026",
    visual: "kimo",
    summary: "Knowledge that helps multiple agents work together.",
    description:
      "Co-authored KiMO: Knowledge-infused Multi-agent Orchestrator at the University of South Carolina AI Institute. The work was accepted at AAMAS 2026 and explores how structured knowledge can guide heterogeneous agents.",
    features: [
      "A two-stage pipeline for planning and agent coordination.",
      "Planning ontologies encode task structure; agent registries describe capabilities.",
      "Interpretable, expert-modifiable workflows, demonstrated through a manufacturing use case.",
    ],
    focus:
      "Making agent coordination inspectable and grounded in task semantics rather than relying on free-form communication alone.",
    tags: ["Python", "Multi-agent systems", "Knowledge graphs", "Research"],
  },
  {
    id: "cocky",
    title: "Cocky Clicker",
    category: "Experiments",
    status: "Team project",
    visual: "cocky",
    summary: "Gamecock spirit, built into a native Android idle game.",
    description:
      "A University of South Carolina-themed clicker game built with Alex Rishmawi. Players generate Hype through taps and passive upgrades, then reset through a prestige system to unlock longer-term progression.",
    features: [
      "Exponentially scaled upgrades, achievements, and offline progression.",
      "Kotlin coroutines and StateFlow power reactive gameplay with an MVVM architecture.",
      "Persistent game state and low-latency SoundPool audio.",
    ],
    focus:
      "Balancing a satisfying progression loop with reliable state, lifecycle handling, and responsive native interaction.",
    tags: ["Kotlin", "Jetpack Compose", "Coroutines", "MVVM"],
    github: "https://github.com/LeeoniIsrael/cocky-clicker",
  },
  {
    id: "signify",
    title: "Signify",
    category: "AI & agents",
    status: "SEO Tech Developers 2024",
    image: "/screenshots/signify-img.png",
    summary: "Bringing hand gestures into a voice interface.",
    description:
      "A real-time ASL hand-gesture recognition project connecting computer vision, classification, and speech output. Recognized as Best Overall Project at SEO 2024 in the existing portfolio.",
    features: [
      "MediaPipe hand landmarks and a CNN-based letter-recognition pipeline.",
      "Camera input processed through OpenCV and a Flask interface.",
      "Recognized letters connected to text-to-speech output.",
    ],
    focus:
      "Bringing model inference into an interactive experience and understanding the entire path from data to interface.",
    tags: ["Python", "TensorFlow", "MediaPipe", "OpenCV", "Flask"],
    github: "https://github.com/LeeoniIsrael/sign-language-interpreter",
  },
  {
    id: "rentconnect",
    title: "RentConnect",
    category: "AI & agents",
    status: "Working prototype",
    image: "/screenshots/rent-connect.png",
    summary: "Specialized agents for student housing and roommate discovery.",
    description:
      "A multi-agent student-housing prototype that coordinates property discovery, listing analysis, preference-based ranking, and roommate matching through an agent registry.",
    features: [
      "Separate agents for listing ingestion, scam analysis, compliance checks, and ranking.",
      "Survey-based roommate matching with explainable compatibility results.",
      "Registry-driven routing and feedback workflows for housing recommendations.",
    ],
    focus:
      "Coordinating specialized agents around a real user journey, with inspectable reasons behind recommendations.",
    tags: ["Python", "AI agents", "Agent registry", "Housing"],
    github: "https://github.com/LeeoniIsrael/rent-connect-agent",
  },
  {
    id: "instagram",
    title: "Instagram Clone",
    category: "Products",
    status: "Web app",
    image: "/screenshots/instagramclone-img.png",
    summary: "Rebuilding the interactions behind a familiar social product.",
    description:
      "A full-stack social application recreating core Instagram workflows, from account creation and sharing to discovering and interacting with other people’s posts.",
    features: [
      "Authentication, image and video posting, and user profiles.",
      "Real-time comments, follows, and an explore feed.",
      "React and Firebase application deployed on Vercel.",
    ],
    focus:
      "Managing state and complexity while maintaining consistent interactions across a larger application.",
    tags: ["React", "Firebase", "Vite", "Vercel"],
    github: "https://github.com/LeeoniIsrael/instagram-clone",
    live: "https://leeon-israel-ig-clone.vercel.app/auth",
  },
  {
    id: "dormdish",
    title: "Dorm Dish",
    category: "Products",
    status: "Team project",
    image: "/screenshots/dormdish-img.png",
    summary: "Good meals from what’s already in a student’s kitchen.",
    description:
      "An AI recipe assistant built with a four-person team at SEO Tech Developers 2024. Students enter ingredients and receive cooking guidance suited to dorm-life constraints.",
    features: [
      "Ingredient-based recipe suggestions generated with OpenAI.",
      "Step-by-step cooking instructions suited to limited equipment.",
      "A Python and Flask application built collaboratively under a deadline.",
    ],
    focus:
      "Scoping a complete product around a simple user need while coordinating delivery across a team.",
    tags: ["Python", "Flask", "OpenAI API"],
    github: "https://github.com/LeeoniIsrael/dorm-dish",
  },
  {
    id: "weather",
    title: "Weather",
    category: "Experiments",
    status: "Web app",
    image: "/screenshots/weather-img.png",
    summary: "A forecast that feels like the weather outside.",
    description:
      "A weather interface that pairs live conditions with immersive sky backgrounds. Built with JavaScript, HTML, and CSS to explore the relationship between information and atmosphere.",
    features: [
      "Current weather with UV, wind, and precipitation information.",
      "Condition-aware visuals and sky photography.",
      "Direct API integration and DOM-driven interface updates.",
    ],
    focus:
      "Making familiar data easier to read through hierarchy, environmental cues, and focused interaction.",
    tags: ["JavaScript", "Weather API", "HTML", "CSS"],
    github: "https://github.com/LeeoniIsrael/weather",
    live: "https://www.loom.com/share/88e2ce1d4613444fa6fea0322de788fc",
  },
  {
    id: "coinflipper",
    title: "Coin:Flipper",
    category: "Products",
    status: "Personal project",
    image: "/screenshots/financetracker-img.png",
    summary: "A clearer picture of income, spending, and savings.",
    description:
      "A full-stack personal-finance tracker with persistent budgeting data and support for multiple currencies. It connects a Flask backend to expense and savings workflows.",
    features: [
      "Income and expense tracking alongside savings goals.",
      "Live exchange-rate conversion for multi-currency budgets.",
      "Persistent SQLite storage behind a Python application.",
    ],
    focus:
      "Understanding data flow across a complete application, from external services to storage and the user interface.",
    tags: ["Python", "Flask", "SQLite", "Currency API"],
    github: "https://github.com/LeeoniIsrael/personal-finance-tracker",
  },
  {
    id: "calculator",
    title: "Calculator",
    category: "Experiments",
    status: "Foundations",
    image: "/screenshots/calc-img.png",
    summary: "A small exercise in getting the fundamentals right.",
    description:
      "A minimal browser calculator with a focused dark interface and keyboard support. Built without a framework to work directly with browser events and the DOM.",
    features: [
      "Core arithmetic operations and clear operator feedback.",
      "Mouse and keyboard interaction.",
      "A lightweight HTML, CSS, and JavaScript implementation.",
    ],
    focus:
      "Building reliable interaction and state transitions in a deliberately small surface area.",
    tags: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/LeeoniIsrael/calculator",
    live: "https://leeoniisrael.github.io/calculator",
  },
];
export const experiences = [
  {
    company: "UBS",
    role: "Forward Deployed AI Engineer",
    dates: "Aug 2026 — Present",
    location: "New York, NY",
    summary: "Bringing applied AI from client needs to enterprise workflows.",
    bullets: [
      "Translate client needs into roadmap proposals and feature redesigns for wealth management AI products, contributing across three teams in applied AI, data, and enterprise tooling.",
      "Process and optimize financial data with Databricks, Denodo, Java, and Azure for AI products and employee tools.",
      "Develop a Python agent harness to orchestrate model calls, tools, and context for coding agents, data discovery, and enterprise workflows.",
    ],
    tags: ["Python", "Databricks", "Denodo", "Azure", "Product strategy"],
  },
  {
    company: "Qatalyst Health",
    role: "Founding Engineer",
    dates: "Nov 2024 — Aug 2026",
    location: "Columbia, SC",
    summary: "Building clinical intelligence around the people doing the work.",
    bullets: [
      "Engineered a clinical reimbursement engine with 10 Gemini 2.5 Flash detection functions for background monitoring of care patterns.",
      "Integrated document intelligence with Django, interactive highlighting, and user edits to accelerate clinical reimbursement review.",
      "Built an LLM-as-a-judge evaluation system that reduced review cycles from days to 20 minutes, with 94% recall for clinical inaccuracies.",
      "Authored a DevOps transformation plan targeting 60% smaller images, with SHA-tagged deployments, security gates, and multi-stage Docker builds.",
    ],
    tags: ["Python", "Django", "Gemini", "AI evaluation", "Docker"],
  },
  {
    company: "USC AI Institute",
    role: "Artificial Intelligence Research Intern",
    dates: "Jan 2023 — Jan 2026",
    location: "Columbia, SC",
    summary: "Research in knowledge-guided agents, retrieval, and language.",
    bullets: [
      "Co-authored KiMO: Knowledge-infused Multi-agent Orchestrator, accepted at AAMAS 2026.",
      "Engineered LangChain and LlamaIndex RAG comparison models, improving Q&A accuracy by 60% over enterprise legacy models.",
      "Built an NLP pipeline over 10,000+ data points, achieving 85% accuracy and an 83% F1-score for deception detection.",
      "Developed a React interface for a mental healthcare AI chatbot in collaboration with a cross-functional team.",
    ],
    tags: ["LangChain", "LlamaIndex", "spaCy", "React", "Knowledge graphs"],
  },
  {
    company: "UBS",
    role: "Software Engineering Intern",
    dates: "Jun 2025 — Aug 2025",
    location: "New York, NY",
    summary: "Agent tools, market-risk research, and better internal products.",
    bullets: [
      "Built Python and Java MCP servers to let coding agents explore data lakes and execute connected tools.",
      "Led a market-risk prediction prototype combining live-news sentiment agents and XGBoost; presented the application to the company CTO.",
      "Designed a candidate team-matching platform that cut resume-screening time by 95%, using React, LangChain, and Azure SQL.",
      "Automated realistic data generation with TypeScript and Faker, shortening dataset testing time by more than 80%.",
    ],
    tags: ["Python", "Java", "MCP", "React", "Azure SQL"],
  },
  {
    company: "John Deere",
    role: "Artificial Intelligence Engineering Intern",
    dates: "May — Aug 2024",
    location: "Chicago, IL",
    summary: "Practical AI improvements in a production environment.",
    bullets: [
      "Automated AI indexing workflows with Python and LangChain, lowering indexing effort by more than 70%.",
      "Built a RAG tool that generated pre-populated support forms and expedited user support by more than 75%.",
      "Added time-framed product information and removed outdated OpenSearch vector-store entries on new uploads.",
    ],
    tags: ["Python", "LangChain", "RAG", "OpenSearch"],
  },
];
