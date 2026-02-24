import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Camera,
  CheckCircle2,
  ChevronUp,
  Code,
  Coffee,
  Download,
  Gamepad2,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";

import aboutImage from "../assets/about.jpeg"; // make sure path is correct

// ---------- THEME UTILS (same as Home.jsx style) ----------
const sectionWrap = "w-full max-w-[1200px] mx-auto px-5";
const sectionPad = "py-20 md:py-24";

const containerV = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUpV = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 18 } },
};

// ---------- DATA (edit anytime) ----------
const statsData = [
  { label: "Years of practice", value: "05+" },
  { label: "Projects built", value: "50+" },
  { label: "Core focus", value: "MERN" },
  { label: "Availability", value: "Open" },
];

const principles = [
  { icon: <Layers size={22} />, title: "Design systems", desc: "Reusable components + consistent UI language for fast iteration." },
  { icon: <Zap size={22} />, title: "Performance mindset", desc: "Fast loading, clean rendering, and smooth micro-interactions." },
  { icon: <Search size={22} />, title: "Problem first", desc: "I start with user goals, then choose the right tech & architecture." },
];

const caseStudy = {
  name: "JAGAT EDU CRM",
  role: "Dashboard • MERN",
  summary: "A CRM-style dashboard focused on clarity, speed, and clean role-based navigation.",
  bullets: [
    "Component-based UI with reusable cards and sections",
    "Fast filtering + clean information hierarchy",
    "Responsive layout for laptop + tablet",
  ],
  metrics: [
    { label: "Pages", value: "12+" },
    { label: "Core modules", value: "05" },
    { label: "UI components", value: "40+" },
  ],
};

const toolbox = [
  { icon: <Layers size={18} className="text-green-400" />, title: "Design", desc: "Figma, wireframes, UI system, responsive rules." },
  { icon: <Code size={18} className="text-green-400" />, title: "Build", desc: "React components, state, animations, clean structure." },
  { icon: <Briefcase size={18} className="text-green-400" />, title: "Deliver", desc: "Deployment, documentation, and handoff support." },
];

