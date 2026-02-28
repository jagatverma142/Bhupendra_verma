import React, { useEffect, useMemo, useRef, useState } from "react";
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
  Check,
  CheckCircle2,
  Code,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  HelpCircle,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  MousePointer2,
  Palette,
  Quote,
  Sparkles,
  Star,
  Twitter,
  ChevronUp,
} from "lucide-react";

// Placeholder Profile Image
import homeimg from "../assets/profile.jpeg";
// ---------- 1. DATA ----------
const featuresData = [
  { icon: <Palette size={28} />, title: "Tailored Design", desc: "Unique brand identities that tell your specific story visually." },
  { icon: <MousePointer2 size={28} />, title: "User-Centric UX", desc: "Obsessed with intuitive user journeys and accessibility." },
  { icon: <Code size={28} />, title: "Modern Tech Stack", desc: "Fast, scalable, and secure solutions using React & Node." },
];

const projectsData = [
  { id: 1, title: "ONLINE COURSES", year: "2023", category: "Full Stack", img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop" },
  { id: 2, title: "EVENT APP", year: "2023", category: "Web App", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop" },
  { id: 3, title: "MAGAZINE UI", year: "2024", category: "Frontend", img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop" },
  { id: 4, title: "AGENCY PORTFOLIO", year: "2024", category: "UI/UX", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" },
  { id: 5, title: "CODE-CURRY", year: "2025", category: "MERN Stack", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop" },
  { id: 6, title: "JAGAT EDU CRM", year: "2025", category: "Dashboard", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" },
];

const servicesData = [
  { icon: <Layers size={32} />, title: "Web Design", desc: "Visually stunning layouts.", list: ["Figma Prototyping", "UI/UX Strategy", "Mobile-First Design"] },
  { icon: <Code size={32} />, title: "Development", desc: "Clean, efficient code.", list: ["React & Next.js", "Tailwind CSS", "SEO Optimized Architecture"] },
  { icon: <Palette size={32} />, title: "Backend API", desc: "Robust data handling.", list: ["Node.js & Express", "MongoDB Integration", "RESTful APIs"] },
];

const skillsData = [
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "JavaScript (ES6+)",
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Git/GitHub",
  "Framer Motion",
  "Figma",
  "REST APIs",
];

const processData = [
  { title: "Discover", desc: "Understanding requirements, target audience, and competitors." },
  { title: "Design", desc: "Creating wireframes, UI design systems, and planning." },
  { title: "Develop", desc: "Writing clean components and focusing on performance." },
  { title: "Launch", desc: "Deployment, final testing, and client handoff." },
];

const statsData = [
  { label: "Projects Delivered", value: "25+" },
  { label: "Tech Stack", value: "MERN" },
  { label: "Happy Clients", value: "15+" },
  { label: "Hours Coded", value: "1000+" },
];

const aboutHighlights = [
  "Pixel-perfect responsive UI (mobile-first)",
  "Reusable components + clean architecture",
  "Smooth animations with Framer Motion",
  "Basic SEO + performance optimizations",
];

const experienceData = [
  {
    year: "2024 - Present",
    title: "Freelance Full-Stack Developer",
    org: "Self-Employed",
    desc: "Building end-to-end MERN stack web applications for local businesses and international clients.",
  },
  {
    year: "2023 - 2024",
    title: "Frontend Web Developer",
    org: "Techvera Agency",
    desc: "Developed highly responsive landing pages and interactive dashboards using React.js and Tailwind CSS.",
  },
];

const educationData = [
  {
    year: "2023–2026",
    title: "Bachelor of Computer Applications",
    org: "RBS College, Agra",
    desc: "Core subjects: Data Structures, Algorithms, Web Technologies, Database Management.",
  },
  {
    year: "2022",
    title: "Full Stack Bootcamp",
    org: "Online Certification",
    desc: "Intensive 6-month bootcamp focusing on modern JavaScript, React, Node.js, and MongoDB.",
  },
];

const testimonialsData = [
  { name: "Anisha Verma", role: "Product Manager", text: "Bhupendra built our dashboard ahead of schedule. The code was clean, and the user interface is exactly what we dreamed of.", rating: 5 },
  { name: "Rahul Sharma", role: "Founder, Techvera", text: "A phenomenal developer to work with. He understands both design and logic, making development incredibly smooth.", rating: 5 },
  { name: "Kamal Kumar", role: "Business Owner", text: "My e-commerce website is fast, secure, and looks great on mobile phones. Traffic and sales have increased.", rating: 5 },
];

const pricingData = [
  { name: "Landing Page", price: "$499", desc: "Perfect for personal portfolios or small business showcases.", features: ["Single Page Design", "Responsive Layout", "Contact Form", "Basic SEO", "1 Week Delivery"], popular: false },
  { name: "Full Website", price: "$999", desc: "Ideal for growing businesses needing multiple pages and CMS.", features: ["Up to 5 Pages", "Custom UI/UX Design", "Content Management System", "Advanced SEO", "Animations"], popular: true },
  { name: "Custom Web App", price: "Custom", desc: "For complex platforms requiring specific backend functionalities.", features: ["Full Stack MERN App", "User Authentication", "Database Architecture", "Payment Integration", "Ongoing Support"], popular: false },
];

const faqData = [
  { q: "What tech stack do you primarily use?", a: "I specialize in the MERN stack: MongoDB, Express.js, React.js, and Node.js. For styling, I use Tailwind CSS." },
  { q: "Do you provide website maintenance after launch?", a: "Yes, I offer 1 month of free bug-fixing and support after launch. Extended maintenance is also available." },
  { q: "Do you design the websites as well?", a: "Yes! I provide UI/UX design services using Figma before we start writing any code." },
  { q: "How long does a typical project take?", a: "A basic landing page takes about 1 week. A full 5-page business website takes 2-3 weeks." },
];

const socialLinks = [
  { label: "GitHub", icon: <Github size={18} />, href: "https://github.com/" },
  { label: "LinkedIn", icon: <Linkedin size={18} />, href: "https://www.linkedin.com/" },
  { label: "Instagram", icon: <Instagram size={18} />, href: "https://www.instagram.com/" },
  { label: "Twitter", icon: <Twitter size={18} />, href: "https://x.com/" },
];

// ---------- 2) LAYOUT UTILS ----------
const sectionWrap = "w-full max-w-[1200px] mx-auto px-5";
const sectionPad = "py-20 md:py-24";

const containerV = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.10 } },
};

const fadeUpV = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 18 } },
};

