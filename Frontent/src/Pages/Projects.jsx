import React, { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  ChevronUp,
  Code,
  ExternalLink,
  Eye,
  FolderOpen,
  Github,
  Grid3X3,
  HelpCircle,
  Layers,
  List,
  Mail,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { apiFetch } from "../lib/api";

// -------------------- 1. DATA --------------------
const initialProjects = [
  // MERN
  {
    id: 1,
    title: "Jagat-Education",
    category: "MERN Stack",
    status: "Live",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
    desc: "Dynamic educational website featuring a responsive Hero section, course listings, and interactive UI components.",
    tech: ["React", "Vite", "Responsive UI", "CSS", "MongoDB"],
    links: { live: "https://jagatverma142.github.io/Jagateducation/", repo: "#" },
  },
  {
    id: 2,
    title: "Jagat-Med Health Portal",
    category: "MERN Stack",
    status: "Live",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    desc: "Responsive medical website with dynamic routing and service listings deployed on GitHub Pages.",
    tech: ["React", "Vite", "Tailwind", "Gh-Pages", "Responsive Design", "MongoDB"],
    links: { live: "https://jagatverma142.github.io/jagat_med_web/", repo: "#" },
  },
  {
    id: 3,
    title: "Awak_Agency",
    category: "MERN Stack",
    status: "Beta",
    img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop",
    desc: "Modern digital agency portfolio featuring services from UI/UX to SEO with performance-first UI.",
    tech: ["React", "Vite", "Tailwind", "Gh-Pages", "Responsive Design", "MongoDB"],
    links: { live: "https://jagatverma142.github.io/Digital_Agency/", repo: "#" },
  },
  {
    id: 4,
    title: "Personal Portfolio",
    category: "MERN Stack",
    status: "Live",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97e?q=80&w=1200&auto=format&fit=crop",
    desc: "High-performance personal portfolio showcasing skills, projects, and contact info.",
    tech: ["React", "Vite", "Framer Motion", "SEO"],
    links: { live: "#", repo: "#" },
  },
  {
    id: 5,
    title: "Artist Portfolio",
    category: "MERN Stack",
    status: "Live",
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
    desc: "Visually-driven site featuring custom galleries and SEO-optimized content for artists.",
    tech: ["React", "CSS Grid", "Lazy Load"],
    links: { live: "#", repo: "#" },
  },

  // DJANGO
  {
    id: 6,
    title: "College Management System",
    category: "Django",
    status: "Live",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
    desc: "Comprehensive platform to manage student/faculty records and department schedules.",
    tech: ["Django", "MySQL", "Python", "HTML/CSS"],
    links: { live: "#", repo: "#" },
  },
  {
    id: 7,
    title: "Hospital Patient Manager",
    category: "Django",
    status: "Live",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
    desc: "Secure web app for patient records and appointments with Role-Based Access Control.",
    tech: ["Django", "RBAC", "Bootstrap", "SQLite"],
    links: { live: "#", repo: "#" },
  },
  {
    id: 8,
    title: "Insurance Claim Portal",
    category: "Django",
    status: "Done",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop",
    desc: "Secure portal for users to submit claims and agents to track statuses with high data integrity.",
    tech: ["Django", "Python", "Secure Auth"],
    links: { live: "#", repo: "#" },
  },
  {
    id: 9,
    title: "Food Ordering Site",
    category: "Django",
    status: "Beta",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop",
    desc: "Dynamic e-commerce site featuring a real-time shopping cart and menu management APIs.",
    tech: ["Django", "REST API", "JavaScript", "AJAX"],
    links: { live: "#", repo: "#" },
  },
  {
    id: 10,
    title: "Inventory Management",
    category: "Django",
    status: "Done",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    desc: "Automated system to track stock levels, generate reports, and manage supplier data.",
    tech: ["Django", "MySQL", "Chart.js"],
    links: { live: "#", repo: "#" },
  },

  // CLIENT WORK
  {
    id: 11,
    title: "Headless E-Commerce",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200&auto=format&fit=crop",
    desc: "Decoupled architecture style build (CMS + fast frontend).",
    tech: ["Next.js", "WPGraphQL", "WooCommerce", "Tailwind"],
    links: { live: "#", repo: "#" },
  },
  {
    id: 12,
    title: "Custom Real Estate Portal",
    category: "Client Work",
    status: "Done",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    desc: "Advanced property listing site with custom post types, filtering and map integration.",
    tech: ["Custom Theme", "ACF Pro", "Google Maps API", "PHP"],
    links: { live: "#", repo: "#" },
  },
  {
    id: 13,
    title: "Live Hospital website",
    category: "Client Work",
    status: "Plugin",
    img: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=1200&auto=format&fit=crop",
    desc: "Sarthak Hospital, Agra – trusted multi-speciality care with advanced facilities, expert doctors, and 24x7 emergency support.",
    tech: ["PHP", "Plugin Dev", "AJAX", "MySQL"],
    links: { live: "https://tajtriptour.in/index.php?lang=en", repo: "#" },
  },
  {
    id: 14,
    title: "Point To Taxi",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200&auto=format&fit=crop",
    desc: "Live taxi/business website.",
    tech: ["Client Work", "Live Website"],
    links: { live: "http://pointtotaxi.in/", repo: "#" },
  },
  {
    id: 15,
    title: "The Dentist Studio",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop",
    desc: "Live dental clinic website.",
    tech: ["Client Work", "Live Website"],
    links: { live: "http://thedentiststudio.com/", repo: "#" },
  },
  {
    id: 16,
    title: "AUGC",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    desc: "Live organization website.",
    tech: ["Client Work", "Live Website"],
    links: { live: "http://augc.in/", repo: "#" },
  },
  {
    id: 17,
    title: "AMDC Agra",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop",
    desc: "Live organization website.",
    tech: ["Client Work", "Live Website"],
    links: { live: "https://amdcagra.in/", repo: "#" },
  },
  {
    id: 18,
    title: "Delhi Agra Jaipur Tour",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    desc: "Live tourism website.",
    tech: ["Client Work", "Live Website"],
    links: { live: "http://delhiagrajaipurtour.in/", repo: "#" },
  },
  {
    id: 19,
    title: "Techvera",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    desc: "Live tech business website deployed on GitHub Pages.",
    tech: ["Client Work", "React", "GitHub Pages", "Live Website"],
    links: { live: "https://vjagat171-hash.github.io/Techvera/", repo: "#" },
  },
  {
    id: 20,
    title: "Aravstar",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    desc: "Live business website.",
    tech: ["Client Work", "Live Website"],
    links: { live: "https://aravstar.com/index.php", repo: "#" },
  },
  {
    id: 21,
    title: "Taj Trip Tour (JD)",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1505839673365-e3971f8d9184?q=80&w=1200&auto=format&fit=crop",
    desc: "Live tourism website (JD section).",
    tech: ["Client Work", "Live Website"],
    links: { live: "https://tajtriptour.in/JD/index.php", repo: "#" },
  },
  {
    id: 22,
    title: "Yadu Hospital (Services)",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop",
    desc: "Live hospital services page.",
    tech: ["Client Work", "Live Website"],
    links: { live: "https://yaduhospital.com/service.html", repo: "#" },
  },
  {
    id: 23,
    title: "Crown Plus",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    desc: "Live business website.",
    tech: ["Client Work", "Live Website"],
    links: { live: "http://crownplus.in/", repo: "#" },
  },
  {
    id: 24,
    title: "Chandra Metal",
    category: "Client Work",
    status: "Live",
    img: "https://images.unsplash.com/photo-1581091215367-59ab6b56f1b4?q=80&w=1200&auto=format&fit=crop",
    desc: "Live company website.",
    tech: ["Client Work", "Live Website"],
    links: { live: "https://www.chandrametal.com/", repo: "#" },
  },
  {
    id: 25,
    title: "CricPulse Platform",
    category: "MERN Stack",
    status: "Live",
    img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop",
    desc: "Modern cricket platform built with React for live match discovery, featured score sections, quick navigation, responsive layouts, and a premium sports-focused interface.",
    tech: ["React", "Vite", "Responsive UI", "React Router", "GitHub Pages", "Modern UI"],
    links: {
      live: "https://vjagat171-hash.github.io/cricpulse-platform/",
      repo: "https://github.com/vjagat171-hash/cricpulse-platform",
    },
  },
];

const projectsFAQ = [
  {
    q: "Can I see the source code for every project?",
    a: "Some repos are public, while others are private or client-based. If the repo button is disabled, ask for a walkthrough.",
  },
  {
    q: "Do you build full-stack apps too?",
    a: "Yes. I can build MERN applications with authentication, CRUD, dashboards, and API integrations.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes. I can improve UI, performance, responsiveness, and information architecture.",
  },
];

// -------------------- 2. HELPERS --------------------
const sectionWrap = "w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8";
const sectionPad = "py-14 sm:py-16 lg:py-20";

const containerV = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUpV = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 18 },
  },
};

