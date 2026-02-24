import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  ChevronUp,
  Code,
  ExternalLink,
  Filter,
  FolderOpen,
  Github,
  HelpCircle,
  Layers,
  Mail,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";

// -------------------- 1. DATA --------------------
const projectsData = [
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
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
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
];

const projectsFAQ = [
  {
    q: "Can I see the source code for every project?",
    a: "Some repos are public, while others are private/client-based. If the repo button is disabled, ask for a walkthrough.",
  },
  {
    q: "Do you build full-stack apps too?",
    a: "Yes. I can build MERN applications with authentication, CRUD, dashboards, and API integrations.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes—UI refresh, performance improvements, responsive fixes, and better information architecture.",
  },
];

// -------------------- 2. ANIMATIONS & UTILS --------------------
const sectionWrap = "w-full max-w-[1200px] mx-auto px-5";
const sectionPad = "py-20 md:py-24";

// FIX: Removed `amount: 0.2` and used `margin: "-50px"` so sections trigger reliably
const containerV = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUpV = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 18 } },
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 22 });
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

  // Safe scroll event listener
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!reduce) setShow(latest > 800);
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          className="fixed bottom-6 right-6 z-[90] rounded-full border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md w-12 h-12 inline-flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Back to top"
        >
          <ChevronUp className="text-white/80" size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const TiltCard = ({ children }) => {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * 8);
    ry.set(px * 10);
  };

  return (
    <motion.div
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={
        reduce
          ? undefined
          : { perspective: 1000, rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }
      }
    >
      {children}
    </motion.div>
  );
};

const SectionHeading = ({ kicker, title, align = "left" }) => (
  <motion.div variants={fadeUpV} className={align === "center" ? "text-center mb-12 md:mb-16" : "mb-12 md:mb-16"}>
    <div className={`inline-flex items-center gap-2 mb-3 ${align === "center" ? "justify-center" : ""}`}>
      <Sparkles size={16} className="text-green-500" />
      <span className="text-[12px] md:text-[13px] font-bold uppercase tracking-[4px] text-green-500">{kicker}</span>
    </div>
    <h2 className="text-[2.1rem] sm:text-[2.4rem] md:text-[3rem] font-bold leading-tight text-white">{title}</h2>
  </motion.div>
);