// ---------- 3) REUSABLE UI/MOTION ----------
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
      style={reduce ? undefined : { rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
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
      duration: 1.4,
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
    <h2 className="text-[2.1rem] sm:text-[2.4rem] md:text-[3rem] font-bold leading-tight text-white">
      {title}
    </h2>
  </motion.div>
);

// ---------- 4) SECTIONS ----------
const HeroSection = () => {
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.3 });

  const orb1x = useTransform(sx, [-0.5, 0.5], [-36, 36]);
  const orb1y = useTransform(sy, [-0.5, 0.5], [-26, 26]);
  const orb2x = useTransform(sx, [-0.5, 0.5], [32, -32]);
  const orb2y = useTransform(sy, [-0.5, 0.5], [22, -22]);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  return (
    <section
      onMouseMove={onMove}
      className={`${sectionWrap} min-h-[92vh] flex flex-col items-center justify-center text-center pt-[110px] pb-[60px] relative overflow-hidden`}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={reduce ? undefined : { x: orb1x, y: orb1y }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-24 w-[440px] h-[440px] bg-green-500/10 rounded-full blur-[110px]"
        />
        <motion.div
          style={reduce ? undefined : { x: orb2x, y: orb2y }}
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -right-24 w-[520px] h-[520px] bg-white/5 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_55%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 inline-flex items-center gap-3 rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2.5 text-[12px] font-medium tracking-widest text-green-400 mb-8"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
        AVAILABLE FOR FREELANCE
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="relative z-10 mb-6 font-extrabold leading-[1.05] tracking-tight text-[clamp(3.2rem,9.8vw,7.2rem)] text-white"
      >
        BHUPENDRA
        <br />
        <span className="text-zinc-400">VERMA</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18, duration: 0.7 }}
        className="relative z-10 mx-auto mb-12 max-w-[680px] text-[1.02rem] sm:text-[1.1rem] md:text-[1.25rem] leading-relaxed text-zinc-400 font-light"
      >
        Crafting digital experiences that seamlessly blend{" "}
        <span className="text-white font-medium">artistry</span> with{" "}
        <span className="text-green-400 font-medium">cutting-edge tech</span>.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.55 }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-6 w-full max-md:flex-col"
      >
        <a href="#projects" className="max-md:w-full">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-green-500 text-black px-8 py-4 text-[16px] font-bold hover:bg-green-400 transition-colors"
          >
            View My Work <ArrowRight size={18} />
          </motion.button>
        </a>

        <a href="#contact" className="max-md:w-full">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-8 py-4 text-[16px] font-medium text-white hover:bg-white/10 transition-colors"
          >
            Let's Talk
          </motion.button>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="relative z-10 mt-12 flex items-center justify-center gap-4"
      >
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/10 transition-colors text-white/70 hover:text-white"
            aria-label={s.label}
            title={s.label}
          >
            {s.icon}
          </a>
        ))}
      </motion.div>
    </section>
  );
};

