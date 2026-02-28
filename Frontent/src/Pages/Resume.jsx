import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, MotionConfig, useScroll, useSpring } from "framer-motion";
import {
  Download,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Terminal,
  Cpu,
  CheckCircle2,
  Star,
  User,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Globe,
} from "lucide-react";

// -------------------- THEME UTILS --------------------
const sectionWrap = "w-full max-w-[1200px] mx-auto px-5";
const sectionPad = "py-20 md:py-24";

const containerV = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const fadeUpV = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const SectionHeading = ({ kicker, title, subtitle, align = "left" }) => (
  <motion.div variants={fadeUpV} className={align === "center" ? "text-center mb-14 md:mb-16" : "mb-14 md:mb-16"}>
    <div className={`inline-flex items-center gap-2 mb-3 ${align === "center" ? "justify-center" : ""}`}>
      <Sparkles size={16} className="text-green-500" />
      <span className="text-[12px] md:text-[13px] font-bold uppercase tracking-[4px] text-green-500">{kicker}</span>
    </div>
    <h2 className="text-[2.2rem] md:text-[3rem] font-bold leading-tight text-white">{title}</h2>
    {subtitle && (
      <p className={`mt-4 text-zinc-400 font-light text-[1.05rem] ${align === "center" ? "max-w-[760px] mx-auto" : "max-w-[760px]"}`}>
        {subtitle}
      </p>
    )}
  </motion.div>
);

const Pill = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-300">
    {children}
  </span>
);

async function copyTextSmart(text) {
  // Clipboard API is best on secure contexts; fallback to execCommand.
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.top = "-9999px";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(ta);
  return ok;
}