const isValidLink = (url) => typeof url === "string" && url.trim() && url !== "#";

const normalizeProject = (project, index = 0) => ({
  id: project?.id ?? `project-${index}`,
  title: String(project?.title || "Untitled Project"),
  category: String(project?.category || "Other"),
  status: String(project?.status || "Draft"),
  img:
    project?.img ||
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  desc: String(project?.desc || "Project description not available."),
  tech: Array.isArray(project?.tech) ? project.tech.filter(Boolean) : [],
  links: {
    live: project?.links?.live || "#",
    repo: project?.links?.repo || "#",
  },
});

const projectKey = (project, index = 0) => {
  if (project?.id !== undefined && project?.id !== null) return `id-${project.id}`;
  if (project?.title) return `title-${String(project.title).toLowerCase().trim()}`;
  return `idx-${index}`;
};

const mergeProjects = (fallbackProjects = [], apiProjects = []) => {
  const map = new Map();

  fallbackProjects.forEach((project, index) => {
    const normalized = normalizeProject(project, index);
    map.set(projectKey(normalized, index), normalized);
  });

  apiProjects.forEach((project, index) => {
    const normalized = normalizeProject(project, index);
    const key = projectKey(normalized, index);
    const existing = map.get(key);

    if (!existing) {
      map.set(key, normalized);
      return;
    }

    map.set(key, {
      ...existing,
      ...normalized,
      tech: normalized.tech?.length ? normalized.tech : existing.tech,
      links: {
        ...existing.links,
        ...normalized.links,
      },
    });
  });

  return Array.from(map.values()).sort((a, b) => {
    const aId = Number(a.id);
    const bId = Number(b.id);
    if (!Number.isNaN(aId) && !Number.isNaN(bId)) return aId - bId;
    return String(a.title).localeCompare(String(b.title));
  });
};