const WhyWorkSection = () => (
  <section className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <SectionHeading kicker="EXPERTISE" title="Why Work with Me" />
      <div className="grid gap-6 md:grid-cols-3">
        {featuresData.map((f, i) => (
          <TiltCard key={i} className="group">
            <motion.div
              variants={fadeUpV}
              whileHover={{ y: -6 }}
              className="flex flex-col rounded-3xl border border-white/10 bg-[#0a0a0a] p-10 hover:border-green-500/50 transition-colors"
            >
              <div className="mb-6 p-3 bg-white/5 rounded-2xl w-fit text-green-500 border border-white/10">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{f.title}</h3>
              <p className="text-zinc-400 leading-relaxed font-light">{f.desc}</p>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </motion.div>
  </section>
);

const StatsSection = () => (
  <section className={`${sectionWrap} py-10`}>
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

const AboutSection = () => (
  <section className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <SectionHeading kicker="ABOUT" title="A little about me" />
      <div className="grid gap-10 lg:grid-cols-[400px_1fr] items-start">
        <motion.div variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
            <motion.img
              src={homeimg}
              alt="Bhupendra Verma"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover "
              whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <div className="mt-5 flex items-center gap-2 text-zinc-400 font-medium text-sm px-2">
            <MapPin size={16} className="text-green-500" /> Agra, Uttar Pradesh
          </div>
        </motion.div>

        <motion.div variants={fadeUpV} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 md:p-10 h-full flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            I build clean UIs and fast web apps.
          </h3>
          <p className="text-zinc-400 font-light leading-relaxed mb-8 text-[1rem] md:text-lg">
            I’m a MERN-focused developer who enjoys crafting modern, responsive interfaces and shipping reliable features.
            My priority is smooth UX, readable code, and performance.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-10">
            {aboutHighlights.map((h, idx) => (
              <div key={idx} className="flex items-start gap-3 text-zinc-300">
                <CheckCircle2 size={20} className="text-green-500 mt-0.5 shrink-0" />
                <span className="font-medium text-[15px]">{h}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-auto">
            <a href="#contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-3.5 text-[15px] font-bold hover:bg-zinc-200 transition-colors"
              >
                Let’s Work <ArrowRight size={18} />
              </motion.button>
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-3.5 text-[15px] font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <Download size={18} /> Download CV
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

const ServicesSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <SectionHeading kicker="SERVICES" title="What I Offer" />

        <div className="grid gap-6 lg:grid-cols-3">
          {servicesData.map((s, i) => {
            const isActive = active === i;

            return (
              <motion.button
                key={i}
                variants={fadeUpV}
                whileHover={{ y: -4 }}
                onClick={() => setActive(i)}
                className={`text-left flex flex-col rounded-3xl p-8 transition-colors border ${
                  isActive ? "bg-white/10 border-white/30" : "bg-[#0a0a0a] border-white/10 hover:border-white/20"
                }`}
              >
                <div
                  className={`mb-6 p-3 rounded-2xl w-fit border ${
                    isActive ? "border-green-500/50 bg-green-500/10 text-green-400" : "border-white/10 bg-white/5 text-white"
                  }`}
                >
                  {s.icon}
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white flex justify-between items-center w-full">
                  {s.title}
                  <div
                    className={`h-2 w-2 rounded-full transition-colors ${
                      isActive ? "bg-green-500 shadow-[0_0_10px_#22c55e]" : "bg-white/20"
                    }`}
                  />
                </h3>

                <p className="text-zinc-400 mb-6 font-light">{s.desc}</p>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.ul
                      key="list"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden space-y-3"
                    >
                      {s.list.map((item, k) => (
                        <li key={k} className="text-[15px] font-medium text-zinc-300 flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {item}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

const ProcessSection = () => (
  <section className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <SectionHeading kicker="PROCESS" title="How we’ll ship your project" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {processData.map((p, i) => (
          <TiltCard key={i} className="group">
            <motion.div
              variants={fadeUpV}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-white/20 transition-colors"
            >
              <div className="text-[12px] font-black tracking-[3px] text-green-500 mb-5">
                STEP {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
              <p className="text-zinc-400 font-light leading-relaxed">{p.desc}</p>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </motion.div>
  </section>
);

const ProjectsSection = () => {
  const categories = useMemo(() => {
    const set = new Set(projectsData.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const [activeCat, setActiveCat] = useState("All");
  const filtered = useMemo(
    () => (activeCat === "All" ? projectsData : projectsData.filter((p) => p.category === activeCat)),
    [activeCat]
  );

  return (
    <section id="projects" className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionHeading kicker="SELECTED WORK" title="Elevating Brands" align="left" />

          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map((c) => {
              const isActive = c === activeCat;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCat(c)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    isActive
                      ? "border-green-500/50 bg-green-500/10 text-green-300"
                      : "border-white/10 bg-[#0a0a0a] text-zinc-300 hover:bg-white/5"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                variants={fadeUpV}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: 14, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="group flex flex-col"
              >
                <TiltCard>
                  <div className="relative overflow-hidden rounded-3xl aspect-[4/3] mb-6 bg-zinc-900 border border-white/10">
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
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="bg-white text-black p-4 rounded-full"
                        aria-hidden="true"
                      >
                        <ExternalLink size={24} />
                      </motion.div>
                    </div>
                  </div>
                </TiltCard>

                <div className="flex justify-between items-center px-2">
                  <h4 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                    {p.title}
                  </h4>
                  <span className="text-zinc-500 font-medium">{p.year}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};

const SkillsSection = () => (
  <section className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <SectionHeading kicker="TECH STACK" title="Tools of Trade" align="center" />
      <div className="flex flex-wrap justify-center gap-3 max-w-[980px] mx-auto">
        {skillsData.map((s, i) => (
          <motion.div
            key={i}
            variants={fadeUpV}
            whileHover={{ y: -4, scale: 1.03 }}
            className="rounded-full border border-white/10 bg-[#0a0a0a] px-5 md:px-6 py-3 text-[13px] md:text-[14px] font-medium text-zinc-300 hover:border-green-500 hover:text-white transition-colors cursor-default"
          >
            {s}
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
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
          <div className="text-white font-semibold text-lg">{x.title}</div>
          <div className="text-zinc-400 text-sm mb-2">{x.org}</div>
          <div className="text-zinc-500 font-light leading-relaxed">{x.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

const ExperienceSection = () => (
  <section className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <SectionHeading kicker="JOURNEY" title="Experience & Education" />
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

const TestimonialsSection = () => {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % testimonialsData.length), 3800);
    return () => clearInterval(t);
  }, [reduce]);

  const cur = testimonialsData[idx];

  return (
    <section className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <SectionHeading kicker="REVIEWS" title="What Clients Say" align="center" />

        <div className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
              className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 md:p-10"
            >
              <Quote size={34} className="text-white/10 mb-6" />
              <p className="text-zinc-300 font-light leading-relaxed mb-8 text-[1.02rem] md:text-[1.08rem]">
                “{cur.text}”
              </p>

              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div>
                  <h4 className="text-white font-semibold">{cur.name}</h4>
                  <span className="text-zinc-500 text-sm">{cur.role}</span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star
                      key={k}
                      size={14}
                      className={k < cur.rating ? "text-green-500 fill-green-500" : "text-white/20"}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6">
            <div className="text-zinc-400 text-sm mb-4">Select</div>
            <div className="grid gap-3">
              {testimonialsData.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`text-left rounded-2xl px-4 py-3 border transition-colors ${
                    idx === i
                      ? "border-green-500/40 bg-green-500/10"
                      : "border-white/10 bg-[#0a0a0a] hover:bg-white/5"
                  }`}
                >
                  <div className="text-white font-semibold">{t.name}</div>
                  <div className="text-zinc-500 text-sm">{t.role}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const PricingSection = () => (
  <section className={`${sectionWrap} ${sectionPad}`}>
    <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <SectionHeading kicker="INVESTMENT" title="Simple Pricing" align="center" />
      <div className="grid gap-6 md:grid-cols-3">
        {pricingData.map((p, i) => (
          <motion.div
            key={i}
            variants={fadeUpV}
            whileHover={{ y: -6 }}
            className={`flex flex-col rounded-3xl border p-8 transition-colors ${
              p.popular
                ? "border-green-500/50 bg-[#0a0a0a] relative overflow-hidden"
                : "border-white/10 bg-[#0a0a0a] hover:border-white/20"
            }`}
          >
            {p.popular && (
              <div className="absolute top-5 right-5 bg-green-500 text-black text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                Popular
              </div>
            )}
            <h4 className="text-xl font-bold text-white mb-2">{p.name}</h4>
            <p className="text-zinc-400 text-sm mb-6 font-light">{p.desc}</p>
            <div className="text-[2.2rem] md:text-[2.5rem] font-black text-white mb-8">
              {p.price}
              <span className="text-lg text-zinc-500 font-medium">/project</span>
            </div>
            <ul className="space-y-4 mb-10">
              {p.features.map((f, k) => (
                <li key={k} className="flex items-start gap-3 text-zinc-300 text-sm">
                  <Check size={16} className="text-green-500 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="#contact" className="mt-auto block w-full">
              <button
                className={`w-full py-3.5 rounded-full font-bold text-sm transition-colors ${
                  p.popular
                    ? "bg-green-500 text-black hover:bg-green-400"
                    : "border border-white/20 bg-transparent text-white hover:bg-white/10"
                }`}
              >
                Get Started
              </button>
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

const FAQSection = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className={`${sectionWrap} ${sectionPad}`}>
      <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <SectionHeading kicker="FAQ" title="Quick Answers" />
        <div className="grid gap-4 max-w-[900px] mx-auto">
          {faqData.map((item, i) => {
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
                      <div className="px-6 pb-6 text-zinc-400 font-light leading-relaxed pl-[3.25rem]">
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

const ContactCTASection = () => (
  <section id="contact" className={`${sectionWrap} ${sectionPad}`}>
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
      className="rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-10 md:p-20 text-center flex flex-col items-center hover:border-white/20 transition-colors"
    >
      <h3 className="text-[2.2rem] sm:text-[2.6rem] md:text-[4rem] font-black leading-tight mb-4 text-white">
        Got an idea?
        <br />
        <span className="text-green-500">Let's build it.</span>
      </h3>
      <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-[520px] mx-auto font-light">
        Whether it's a completely new project or you want to improve an existing one, I'm here to help.
      </p>
      <a href="mailto:Bhupendra8171121943@gmail.com">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-3 rounded-full bg-white text-black px-10 py-4 text-[16px] font-bold hover:bg-zinc-200 transition-colors"
        >
          <Mail size={18} /> Start a Conversation
        </motion.button>
      </a>
    </motion.div>
  </section>
);

const FooterSection = () => (
  <footer className={`${sectionWrap} py-10`}>
    <div className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-center md:text-left">
        <div className="text-white font-bold text-xl mb-1">Bhupendra Verma</div>
        <div className="text-zinc-500 text-xs font-semibold tracking-widest uppercase">React • Tailwind • MERN</div>
      </div>
      <div className="flex items-center gap-4">
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label={s.label}
            title={s.label}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
    <div className="text-center text-zinc-600 text-sm mt-6 font-medium">
      © {new Date().getFullYear()} Bhupendra Verma. All rights reserved.
    </div>
  </footer>
);

// ---------- 5) MAIN PAGE ----------
const Home = () => (
  <MotionConfig transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
    <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-green-500/30">
      <ScrollProgress />
      <BackToTop />

      <HeroSection />
      <WhyWorkSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <ContactCTASection />
      <FooterSection />
    </div>
  </MotionConfig>
);

export default Home;