const CopyChip = ({ value, label = "Copy" }) => {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  const onCopy = async () => {
    try {
      setFailed(false);
      const ok = await copyTextSmart(value);
      if (!ok) setFailed(true);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setFailed(true);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10 transition-colors"
      title={value}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2">
            <Check size={16} className={failed ? "text-red-400" : "text-green-400"} />
            {failed ? "Copy failed" : "Copied"}
          </motion.span>
        ) : (
          <motion.span key="copy" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2">
            <Copy size={16} className="text-zinc-300" /> {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

// -------------------- DATA (PROFESSIONAL) --------------------
const PROFILE = {
  name: "Bhupendra Verma",
  title: "Frontend / Full‑Stack Developer",
  location: "Delhi, India",
  email: "Bhupendra8171121943@gmail.com",
  phone: "+91 8171121943",
  resumeUrl: "https://jagatverma142.github.io/Bhupendra_verma/resume.pdf",
  github: "", // update if needed
  linkedin: "https://www.linkedin.com/", // update
  summary:
    "I build responsive, modern web interfaces and practical business websites. I focus on clean UI, performance-first structure, and maintainable code.",
  focus: ["React UI", "Tailwind UI systems", "Framer Motion UX", "MERN/Django projects", "Client websites"],
};

const experienceData = [
  {
    role: "Web Developer",
    company: "Freelance / Client Work",
    period: "2024 - Present",
    desc: "Building responsive websites and web experiences for small businesses and clients.",
    tasks: [
      "Created modern UI sections (Hero, Services, FAQ, CTA) with reusable components.",
      "Improved performance using clean component structure, lazy loading, and optimized assets.",
      "Deployed and supported live websites (updates, fixes, responsive improvements).",
    ],
    tags: ["Client Work", "Responsive UI", "Deployment"],
  },
  {
    role: "Frontend Developer (Projects)",
    company: "Self-driven / Portfolio",
    period: "2023 - 2024",
    desc: "Focused on building React projects, animations, and structured pages.",
    tasks: [
      "Converted UI ideas into React components with clean layout and consistent style.",
      "Built multi-section pages with animations and smooth UX using Framer Motion.",
      "Practiced API integration and form patterns for real-world flows.",
    ],
    tags: ["React", "Framer Motion", "UI System"],
  },
];

const educationData = [
  {
    degree: "BCA (Bachelor of Computer Applications)",
    school: "RBS College, Agra",
    year: "2020 - 2023",
    desc: "Focused on programming fundamentals, web development, and practical projects.",
  },
  {
    degree: "Full‑Stack Learning Track",
    school: "Online (Udemy/Coursera/Docs)",
    year: "2024 - 2025",
    desc: "Hands-on learning: React, styling systems, backend basics, deployments.",
  },
];

const skills = {
  technical: [
    "React.js",
    "Vite",
    "Tailwind CSS",
    "Framer Motion",
    "JavaScript",
    "HTML/CSS",
    "Git & GitHub",
    "Django (projects)",
    "REST APIs",
    "Figma (basic)",
    "SEO basics",
    "Responsive Design",
  ],
  soft: [
    "Client communication",
    "Problem solving",
    "Time management",
    "Ownership mindset",
    "Attention to detail",
    "Collaboration",
    "Adaptability",
  ],
};

const skillFocusBars = [
  { name: "React UI", level: 85 },
  { name: "Responsive design", level: 90 },
  { name: "Animations (Framer Motion)", level: 78 },
  { name: "SEO / Performance basics", level: 70 },
];

const certifications = [
  { title: "React / Frontend Learning", org: "Online", year: "2024-2025", note: "Projects + practice-based learning." },
  { title: "Web Development Track", org: "Self Learning", year: "2023-2024", note: "HTML/CSS/JS + modern UI patterns." },
];

const achievements = [
  "Built and deployed multiple live client websites and portfolio projects.",
  "Comfortable with converting designs to responsive UI sections.",
  "Strong at organizing multi-section pages and consistent styling.",
];

const languages = ["Hindi (Native)", "English (Professional)"];

const projectsPreview = [
  {
    title: "Jagat‑Education",
    desc: "Responsive educational landing + course sections.",
    tech: ["React", "Vite", "Responsive UI"],
    live: "https://jagatverma142.github.io/Jagateducation/",
    repo: "#",
  },
  {
    title: "Jagat‑Med Health Portal",
    desc: "Clean medical UI with modern layout and deployment.",
    tech: ["React", "Tailwind", "Gh‑Pages"],
    live: "https://jagatverma142.github.io/jagat_med_web/",
    repo: "#",
  },
  {
    title: "Digital Agency (Portfolio)",
    desc: "Agency-style layout with sections and smooth UI.",
    tech: ["React", "Tailwind", "Animations"],
    live: "https://jagatverma142.github.io/Digital_Agency/",
    repo: "#",
  },
];

// -------------------- SECTIONS --------------------
const Hero = () => (
  <section className={`${sectionWrap} pt-[130px] pb-[50px] md:pb-[80px] relative overflow-hidden`}>
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-green-500/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 w-[520px] h-[520px] bg-white/5 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_55%)]" />
    </div>

    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="relative z-10">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[12px] font-bold tracking-widest uppercase mb-8">
          RESUME
        </div>

        <h1 className="text-[3rem] md:text-[5rem] font-black leading-[1.05] tracking-tight text-white">
          Professional
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Resume</span>
        </h1>

        <p className="mt-6 text-zinc-400 font-light text-lg md:text-xl max-w-[820px] mx-auto">
          {PROFILE.title} • {PROFILE.location}
        </p>

        <p className="mt-4 text-zinc-400 font-light max-w-[860px] mx-auto leading-relaxed">
          {PROFILE.summary}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">
            <button className="inline-flex items-center gap-2 rounded-full bg-green-500 text-black px-8 py-4 text-[15px] font-bold hover:bg-green-400 transition-colors">
              <Download size={18} /> Download / Open CV
            </button>
          </a>
          <a href="/contact">
            <button className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-4 text-[15px] font-semibold text-white hover:bg-white/10 transition-colors">
              Contact <ArrowRight size={18} />
            </button>
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {PROFILE.focus.map((x) => (
            <Pill key={x}>{x}</Pill>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

const QuickNav = () => {
  const items = [
    { id: "overview", label: "Overview" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "extras", label: "Extras" },
    { id: "contact", label: "Contact" },
  ];

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className={`${sectionWrap} pb-10`}>
      <motion.div variants={containerV} initial="hidden" animate="show" className="flex flex-wrap gap-2 justify-center">
        {items.map((x) => (
          <motion.button
            key={x.id}
            variants={fadeUpV}
            onClick={() => go(x.id)}
            className="px-4 py-2 rounded-full text-sm font-semibold border border-white/10 bg-[#0a0a0a] text-zinc-300 hover:bg-white/5 hover:border-white/20 transition-colors"
            type="button"
          >
            {x.label}
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};

const OverviewSection = () => {
  const stats = useMemo(
    () => [
      { label: "Role", value: "Frontend / Full‑Stack" },
      { label: "Location", value: PROFILE.location },
      { label: "Focus", value: "Responsive UI + Live sites" },
      { label: "Projects", value: `${projectsPreview.length}+` },
    ],
    []
  );

  return (
    <section id="overview" className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
        <SectionHeading
          kicker="OVERVIEW"
          title="Profile snapshot"
          subtitle="Quick, recruiter-friendly overview with key highlights."
        />

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-7">
              <div className="text-zinc-500 text-xs font-bold tracking-[2px] uppercase">{s.label}</div>
              <div className="text-white font-black text-[1.15rem] mt-2 leading-snug">{s.value}</div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUpV} className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 inline-flex items-center justify-center text-green-400">
                <Star size={18} />
              </div>
              <div className="text-white font-bold text-lg">Key achievements</div>
            </div>

            <ul className="mt-5 space-y-3">
              {achievements.map((a) => (
                <li key={a} className="flex items-start gap-3 text-zinc-300">
                  <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 inline-flex items-center justify-center text-green-400">
                <User size={18} />
              </div>
              <div className="text-white font-bold text-lg">Quick contact</div>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-zinc-500 text-xs font-bold tracking-[2px] uppercase">Email</div>
                <div className="mt-2 flex flex-wrap gap-3 items-center justify-between">
                  <a href={`mailto:${PROFILE.email}`} className="text-zinc-200 font-medium break-all hover:text-white transition-colors">
                    {PROFILE.email}
                  </a>
                  <CopyChip value={PROFILE.email} />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-zinc-500 text-xs font-bold tracking-[2px] uppercase">Phone</div>
                <div className="mt-2 flex flex-wrap gap-3 items-center justify-between">
                  <a href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`} className="text-zinc-200 font-medium hover:text-white transition-colors">
                    {PROFILE.phone}
                  </a>
                  <a href="/contact" className="text-green-400 hover:text-green-300 inline-flex items-center gap-2 font-medium">
                    Message <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-zinc-500 text-xs font-bold tracking-[2px] uppercase">Profiles</div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10 transition-colors">
                    <Terminal size={16} className="text-green-400" /> GitHub <ExternalLink size={14} className="text-zinc-500" />
                  </a>
                  <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10 transition-colors">
                    <Globe size={16} className="text-green-400" /> LinkedIn <ExternalLink size={14} className="text-zinc-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const ExperienceTimeline = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center start"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section id="experience" className={`${sectionWrap} ${sectionPad}`} ref={ref}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
        <SectionHeading kicker="EXPERIENCE" title="Work experience" subtitle="Timeline view with responsibilities and impact." />

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[14px] top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />
          <motion.div style={{ scaleY, transformOrigin: "top" }} className="absolute left-[14px] top-0 w-[2px] bottom-0 bg-green-500/70 rounded-full" />

          <div className="grid gap-6 pl-10">
            {experienceData.map((exp, i) => (
              <motion.div key={i} variants={fadeUpV} className="relative">
                <div className="absolute left-[-34px] top-7 w-6 h-6 rounded-full bg-[#030303] border border-green-500/40 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-white/20 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="text-white font-black text-xl">{exp.role}</div>
                      <div className="text-zinc-400 font-light mt-1">{exp.company}</div>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs text-zinc-300">
                      <Briefcase size={14} className="text-green-500" />
                      {exp.period}
                    </div>
                  </div>

                  <p className="text-zinc-400 font-light mt-4 leading-relaxed">{exp.desc}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {(exp.tags || []).map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>

                  <ul className="mt-6 space-y-3">
                    {exp.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-3 text-zinc-300">
                        <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const ProjectsSection = () => (
  <section id="projects" className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
      <SectionHeading kicker="PROJECTS" title="Selected work" align="center" subtitle="A few live examples. More projects are available on the Projects page." />

      <div className="grid gap-6 md:grid-cols-3">
        {projectsPreview.map((p) => (
          <motion.div key={p.title} variants={fadeUpV} className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between gap-3">
              <div className="text-white font-bold text-xl">{p.title}</div>
              <Code2 size={18} className="text-green-500" />
            </div>
            <p className="text-zinc-400 font-light mt-3 leading-relaxed text-sm">{p.desc}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-bold hover:bg-zinc-200 transition-colors">
                Live <ExternalLink size={16} />
              </a>
              <a href="/projects" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                View all <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

const SkillsSection = () => (
  <section id="skills" className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
      <SectionHeading kicker="SKILLS" title="Technical & soft skills" subtitle="Balanced skill set for client work and product-style UI development." />

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 inline-flex items-center justify-center text-green-400">
              <Cpu size={18} />
            </div>
            <div className="text-white font-bold text-lg">Technical</div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {skills.technical.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {skillFocusBars.map((x) => (
              <div key={x.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-300 font-medium">{x.name}</span>
                  <span className="text-zinc-500">{x.level}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-green-500/70" style={{ width: `${x.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 inline-flex items-center justify-center text-green-400">
              <User size={18} />
            </div>
            <div className="text-white font-bold text-lg">Soft skills</div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {skills.soft.map((s) => (
              <span key={s} className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-300 hover:border-green-500/30 transition-colors">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-6">
            <div className="text-white font-bold">Work style</div>
            <p className="text-zinc-400 font-light mt-2 leading-relaxed text-sm">
              I prefer clear requirements, consistent UI systems, and step-by-step delivery with quick feedback loops.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

const EducationAndExtras = () => (
  <section id="education" className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
      <SectionHeading kicker="EDUCATION" title="Education" subtitle="Academic background + continuous learning." />

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 inline-flex items-center justify-center text-green-400">
              <GraduationCap size={18} />
            </div>
            <div className="text-white font-bold text-lg">Education</div>
          </div>

          <div className="mt-6 space-y-4">
            {educationData.map((edu) => (
              <div key={edu.degree} className="rounded-2xl border border-white/10 bg-black/30 p-6 hover:bg-white/5 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-white font-bold">{edu.degree}</div>
                    <div className="text-zinc-400 font-light mt-1">{edu.school}</div>
                  </div>
                  <div className="text-zinc-500 text-sm font-medium">{edu.year}</div>
                </div>
                <p className="text-zinc-400 font-light mt-3 text-sm leading-relaxed">{edu.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 inline-flex items-center justify-center text-green-400">
              <Award size={18} />
            </div>
            <div className="text-white font-bold text-lg">Certifications & languages</div>
          </div>

          <div className="mt-6">
            <div className="text-zinc-500 text-xs font-bold tracking-[2px] uppercase">Certifications</div>
            <div className="mt-3 space-y-3">
              {certifications.map((c) => (
                <div key={c.title} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-white font-semibold">{c.title}</div>
                    <div className="text-zinc-500 text-sm">{c.year}</div>
                  </div>
                  <div className="text-zinc-400 font-light text-sm mt-1">{c.org}</div>
                  <div className="text-zinc-500 text-sm mt-2">{c.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="text-zinc-500 text-xs font-bold tracking-[2px] uppercase">Languages</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {languages.map((l) => (
                <Pill key={l}>{l}</Pill>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-6">
            <div className="flex items-center gap-2 text-zinc-300 font-semibold">
              <Terminal size={16} className="text-green-500" /> Learning mindset
            </div>
            <p className="text-zinc-400 font-light mt-2 leading-relaxed text-sm">
              I keep improving through building projects, refining UI patterns, and learning best practices.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

const ExtrasSection = () => (
  <section id="extras" className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
      <SectionHeading kicker="EXTRAS" title="What I bring" align="center" subtitle="Practical strengths that help in real client delivery." />

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-white/20 transition-colors">
          <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 inline-flex items-center justify-center text-green-400">
            <CheckCircle2 size={18} />
          </div>
          <div className="text-white font-bold text-lg mt-5">Clean UI delivery</div>
          <p className="text-zinc-400 font-light mt-2 text-sm leading-relaxed">
            Consistent spacing, readable typography, and responsive layout.
          </p>
        </motion.div>

        <motion.div variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-white/20 transition-colors">
          <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 inline-flex items-center justify-center text-green-400">
            <Code2 size={18} />
          </div>
          <div className="text-white font-bold text-lg mt-5">Reusable components</div>
          <p className="text-zinc-400 font-light mt-2 text-sm leading-relaxed">
            Section-based architecture for easy edits and scaling.
          </p>
        </motion.div>

        <motion.div variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-white/20 transition-colors">
          <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 inline-flex items-center justify-center text-green-400">
            <Star size={18} />
          </div>
          <div className="text-white font-bold text-lg mt-5">Client-friendly communication</div>
          <p className="text-zinc-400 font-light mt-2 text-sm leading-relaxed">
            Clear updates, scope confirmation, and quick iteration.
          </p>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

const FinalCTA = () => (
  <section id="contact" className={`${sectionWrap} pb-24`}>
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-[3rem] border border-white/10 bg-[#0a0a0a] p-12 md:p-20 text-center relative overflow-hidden hover:border-green-500/30 transition-colors"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-green-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        <h3 className="text-[2.2rem] md:text-[3.4rem] font-black text-white leading-tight">Want to hire / collaborate?</h3>
        <p className="text-zinc-400 font-light text-lg mt-4 max-w-[760px] mx-auto">
          Send requirements (pages + features + timeline). I’ll reply with a clean plan and estimate.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="/contact">
            <button className="inline-flex items-center gap-2 rounded-full bg-white text-black px-10 py-4 text-[15px] font-bold hover:bg-zinc-200 transition-colors">
              Contact <Mail size={18} />
            </button>
          </a>
          <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">
            <button className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-10 py-4 text-[15px] font-semibold text-white hover:bg-white/10 transition-colors">
              Open CV <ExternalLink size={18} />
            </button>
          </a>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-zinc-400">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2">
            <MapPin size={16} className="text-green-500" /> {PROFILE.location}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2">
            <Phone size={16} className="text-green-500" /> {PROFILE.phone}
          </span>
        </div>
      </div>
    </motion.div>

    <div className="text-center text-zinc-600 text-sm mt-10">
      © {new Date().getFullYear()} {PROFILE.name}. Built with React + Framer Motion.
    </div>
  </section>
);

// -------------------- MAIN COMPONENT --------------------
const Resume = () => {
  return (
    <MotionConfig transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-green-500/30 overflow-x-hidden">
        <Hero />
        <QuickNav />
        <OverviewSection />
        <ExperienceTimeline />
        <ProjectsSection />
        <SkillsSection />
        <EducationAndExtras />
        <ExtrasSection />
        <FinalCTA />
      </div>
    </MotionConfig>
  );
};

export default Resume;