const useDebouncedValue = (value, delay = 250) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

// -------------------- 3. SMALL COMPONENTS --------------------
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-green-400/80 z-[100] mix-blend-screen"
    />
  );
};

const BackToTop = () => {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShow(latest > 700);
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.2 }}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
          }
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[90] rounded-full border border-white/10 bg-[#0a0a0a]/85 backdrop-blur-md w-11 h-11 sm:w-12 sm:h-12 inline-flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Back to top"
        >
          <ChevronUp className="text-white/80" size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const SectionHeading = ({ kicker, title, desc, align = "left", action = null }) => (
  <motion.div
    variants={fadeUpV}
    className={`mb-8 md:mb-12 ${
      align === "center"
        ? "text-center"
        : "flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
    }`}
  >
    <div className={align === "center" ? "" : "max-w-[760px]"}>
      <div
        className={`inline-flex items-center gap-2 mb-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <Sparkles size={16} className="text-green-500" />
        <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[4px] text-green-500">
          {kicker}
        </span>
      </div>

      <h2 className="text-[1.9rem] sm:text-[2.3rem] md:text-[2.9rem] font-bold leading-tight text-white">
        {title}
      </h2>

      {desc ? (
        <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed font-light">
          {desc}
        </p>
      ) : null}
    </div>

    {align !== "center" && action ? <div>{action}</div> : null}
  </motion.div>
);

const StatusPill = ({ status }) => {
  const value = String(status || "").toLowerCase();

  const cls =
    value === "live"
      ? "bg-green-500/15 text-green-300 border-green-500/30"
      : value === "beta"
      ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/25"
      : value === "done"
      ? "bg-sky-500/10 text-sky-300 border-sky-500/25"
      : value === "plugin"
      ? "bg-purple-500/10 text-purple-300 border-purple-500/25"
      : "bg-black/60 text-zinc-200 border-white/10";

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold border backdrop-blur-md ${cls}`}
    >
      {status}
    </span>
  );
};