// -------------------- 3. TOPIC SECTIONS --------------------
const QuickNavSection = () => {
  const items = [
    { label: "Overview", id: "overview" },
    { label: "Featured", id: "featured" },
    { label: "Stacks", id: "stacks" },
    { label: "Industries", id: "industries" },
    { label: "All Projects", id: "all-projects" },
    { label: "FAQ", id: "faq" },
  ];

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className={`${sectionWrap} pt-6 pb-10`}>
      <motion.div
        variants={containerV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-wrap gap-2 justify-center"
      >
        {items.map((x) => (
          <motion.button
            key={x.id}
            variants={fadeUpV}
            onClick={() => go(x.id)}
            className="px-4 py-2 rounded-full text-sm font-semibold border border-white/10 bg-[#0a0a0a] text-zinc-300 hover:bg-white/5 hover:border-white/20 transition-colors"
          >
            {x.label}
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};

const WhatIBuildSection = () => {
  const cards = [
    { title: "Landing pages", desc: "Fast, responsive pages for lead generation & brand presence.", tags: ["Hero", "SEO", "Performance"] },
    { title: "Dashboards & portals", desc: "Admin panels, CRUD apps, role-based flows, analytics UI.", tags: ["Auth", "CRUD", "RBAC"] },
    { title: "Client websites", desc: "Business sites with clean UI, speed, and deployment support.", tags: ["Live Deploy", "Support", "Responsive"] },
  ];

  return (
    <section id="overview" className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
        <SectionHeading kicker="TOPICS" title="What I build" align="center" />
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <motion.div key={c.title} variants={fadeUpV}>
              <TiltCard>
                <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-white/20 transition-colors h-full">
                  <div className="text-white font-bold text-lg">{c.title}</div>
                  <p className="text-zinc-400 font-light mt-2 leading-relaxed">{c.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {c.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const StackFocusSection = () => {
  const stacks = [
    { title: "MERN Stack", desc: "Modern React UI + scalable product-style builds.", tags: ["React", "Vite", "UI System", "APIs"] },
    { title: "Django", desc: "Secure server-side apps and data-driven systems.", tags: ["Python", "Django", "Auth", "Admin"] },
    { title: "Client Work", desc: "Live business websites with speed and responsive UI.", tags: ["Live Sites", "UX", "Support"] },
  ];

  return (
    <section id="stacks" className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
        <SectionHeading kicker="STACKS" title="Primary development tracks" />
        <div className="grid gap-6 md:grid-cols-3">
          {stacks.map((s) => (
            <motion.div key={s.title} variants={fadeUpV}>
              <TiltCard>
                <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-green-500/20 transition-colors h-full">
                  <div className="flex items-center justify-between">
                    <div className="text-white font-bold text-lg">{s.title}</div>
                    <span className="text-[11px] font-black tracking-[3px] text-green-500">FOCUS</span>
                  </div>
                  <p className="text-zinc-400 font-light mt-2 leading-relaxed">{s.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const IndustriesSection = () => {
  const industries = [
    { title: "Healthcare", desc: "Hospital / clinic websites & service pages." },
    { title: "Tour & Travel", desc: "Tour pages, packages, enquiry flows." },
    { title: "Education", desc: "Course listings, info pages, responsive UI." },
    { title: "Business", desc: "Company profiles, services, lead pages." },
  ];

  return (
    <section id="industries" className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
        <SectionHeading kicker="DOMAIN" title="Industries covered" align="center" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((x) => (
            <motion.div
              key={x.title}
              variants={fadeUpV}
              className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-7 hover:bg-white/5 transition-colors h-full"
            >
              <div className="text-white font-bold">{x.title}</div>
              <p className="text-zinc-400 font-light mt-2 text-sm leading-relaxed">{x.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    { name: "Client", role: "Business Website", text: "Clean UI, fast delivery, and great support during deployment." },
    { name: "Client", role: "Clinic Website", text: "Responsive design and clear structure—easy to manage content." },
    { name: "Client", role: "Tour Website", text: "Good communication and quick changes when needed." },
  ];

  return (
    <section className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
        <SectionHeading kicker="TRUST" title="Client feedback (highlights)" />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div key={idx} variants={fadeUpV}>
              <TiltCard>
                <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-white/20 transition-colors h-full">
                  <p className="text-zinc-300 font-light leading-relaxed">“{t.text}”</p>
                  <div className="mt-5">
                    <div className="text-white font-bold">{t.name}</div>
                    <div className="text-zinc-500 text-sm">{t.role}</div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// -------------------- 4. MAIN SECTIONS --------------------
const CategoryBreakdownSection = ({ categories }) => {
  const liveCount = useMemo(
    () => projectsData.filter((p) => String(p.status).toLowerCase() === "live").length,
    []
  );

  const stats = useMemo(() => {
    const cats = categories.filter((c) => c !== "All");
    const catStats = cats.map((c) => ({
      label: c,
      value: projectsData.filter((p) => p.category === c).length,
    }));
    return [{ label: "Total projects", value: projectsData.length }, { label: "Live", value: liveCount }, ...catStats];
  }, [categories, liveCount]);

  return (
    <section className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
        <SectionHeading kicker="OVERVIEW" title="Project breakdown" />
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUpV}
              className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-7 text-center"
            >
              <div className="text-white font-black text-3xl">{s.value}</div>
              <div className="text-zinc-500 text-xs font-bold tracking-[2px] uppercase mt-2">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const FeaturedSection = () => {
  const featured = useMemo(() => {
    const live = projectsData.filter((p) => String(p.status).toLowerCase() === "live");
    return live.slice(0, 2);
  }, []);

  return (
    <section id="featured" className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
        <SectionHeading kicker="FEATURED" title="Best projects to start with" align="center" />
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <motion.div key={p.id} variants={fadeUpV}>
              <TiltCard>
                <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden hover:border-white/20 transition-colors h-full flex flex-col">
                  <div className="relative aspect-[16/10] bg-zinc-900 border-b border-white/10 overflow-hidden">
                    <motion.img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.55 }}
                    />
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-white border border-white/10">
                      {p.category}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="text-white font-black text-2xl">{p.title}</div>
                    <p className="text-zinc-400 font-light leading-relaxed mt-3 flex-grow">{p.desc}</p>

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
                      <a
                        href={p.links?.live || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors ${
                          p.links?.live && p.links.live !== "#"
                            ? "bg-white text-black hover:bg-zinc-200"
                            : "bg-white/5 text-white/30 border border-white/10 pointer-events-none"
                        }`}
                      >
                        Live <ExternalLink size={16} />
                      </a>

                      <a
                        href={p.links?.repo || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                          p.links?.repo && p.links.repo !== "#"
                            ? "border border-white/20 text-white hover:bg-white/10"
                            : "bg-white/5 text-white/30 border border-white/10 pointer-events-none"
                        }`}
                      >
                        Code <Github size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const TechToolboxSection = () => {
  const techList = useMemo(() => {
    const set = new Set();
    projectsData.forEach((p) => (p.tech || []).forEach((t) => set.add(t)));
    return Array.from(set).slice(0, 30);
  }, []);

  return (
    <section className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
        <SectionHeading kicker="TOOLBOX" title="Tech used across projects" />
        <motion.div variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 md:p-10">
          <div className="flex flex-wrap gap-3">
            {techList.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-zinc-300 hover:border-green-500/30 hover:text-white transition-colors cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const WorkflowSection = () => {
  const steps = [
    { icon: <Search size={20} />, title: "Discover", desc: "Goals, scope, pages, and user flow." },
    { icon: <Layers size={20} />, title: "Design", desc: "Wireframes + UI system (responsive rules)." },
    { icon: <Code size={20} />, title: "Build", desc: "Reusable components + clean structure." },
    { icon: <Briefcase size={20} />, title: "Ship", desc: "Deploy + bug-fix + handoff support." },
  ];

  return (
    <section className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
        <SectionHeading kicker="WORKFLOW" title="How I build projects" align="center" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <TiltCard key={i}>
              <motion.div
                variants={fadeUpV}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-white/20 transition-colors h-full"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-white/10 bg-white/5 text-green-400">
                    {s.icon}
                  </div>
                  <div className="text-[12px] font-black tracking-[3px] text-green-500">
                    STEP {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="text-white font-bold text-lg">{s.title}</div>
                <p className="text-zinc-400 font-light leading-relaxed mt-2">{s.desc}</p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const FAQSection = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
        <SectionHeading kicker="FAQ" title="Project questions" />
        <div className="grid gap-4 max-w-[900px] mx-auto">
          {projectsFAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                variants={fadeUpV}
                className={`rounded-2xl border transition-colors ${
                  isOpen ? "border-green-500/50 bg-white/5" : "border-white/10 bg-[#0a0a0a] hover:bg-white/5"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle size={20} className={isOpen ? "text-green-500" : "text-zinc-600"} />
                    <span className={`font-semibold text-[1.02rem] ${isOpen ? "text-white" : "text-zinc-300"}`}>
                      {item.q}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={isOpen ? "text-white" : "text-zinc-600"}
                    aria-hidden="true"
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
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-zinc-400 font-light leading-relaxed pl-[3.25rem]">{item.a}</div>
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
  const categories = useMemo(() => {
    const set = new Set(projectsData.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const byCat = activeCategory === "All" ? projectsData : projectsData.filter((p) => p.category === activeCategory);
    const q = query.trim().toLowerCase();
    if (!q) return byCat;

    return byCat.filter((p) => {
      const hay = `${p.title} ${p.desc} ${p.category} ${(p.tech || []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [activeCategory, query]);

  return (
    <MotionConfig transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-green-500/30">
        <ScrollProgress />
        <BackToTop />

        {/* HERO */}
        <section className={`${sectionWrap} min-h-[58vh] pt-[110px] pb-[70px] relative overflow-hidden`}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-green-500/10 rounded-full blur-[120px]" />
            <div className="absolute -bottom-24 -right-24 w-[520px] h-[520px] bg-white/5 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_55%)]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10 text-center"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2.5 text-[12px] font-medium tracking-widest text-green-400 mb-7">
              PORTFOLIO
            </div>

            <h1 className="text-white font-extrabold leading-[1.05] tracking-tight text-[clamp(2.7rem,7vw,5.2rem)]">
              My Recent
              <br />
              <span className="text-zinc-400">Projects</span>
            </h1>

            <p className="mt-5 max-w-[740px] mx-auto text-zinc-400 font-light leading-relaxed text-[1.02rem] md:text-[1.15rem]">
              A showcase of MERN, Django, and Client Work with a focus on clean UI and reliable builds.
            </p>
          </motion.div>
        </section>

        <QuickNavSection />
        <CategoryBreakdownSection categories={categories} />
        <WhatIBuildSection />
        <FeaturedSection />
        <StackFocusSection />
        <TechToolboxSection />
        <IndustriesSection />
        <WorkflowSection />

        {/* FILTER + GRID */}
        <section id="all-projects" className={`${sectionWrap} ${sectionPad}`}>
          {/* FIX: Removed opacity: 0 from the main wrapper, ensuring it's always visible for rendering */}
          <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <SectionHeading kicker="WORK" title="Browse all projects" />
              <motion.div variants={fadeUpV} className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <div className="relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search projects…"
                    className="w-full sm:w-[280px] rounded-full border border-white/10 bg-[#0a0a0a] pl-11 pr-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-green-500/40"
                  />
                </div>
                <div className="inline-flex items-center gap-2 text-zinc-400 text-sm">
                  <Filter size={16} className="text-green-500" /> Filter:
                </div>
              </motion.div>
            </div>

            <motion.div variants={fadeUpV} className="flex flex-wrap gap-2 md:gap-3 mb-10">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                      isActive
                        ? "border-green-500/50 bg-green-500/10 text-green-300"
                        : "border-white/10 bg-[#0a0a0a] text-zinc-300 hover:bg-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </motion.div>

            {/* FIX: Removed mode="popLayout" which causes grid height collapse */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
              <AnimatePresence>
                {filteredProjects.map((project) => {
                  const repoDisabled = !project.links?.repo || project.links.repo === "#";
                  const liveDisabled = !project.links?.live || project.links.live === "#";

                  return (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="group flex flex-col h-full"
                    >
                      <TiltCard>
                        <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden hover:border-white/20 transition-colors h-full flex flex-col">
                          <div className="relative aspect-[4/3] bg-zinc-900 border-b border-white/10 overflow-hidden shrink-0">
                            <img
                              src={project.img}
                              alt={project.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            <div className="absolute top-4 left-4">
                              <span className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/10 inline-flex items-center gap-2">
                                <FolderOpen size={12} /> {project.category}
                              </span>
                            </div>

                            <div className="absolute top-4 right-4">
                              <span
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md ${
                                  String(project.status).toLowerCase() === "live"
                                    ? "bg-green-500/15 text-green-300 border-green-500/30"
                                    : "bg-black/60 text-zinc-200 border-white/10"
                                }`}
                              >
                                {project.status}
                              </span>
                            </div>

                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                              <a
                                href={project.links?.repo || "#"}
                                target="_blank"
                                rel="noreferrer"
                                aria-disabled={repoDisabled}
                                className={`w-12 h-12 rounded-full inline-flex items-center justify-center border transition-colors ${
                                  repoDisabled
                                    ? "border-white/10 bg-white/5 text-white/30 pointer-events-none"
                                    : "border-white/10 bg-white text-black hover:bg-zinc-200"
                                }`}
                                title="View Code"
                              >
                                <Github size={20} />
                              </a>

                              <a
                                href={project.links?.live || "#"}
                                target="_blank"
                                rel="noreferrer"
                                aria-disabled={liveDisabled}
                                className={`w-12 h-12 rounded-full inline-flex items-center justify-center border transition-colors ${
                                  liveDisabled
                                    ? "border-white/10 bg-white/5 text-white/30 pointer-events-none"
                                    : "border-white/10 bg-white text-black hover:bg-zinc-200"
                                }`}
                                title="Live Demo"
                              >
                                <ExternalLink size={20} />
                              </a>
                            </div>
                          </div>

                          <div className="p-7 flex flex-col flex-grow">
                            <h3 className="text-white font-bold text-xl mb-2 group-hover:text-green-400 transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-zinc-400 font-light leading-relaxed text-sm mb-5 flex-grow">{project.desc}</p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                              {(project.tech || []).slice(0, 5).map((t, idx) => (
                                <span
                                  key={`${project.id}-${t}-${idx}`}
                                  className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-300"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
              <motion.div
                variants={fadeUpV}
                className="mt-12 rounded-3xl border border-white/10 bg-[#0a0a0a] p-10 text-center"
              >
                <Zap size={40} className="text-green-500 mx-auto mb-4" />
                <p className="text-zinc-300 font-semibold">No projects found.</p>
                <p className="text-zinc-500 text-sm mt-2">Try changing category or search keyword.</p>
              </motion.div>
            )}
          </motion.div>
        </section>

        <div id="faq">
          <FAQSection />
        </div>

        <TestimonialsSection />

        {/* CTA */}
        <section className={`${sectionWrap} pb-24`}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45 }}
            className="rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-10 md:p-16 text-center hover:border-white/20 transition-colors"
          >
            <h3 className="text-white font-black leading-tight text-[2rem] sm:text-[2.4rem] md:text-[3.2rem]">
              Want a project like this?
              <br />
              <span className="text-green-500">Let’s build it.</span>
            </h3>

            <p className="text-zinc-400 font-light leading-relaxed mt-4 max-w-[640px] mx-auto">
              Share your requirements and I’ll suggest the best UI + tech approach with a clear timeline.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-full bg-white text-black px-9 py-3.5 text-[15px] font-bold hover:bg-zinc-200 transition-colors"
                >
                  Start a conversation <Mail size={18} />
                </motion.button>
              </a>

              <a href="/about">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-9 py-3.5 text-[15px] font-semibold text-white hover:bg-white/10 transition-colors"
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