const skillsData = [
  {
    category: "Frontend Power",
    items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Redux Toolkit", "Three.js (Basics)"],
  },
  {
    category: "Backend & DB",
    items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase Auth", "Supabase"],
  },
  { category: "Design Tools", items: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Prototyping"] },
  { category: "DevOps & Tools", items: ["Git/GitHub", "Docker", "AWS (EC2)", "Vercel CI/CD", "Postman"] },
];

const processData = [
  { icon: <Search size={22} />, title: "Discovery", desc: "Requirements, research, constraints, success metrics." },
  { icon: <Layers size={22} />, title: "Design", desc: "Wireframes, UI system, responsive layout & flows." },
  { icon: <Code size={22} />, title: "Development", desc: "Clean components, scalable structure, testing mindset." },
  { icon: <Zap size={22} />, title: "Launch", desc: "Deploy, optimize, fix edge cases, iterate with feedback." },
];

const experienceData = [
  {
    year: "2024 - Present",
    role: "Senior Web Developer",
    company: "Freelance / Agency",
    desc: "Leading web projects, managing clients, and building scalable full-stack apps.",
  },
  {
    year: "2022 - 2023",
    role: "Frontend Developer",
    company: "Tech Startup",
    desc: "Built responsive UI components, implemented dark mode systems, improved Core Web Vitals.",
  },
  {
    year: "2021 - 2022",
    role: "Junior Web Designer",
    company: "Creative Studio",
    desc: "Wireframes, branding basics, and pixel-perfect HTML/CSS from design files.",
  },
];

const educationData = [
  {
    year: "2023–2026",
    title: "BCA",
    org: "RBS College, Agra",
    desc: "Web technologies, DBMS, data structures, practical projects.",
  },
  {
    year: "2022",
    title: "Full Stack Bootcamp",
    org: "Online Certification",
    desc: "Modern JavaScript + React + Node + MongoDB intensive practice.",
  },
];

const achievements = [
  { year: "2026", title: "Portfolio v2 Launch", org: "Personal", desc: "Redesigned UI, improved responsiveness, added motion system." },
  { year: "2025", title: "MERN Practice Projects", org: "Self", desc: "Auth, CRUD, dashboards, API integration practice." },
  { year: "2024", title: "Frontend Milestone", org: "Learning", desc: "Reusable components, Tailwind system, UI patterns." },
];

const nowItems = [
  { icon: <Code size={18} className="text-green-400" />, title: "Building", desc: "Reusable UI components + animation patterns for projects." },
  { icon: <Zap size={18} className="text-green-400" />, title: "Learning", desc: "Advanced React patterns + backend best practices." },
  { icon: <Globe size={18} className="text-green-400" />, title: "Goal", desc: "Frontend/Full‑stack role where I can ship real products." },
];

const hobbiesData = [
  { icon: <Camera size={18} />, text: "Photography" },
  { icon: <Gamepad2 size={18} />, text: "Gaming" },
  { icon: <Coffee size={18} />, text: "Coffee enthusiast" },
  { icon: <Globe size={18} />, text: "Traveling" },
];

// ---------- SMALL COMPONENTS ----------
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

  useEffect(() => {
    if (reduce) return;
    const unsub = scrollY.on("change", (v) => setShow(v > 800));
    return () => unsub();
  }, [scrollY, reduce]);

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

const TiltCard = ({ children, className = "" }) => {
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
        reduce ? undefined : { perspective: 1000, rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};

const CountUpText = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const str = String(value);
  const num = Number.parseInt(str.replace(/[^\d]/g, ""), 10);
  const suffix = str.replace(/[\d]/g, "");
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || !Number.isFinite(num) || num === 0) return;
    const controls = animate(0, num, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, num]);

  return (
    <span ref={ref}>
      {!Number.isFinite(num) || num === 0 ? str : display}
      {!Number.isFinite(num) || num === 0 ? "" : suffix}
    </span>
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

const TimelineBlock = ({ icon, title, items }) => (
  <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-white/20 transition-colors">
    <div className="flex items-center gap-3 mb-8 text-white">
      <div className="p-3 rounded-xl bg-white/5 border border-white/10">{icon}</div>
      <h3 className="text-2xl font-bold">{title}</h3>
    </div>
    <div className="space-y-8 border-l border-white/10 ml-4">
      {items.map((x, i) => (
        <div key={i} className="relative pl-6">
          <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-green-500" />
          <div className="text-zinc-500 text-[12px] font-bold tracking-[2px] uppercase mb-1">{x.year}</div>
          <div className="text-white font-semibold text-lg">{x.role || x.title}</div>
          <div className="text-zinc-400 text-sm mb-2">{x.company || x.org}</div>
          <div className="text-zinc-500 font-light leading-relaxed">{x.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

// ---------- SECTIONS ----------
const AboutHero = () => {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.3 });

  const orb1x = useTransform(sx, [-0.5, 0.5], [-30, 30]);
  const orb1y = useTransform(sy, [-0.5, 0.5], [-22, 22]);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  return (
    <section onMouseMove={onMove} className={`${sectionWrap} min-h-[72vh] pt-[110px] pb-[70px] relative overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={reduce ? undefined : { x: orb1x, y: orb1y }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-green-500/10 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_55%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 grid gap-10 lg:grid-cols-[1fr_420px] items-center"
      >
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-3 rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2.5 text-[12px] font-medium tracking-widest text-green-400 mb-7">
            WHO I AM
          </div>

          <h1 className="text-white font-extrabold leading-[1.05] tracking-tight text-[clamp(2.6rem,6vw,4.7rem)]">
            More than just
            <br />
            <span className="text-zinc-400">pixels & code.</span>
          </h1>

          <p className="mt-5 max-w-[680px] mx-auto lg:mx-0 text-zinc-400 font-light leading-relaxed text-[1.02rem] md:text-[1.15rem]">
            I’m Bhupendra Verma — I build modern, responsive web experiences with clean UI and solid engineering.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full bg-green-500 text-black px-7 py-3.5 text-[15px] font-bold hover:bg-green-400 transition-colors"
              >
                Let’s Talk <ArrowRight size={18} />
              </motion.button>
            </Link>

            <a href="/resume.pdf" target="_blank" rel="noreferrer">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-7 py-3.5 text-[15px] font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <Download size={18} /> Download CV
              </motion.button>
            </a>
          </div>

          <div className="mt-7 flex items-center justify-center lg:justify-start gap-2 text-zinc-400 text-sm">
            <MapPin size={16} className="text-green-500" /> Agra, Uttar Pradesh
          </div>
        </div>

        <TiltCard>
          <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-5">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
              <motion.img
                src={aboutImage}
                alt="Bhupendra Verma"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale"
                whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </section>
  );
};

const StatsSection = () => (
  <section className={`${sectionWrap} -mt-6 pb-10`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {statsData.map((s, i) => (
          <motion.div
            key={i}
            variants={fadeUpV}
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-7 md:p-8 text-center flex flex-col justify-center items-center"
          >
            <div className="text-[2.2rem] md:text-[2.6rem] font-black text-white mb-2">
              <CountUpText value={s.value} />
            </div>
            <div className="text-zinc-500 text-[11px] md:text-[12px] font-bold uppercase tracking-[2px]">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

const StorySection = () => (
  <section className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <SectionHeading kicker="STORY" title="My approach & mindset" />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
        <motion.div variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 md:p-10">
          <p className="text-zinc-400 font-light leading-relaxed text-[1rem] md:text-[1.08rem]">
            I care about clean UX, readable code, and scalable structure. I keep things simple for the user,
            while making the system reliable for future changes.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Mobile-first responsive UI",
              "Reusable components & clean structure",
              "Smooth animations (not heavy)",
              "Performance + accessibility focus",
            ].map((t, idx) => (
              <div key={idx} className="flex items-start gap-3 text-zinc-300">
                <CheckCircle2 size={20} className="text-green-500 mt-0.5 shrink-0" />
                <span className="font-medium text-[15px]">{t}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
          <div className="text-white font-bold text-xl mb-6 flex items-center gap-2">
            <Code size={18} className="text-green-500" /> Beyond the code
          </div>
          <div className="flex flex-wrap gap-3">
            {hobbiesData.map((h, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-zinc-300"
              >
                <span className="text-green-400">{h.icon}</span> {h.text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

const PrinciplesSection = () => (
  <section className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <SectionHeading kicker="VALUES" title="What you can expect" align="center" />

      <div className="grid gap-6 md:grid-cols-3">
        {principles.map((p, i) => (
          <TiltCard key={i}>
            <motion.div
              variants={fadeUpV}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-green-500/40 transition-colors"
            >
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-white/10 bg-white/5 text-green-400">
                {p.icon}
              </div>
              <h3 className="text-white font-bold text-xl mb-2">{p.title}</h3>
              <p className="text-zinc-400 font-light leading-relaxed">{p.desc}</p>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </motion.div>
  </section>
);

const CaseStudySection = () => (
  <section className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <SectionHeading kicker="CASE STUDY" title="Featured work (deep dive)" />

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] items-start">
        <motion.div variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 md:p-10">
          <div className="text-zinc-500 text-xs font-bold tracking-[3px] uppercase">{caseStudy.role}</div>
          <h3 className="text-white font-black text-2xl md:text-3xl mt-2">{caseStudy.name}</h3>
          <p className="text-zinc-400 font-light leading-relaxed mt-4">{caseStudy.summary}</p>

          <div className="mt-7 grid gap-3">
            {caseStudy.bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-3 text-zinc-300">
                <CheckCircle2 size={20} className="text-green-500 mt-0.5 shrink-0" />
                <span className="font-medium">{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full bg-white text-black px-7 py-3.5 text-[14px] font-bold hover:bg-zinc-200 transition-colors"
              >
                View all projects <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Hire me <Mail size={18} />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div variants={fadeUpV} className="grid gap-4">
          {caseStudy.metrics.map((m, i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-7 text-center">
              <div className="text-white font-black text-3xl">{m.value}</div>
              <div className="text-zinc-500 text-xs font-bold tracking-[2px] uppercase mt-2">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  </section>
);

const ToolboxSection = () => (
  <section className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <SectionHeading kicker="TOOLBOX" title="How I ship quality work" align="center" />

      <div className="grid gap-6 md:grid-cols-3">
        {toolbox.map((t, i) => (
          <TiltCard key={i}>
            <motion.div
              variants={fadeUpV}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-green-500/40 transition-colors"
            >
              <div className="mb-5 inline-flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-white/10 bg-white/5">
                  {t.icon}
                </span>
                <div className="text-white font-bold text-lg">{t.title}</div>
              </div>
              <p className="text-zinc-400 font-light leading-relaxed">{t.desc}</p>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </motion.div>
  </section>
);

const SkillsSection = () => {
  const tabs = useMemo(() => skillsData.map((s) => s.category), []);
  const [active, setActive] = useState(tabs[0]);

  const activeGroup = useMemo(() => skillsData.find((s) => s.category === active), [active]);

  return (
    <section className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <SectionHeading kicker="STACK" title="Tech stack & skills" />

        <motion.div variants={fadeUpV} className="flex flex-wrap gap-2 md:gap-3 mb-7">
          {tabs.map((t) => {
            const isActive = t === active;
            return (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  isActive
                    ? "border-green-500/50 bg-green-500/10 text-green-300"
                    : "border-white/10 bg-[#0a0a0a] text-zinc-300 hover:bg-white/5"
                }`}
              >
                {t}
              </button>
            );
          })}
        </motion.div>

        <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-white font-bold text-xl mb-6">{activeGroup?.category}</div>
              <div className="flex flex-wrap gap-3">
                {activeGroup?.items?.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-zinc-300 hover:border-green-500/40 hover:text-white transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

const ProcessSection = () => (
  <section className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <SectionHeading kicker="WORKFLOW" title="How I work" align="center" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {processData.map((p, i) => (
          <TiltCard key={i}>
            <motion.div
              variants={fadeUpV}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-white/10 bg-white/5 text-green-400">
                  {p.icon}
                </div>
                <div className="text-[12px] font-black tracking-[3px] text-green-500">
                  STEP {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-zinc-400 font-light leading-relaxed">{p.desc}</p>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </motion.div>
  </section>
);

const AchievementsSection = () => (
  <section className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <SectionHeading kicker="PROOF" title="Achievements & milestones" />

      <motion.div variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 md:p-10">
        <div className="space-y-8 border-l border-white/10 ml-4">
          {achievements.map((x, i) => (
            <div key={i} className="relative pl-6">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-green-500" />
              <div className="text-zinc-500 text-[12px] font-bold tracking-[2px] uppercase mb-1">{x.year}</div>
              <div className="text-white font-semibold text-lg">{x.title}</div>
              <div className="text-zinc-400 text-sm mb-2">{x.org}</div>
              <div className="text-zinc-500 font-light leading-relaxed">{x.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <Download size={18} /> Download resume
            </motion.button>
          </a>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

const JourneySection = () => (
  <section className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <SectionHeading kicker="JOURNEY" title="Experience & education" />

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={fadeUpV}>
          <TimelineBlock icon={<Briefcase size={20} />} title="Experience" items={experienceData} />
        </motion.div>
        <motion.div variants={fadeUpV}>
          <TimelineBlock icon={<GraduationCap size={20} />} title="Education" items={educationData} />
        </motion.div>
      </div>
    </motion.div>
  </section>
);

const NowSection = () => (
  <section className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <SectionHeading kicker="NOW" title="What I’m doing currently" align="center" />

      <div className="grid gap-6 md:grid-cols-3">
        {nowItems.map((n, i) => (
          <motion.div key={i} variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-white/10 bg-white/5 mb-5">
              {n.icon}
            </div>
            <div className="text-white font-bold text-lg">{n.title}</div>
            <p className="text-zinc-400 font-light leading-relaxed mt-2">{n.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

const CTASection = () => (
  <section className={`${sectionWrap} ${sectionPad}`}>
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
      className="rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-10 md:p-16 text-center hover:border-white/20 transition-colors"
    >
      <h3 className="text-white font-black leading-tight text-[2rem] sm:text-[2.4rem] md:text-[3.2rem]">
        Want to build something
        <br />
        <span className="text-green-500">modern & fast?</span>
      </h3>
      <p className="text-zinc-400 font-light leading-relaxed mt-4 max-w-[600px] mx-auto">
        Share your idea and I’ll propose a clean plan, timeline, and the best approach for your project.
      </p>

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Link to="/contact">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-9 py-3.5 text-[15px] font-bold hover:bg-zinc-200 transition-colors"
          >
            <Mail size={18} /> Start a conversation
          </motion.button>
        </Link>

        <Link to="/projects">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-9 py-3.5 text-[15px] font-semibold text-white hover:bg-white/10 transition-colors"
          >
            View projects <ArrowRight size={18} />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  </section>
);

// ---------- MAIN ----------
const About = () => {
  return (
    <MotionConfig transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-green-500/30">
        <ScrollProgress />
        <BackToTop />

        <AboutHero />
        <StatsSection />
        <StorySection />
        <PrinciplesSection />
        <CaseStudySection />
        <ToolboxSection />
        <SkillsSection />
        <ProcessSection />
        <AchievementsSection />
        <JourneySection />
        <NowSection />
        <CTASection />
      </div>
    </MotionConfig>
  );
};

export default About;