const SmartImage = ({ src, alt }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
        <div className="text-center px-4">
          <FolderOpen size={28} className="mx-auto text-white/40 mb-2" />
          <p className="text-sm text-zinc-500">Preview unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  );
};

const StatCard = ({ label, value, icon }) => (
  <motion.div
    variants={fadeUpV}
    className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-5 sm:p-6 text-center"
  >
    <div className="w-10 h-10 mx-auto mb-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-green-400">
      {icon}
    </div>
    <div className="text-white font-black text-2xl sm:text-3xl">{value}</div>
    <div className="text-zinc-500 text-[11px] sm:text-xs font-bold tracking-[2px] uppercase mt-2">
      {label}
    </div>
  </motion.div>
);

// -------------------- 4. SECTIONS --------------------
const QuickNavSection = () => {
  const items = [
    { label: "Overview", id: "overview" },
    { label: "Featured", id: "featured" },
    { label: "Projects", id: "all-projects" },
    { label: "FAQ", id: "faq" },
  ];

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  return (
    <section className={`${sectionWrap} pt-2 pb-6 sm:pb-8`}>
      <motion.div
        variants={containerV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="flex gap-2 sm:gap-3 overflow-x-auto pb-1"
      >
        {items.map((x) => (
          <motion.button
            key={x.id}
            variants={fadeUpV}
            onClick={() => go(x.id)}
            className="shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold border border-white/10 bg-[#0a0a0a] text-zinc-300 hover:bg-white/5 hover:border-white/20 transition-colors"
          >
            {x.label}
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};

const FeaturedSection = ({ projects, onQuickView }) => {
  const featured = useMemo(() => {
    const withLive = projects.filter((p) => isValidLink(p.links?.live));
    const liveStatus = projects.filter((p) => String(p.status).toLowerCase() === "live");
    const source = withLive.length ? withLive : liveStatus.length ? liveStatus : projects;
    return source.slice(0, 3);
  }, [projects]);

  if (!featured.length) return null;

  return (
    <section id="featured" className={`${sectionWrap} ${sectionPad}`}>
      <motion.div
        variants={containerV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <SectionHeading
          kicker="FEATURED"
          title="Best projects to start with"
          desc="Highlighted work with cleaner cards, quick preview, and strong responsive spacing."
          align="center"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((p) => (
            <motion.article
              key={p.id}
              variants={fadeUpV}
              className="group rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden hover:border-white/20 transition-colors"
            >
              <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden border-b border-white/10">
                <SmartImage src={p.img} alt={p.title} />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/10 inline-flex items-center gap-2">
                    <FolderOpen size={12} />
                    {p.category}
                  </span>
                  <StatusPill status={p.status} />
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="text-white font-bold text-xl">{p.title}</h3>
                <p className="text-zinc-400 font-light leading-relaxed mt-3 text-sm sm:text-[15px] min-h-[72px]">
                  {p.desc}
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {(p.tech || []).slice(0, 6).map((t, idx) => (
                    <span
                      key={`${p.id}-${t}-${idx}`}
                      className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => onQuickView(p)}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors"
                  >
                    Quick View <Eye size={16} />
                  </button>

                  <a
                    href={isValidLink(p.links?.live) ? p.links.live : "#"}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                      isValidLink(p.links?.live)
                        ? "bg-white text-black hover:bg-zinc-200"
                        : "bg-white/5 text-white/30 border border-white/10 pointer-events-none"
                    }`}
                  >
                    Live <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const ProjectQuickView = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl mx-auto mt-4 sm:mt-8 rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl"
          >
            <div className="relative aspect-[16/9] bg-zinc-900">
              <SmartImage src={project.img} alt={project.title} />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-11 h-11 rounded-full border border-white/15 bg-black/50 text-white inline-flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">
                  {project.category}
                </span>
                <StatusPill status={project.status} />
              </div>

              <h3 className="text-white text-2xl sm:text-3xl font-bold">{project.title}</h3>
              <p className="mt-4 text-zinc-400 leading-relaxed font-light text-sm sm:text-base">
                {project.desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {(project.tech || []).map((t, idx) => (
                  <span
                    key={`${project.id}-modal-${t}-${idx}`}
                    className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={isValidLink(project.links?.live) ? project.links.live : "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                    isValidLink(project.links?.live)
                      ? "bg-white text-black hover:bg-zinc-200"
                      : "bg-white/5 text-white/30 border border-white/10 pointer-events-none"
                  }`}
                >
                  Live Demo <ExternalLink size={16} />
                </a>

                <a
                  href={isValidLink(project.links?.repo) ? project.links.repo : "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                    isValidLink(project.links?.repo)
                      ? "border border-white/20 text-white hover:bg-white/10"
                      : "bg-white/5 text-white/30 border border-white/10 pointer-events-none"
                  }`}
                >
                  Source Code <Github size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProjectCard = ({ project, view = "grid", onQuickView }) => {
  const repoDisabled = !isValidLink(project.links?.repo);
  const liveDisabled = !isValidLink(project.links?.live);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.22 }}
      className="h-full"
    >
      <div
        className={`group rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden hover:border-white/20 transition-colors h-full ${
          view === "list" ? "md:grid md:grid-cols-[340px_1fr]" : "flex flex-col"
        }`}
      >
        <div
          className={`relative bg-zinc-900 border-b border-white/10 overflow-hidden ${
            view === "list" ? "md:border-b-0 md:border-r" : ""
          } ${view === "grid" ? "aspect-[4/3] sm:aspect-[16/11]" : "aspect-[16/10] md:h-full"}`}
        >
          <SmartImage src={project.img} alt={project.title} />

          <div className="absolute top-4 left-4 max-w-[70%]">
            <span className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/10 inline-flex items-center gap-2">
              <FolderOpen size={12} />
              {project.category}
            </span>
          </div>

          <div className="absolute top-4 right-4">
            <StatusPill status={project.status} />
          </div>
        </div>

        <div className="p-5 sm:p-6 flex flex-col flex-grow">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-white font-bold text-lg sm:text-xl group-hover:text-green-400 transition-colors">
              {project.title}
            </h3>

            <button
              onClick={() => onQuickView(project)}
              className="shrink-0 hidden sm:inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-zinc-300 hover:bg-white/10 transition-colors"
            >
              <Eye size={14} />
              Preview
            </button>
          </div>

          <p className="text-zinc-400 font-light leading-relaxed text-sm sm:text-[15px] mt-3">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {(project.tech || []).slice(0, view === "list" ? 8 : 5).map((t, idx) => (
              <span
                key={`${project.id}-${t}-${idx}`}
                className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => onQuickView(project)}
              className="sm:hidden inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              Preview <Eye size={15} />
            </button>

            <a
              href={project.links?.live || "#"}
              target="_blank"
              rel="noreferrer"
              aria-disabled={liveDisabled}
              className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold transition-colors ${
                liveDisabled
                  ? "bg-white/5 text-white/30 border border-white/10 pointer-events-none"
                  : "bg-white text-black hover:bg-zinc-200"
              }`}
            >
              Live <ExternalLink size={15} />
            </a>

            <a
              href={project.links?.repo || "#"}
              target="_blank"
              rel="noreferrer"
              aria-disabled={repoDisabled}
              className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors ${
                repoDisabled
                  ? "bg-white/5 text-white/30 border border-white/10 pointer-events-none"
                  : "border border-white/20 text-white hover:bg-white/10"
              }`}
            >
              Code <Github size={15} />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const FAQSection = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className={`${sectionWrap} ${sectionPad}`}>
      <motion.div
        variants={containerV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <SectionHeading
          kicker="FAQ"
          title="Project questions"
          desc="Short answers for common project and source-code related queries."
          align="center"
        />

        <div className="grid gap-4 max-w-[920px] mx-auto">
          {projectsFAQ.map((item, i) => {
            const isOpen = open === i;

            return (
              <motion.div
                key={i}
                variants={fadeUpV}
                className={`rounded-2xl border transition-colors ${
                  isOpen
                    ? "border-green-500/40 bg-white/5"
                    : "border-white/10 bg-[#0a0a0a] hover:bg-white/5"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <div className="flex items-start gap-4">
                    <HelpCircle
                      size={20}
                      className={isOpen ? "text-green-500 mt-0.5" : "text-zinc-600 mt-0.5"}
                    />
                    <span
                      className={`font-semibold text-[15px] sm:text-[1.02rem] ${
                        isOpen ? "text-white" : "text-zinc-300"
                      }`}
                    >
                      {item.q}
                    </span>
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={isOpen ? "text-white" : "text-zinc-600"}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 text-zinc-400 font-light leading-relaxed sm:pl-[3.45rem]">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

// -------------------- 5. MAIN PAGE --------------------
const Project = () => {
  const fallbackProjects = useMemo(
    () => initialProjects.map((p, i) => normalizeProject(p, i)),
    []
  );

  const [projects, setProjects] = useState(fallbackProjects);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("title-asc");
  const [view, setView] = useState("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const debouncedQuery = useDebouncedValue(query, 250);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const data = await apiFetch("/api/projects");
      const raw = Array.isArray(data?.projects)
        ? data.projects
        : Array.isArray(data)
        ? data
        : [];

      const merged = mergeProjects(fallbackProjects, raw);
      setProjects(merged);
    } catch (error) {
      console.error("Failed to fetch projects, using fallback data.", error);
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const statuses = useMemo(() => {
    const set = new Set(projects.map((p) => p.status));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let list = [...projects];

    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (activeStatus !== "All") {
      list = list.filter(
        (p) => String(p.status).toLowerCase() === String(activeStatus).toLowerCase()
      );
    }

    const q = debouncedQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const hay =
          `${p.title} ${p.desc} ${p.category} ${p.status} ${(p.tech || []).join(" ")}`
            .toLowerCase();
        return hay.includes(q);
      });
    }

    switch (sortBy) {
      case "title-asc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "live-first":
        list.sort((a, b) => {
          const av = String(a.status).toLowerCase() === "live" ? 1 : 0;
          const bv = String(b.status).toLowerCase() === "live" ? 1 : 0;
          return bv - av;
        });
        break;
      default:
        list.sort((a, b) => Number(b.id) - Number(a.id));
    }

    return list;
  }, [projects, activeCategory, activeStatus, debouncedQuery, sortBy]);

  const visibleProjects = useMemo(() => filteredProjects, [filteredProjects]);

  const stats = useMemo(() => {
    const liveCount = projects.filter(
      (p) => String(p.status).toLowerCase() === "live"
    ).length;

    const techCount = new Set(
      projects.flatMap((p) => (Array.isArray(p.tech) ? p.tech : []))
    ).size;

    return {
      total: projects.length,
      live: liveCount,
      categories: Math.max(categories.length - 1, 0),
      visible: filteredProjects.length,
      tech: techCount,
    };
  }, [projects, categories, filteredProjects]);

  return (
    <MotionConfig transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
      <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-green-500/30">
        <ScrollProgress />
        <BackToTop />
        <ProjectQuickView project={selectedProject} onClose={() => setSelectedProject(null)} />

        <section
          className={`${sectionWrap} min-h-[54vh] sm:min-h-[62vh] pt-[96px] sm:pt-[110px] pb-[56px] sm:pb-[72px] relative overflow-hidden`}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-[420px] sm:w-[520px] h-[420px] sm:h-[520px] bg-green-500/10 rounded-full blur-[120px]" />
            <div className="absolute -bottom-24 -right-24 w-[420px] sm:w-[520px] h-[420px] sm:h-[520px] bg-white/5 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_55%)]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10 text-center"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-green-500/30 bg-green-500/10 px-4 sm:px-5 py-2.5 text-[11px] sm:text-[12px] font-medium tracking-widest text-green-400 mb-6 sm:mb-7">
              PORTFOLIO
            </div>

            <h1 className="text-white font-extrabold leading-[1.05] tracking-tight text-[clamp(2.4rem,8vw,5.5rem)]">
              Dynamic
              <br />
              <span className="text-zinc-400">Project Showcase</span>
            </h1>

            <p className="mt-5 max-w-[780px] mx-auto text-zinc-400 font-light leading-relaxed text-[0.98rem] sm:text-[1.04rem] md:text-[1.15rem] px-2">
              Advanced project browsing with quick preview, filters, search, grid/list view, and smoother mobile responsiveness.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="#all-projects"
                className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 sm:px-8 py-3.5 text-sm sm:text-[15px] font-bold hover:bg-zinc-200 transition-colors"
              >
                Explore Projects <ArrowRight size={16} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 sm:px-8 py-3.5 text-sm sm:text-[15px] font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Start a conversation <Mail size={16} />
              </a>
            </div>
          </motion.div>
        </section>

        <QuickNavSection />

        <section id="overview" className={`${sectionWrap} ${sectionPad}`}>
          <motion.div
            variants={containerV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <SectionHeading
              kicker="OVERVIEW"
              title="Project dashboard"
              desc="Now cleaner, more dynamic, and fully responsive."
              align="center"
            />

            <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-5">
              <StatCard label="Total projects" value={stats.total} icon={<FolderOpen size={18} />} />
              <StatCard label="Live projects" value={stats.live} icon={<Zap size={18} />} />
              <StatCard label="Categories" value={stats.categories} icon={<Layers size={18} />} />
              <StatCard label="Visible now" value={stats.visible} icon={<Search size={18} />} />
              <StatCard label="Tech tools" value={stats.tech} icon={<Code size={18} />} />
            </div>
          </motion.div>
        </section>

        <FeaturedSection projects={projects} onQuickView={setSelectedProject} />

        <section id="all-projects" className={`${sectionWrap} ${sectionPad}`}>
          <motion.div
            variants={containerV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <SectionHeading
              kicker="PROJECTS"
              title="Browse all projects"
              desc="Search faster, switch layouts, preview instantly, and view all 25 projects together."
              action={
                <button
                  onClick={loadProjects}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0a0a0a] px-4 py-2.5 text-sm font-semibold text-zinc-300 hover:bg-white/5 transition-colors"
                >
                  <Zap size={16} className="text-green-400" />
                  Refresh
                </button>
              }
            />

            <motion.div
              variants={fadeUpV}
              className="sticky top-3 z-20 mb-8 rounded-[1.75rem] border border-white/10 bg-[#0a0a0a]/85 backdrop-blur-xl p-4 sm:p-5"
            >
              <div className="flex flex-col gap-4">
                <div className="grid gap-3 lg:grid-cols-[1.4fr_auto_auto_auto]">
                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by title, tech, category..."
                      className="w-full rounded-full border border-white/10 bg-black/30 pl-11 pr-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-green-500/40"
                    />
                  </div>

                  <button
                    onClick={() => setShowMobileFilters((prev) => !prev)}
                    className="lg:hidden inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-300"
                  >
                    <SlidersHorizontal size={16} />
                    Filters
                  </button>

                  <div className="inline-flex rounded-full border border-white/10 bg-black/30 p-1">
                    <button
                      onClick={() => setView("grid")}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm transition-colors ${
                        view === "grid"
                          ? "bg-white text-black"
                          : "text-zinc-300 hover:bg-white/10"
                      }`}
                    >
                      <Grid3X3 size={15} />
                      Grid
                    </button>
                    <button
                      onClick={() => setView("list")}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm transition-colors ${
                        view === "list"
                          ? "bg-white text-black"
                          : "text-zinc-300 hover:bg-white/10"
                      }`}
                    >
                      <List size={15} />
                      List
                    </button>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-green-500/40"
                  >
                    <option value="title-asc" className="bg-[#0a0a0a]">
                      Title A-Z
                    </option>
                    <option value="title-desc" className="bg-[#0a0a0a]">
                      Title Z-A
                    </option>
                    <option value="live-first" className="bg-[#0a0a0a]">
                      Live first
                    </option>
                    <option value="newest" className="bg-[#0a0a0a]">
                      Newest first
                    </option>
                  </select>
                </div>

                <div
                  className={`grid gap-3 lg:grid-cols-2 ${
                    showMobileFilters ? "block" : "hidden lg:grid"
                  }`}
                >
                  <select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="w-full rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-green-500/40"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#0a0a0a]">
                        {cat}
                      </option>
                    ))}
                  </select>

                  <select
                    value={activeStatus}
                    onChange={(e) => setActiveStatus(e.target.value)}
                    className="w-full rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-green-500/40"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status} className="bg-[#0a0a0a]">
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-xs sm:text-sm text-zinc-500">
                    Showing <span className="text-white font-semibold">{visibleProjects.length}</span> of{" "}
                    <span className="text-white font-semibold">{filteredProjects.length}</span> matched, total{" "}
                    <span className="text-white font-semibold">{projects.length}</span>
                  </span>

                  {activeCategory !== "All" && (
                    <button
                      onClick={() => setActiveCategory("All")}
                      className="px-3 py-1.5 rounded-full text-xs border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 transition-colors"
                    >
                      Category: {activeCategory} ×
                    </button>
                  )}

                  {activeStatus !== "All" && (
                    <button
                      onClick={() => setActiveStatus("All")}
                      className="px-3 py-1.5 rounded-full text-xs border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 transition-colors"
                    >
                      Status: {activeStatus} ×
                    </button>
                  )}

                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="px-3 py-1.5 rounded-full text-xs border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 transition-colors"
                    >
                      Search reset ×
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUpV}
                    className="rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden"
                  >
                    <div className="aspect-[4/3] bg-white/5 animate-pulse" />
                    <div className="p-6">
                      <div className="h-6 w-2/3 rounded bg-white/5 animate-pulse" />
                      <div className="mt-4 h-4 w-full rounded bg-white/5 animate-pulse" />
                      <div className="mt-2 h-4 w-5/6 rounded bg-white/5 animate-pulse" />
                      <div className="mt-5 flex gap-2">
                        <div className="h-8 w-20 rounded-full bg-white/5 animate-pulse" />
                        <div className="h-8 w-16 rounded-full bg-white/5 animate-pulse" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : visibleProjects.length > 0 ? (
              <motion.div
                layout
                className={`${
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7"
                    : "grid grid-cols-1 gap-5"
                }`}
              >
                <AnimatePresence mode="popLayout">
                  {visibleProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      view={view}
                      onQuickView={setSelectedProject}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                variants={fadeUpV}
                className="mt-6 rounded-3xl border border-white/10 bg-[#0a0a0a] p-10 sm:p-12 text-center"
              >
                <Zap size={40} className="text-green-500 mx-auto mb-4" />
                <p className="text-zinc-300 font-semibold text-lg">No projects found</p>
                <p className="text-zinc-500 text-sm mt-2">
                  Try a different search, category, or status filter.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => {
                      setQuery("");
                      setActiveCategory("All");
                      setActiveStatus("All");
                      setSortBy("title-asc");
                    }}
                    className="rounded-full bg-white text-black px-5 py-3 text-sm font-bold hover:bg-zinc-200 transition-colors"
                  >
                    Reset filters
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </section>

        <FAQSection />

        <section className={`${sectionWrap} pb-20 sm:pb-24`}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45 }}
            className="rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-8 sm:p-10 md:p-14 text-center hover:border-white/20 transition-colors"
          >
            <h3 className="text-white font-black leading-tight text-[1.9rem] sm:text-[2.4rem] md:text-[3.1rem]">
              Need a portfolio
              <br />
              <span className="text-green-500">this dynamic?</span>
            </h3>

            <p className="text-zinc-400 font-light leading-relaxed mt-4 max-w-[680px] mx-auto text-sm sm:text-base">
              I can also convert this into an admin-managed or API-driven showcase with featured projects, project details, and better content control.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-8 sm:px-9 py-3.5 text-[15px] font-bold hover:bg-zinc-200 transition-colors"
                >
                  Start a conversation <Mail size={18} />
                </motion.button>
              </a>

              <a href="/about">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-8 sm:px-9 py-3.5 text-[15px] font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Know more about me <ArrowRight size={18} />
                </motion.button>
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </MotionConfig>
  );
};

export default Project;